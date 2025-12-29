import { useCallback, useEffect, useRef, useState } from "react"
import type { ParticleConfig, ParticlePreset, ParticleShape } from "../Particle/types"
import {
  normalizeRange,
  randomAngle,
  randomInRange,
  resolveParticleConfig,
} from "../Particle/utils"

/** Data structure for a single particle effect */
export interface ParticleData {
  id: string
  angle: number
  distance: number
  scale: number
  color: string
  shape: ParticleShape
  speed: number
  easing: string
  fadeOut: boolean
}

/** Options for the useLikeButton hook */
export interface UseLikeButtonOptions {
  /** Number of clicks by current user (controlled mode). If not provided, internal state is used. */
  localClicks?: number
  /** Maximum number of clicks allowed per user */
  maxClicks?: number
  /** Callback when button is clicked. Receives the new local click count. */
  onClick?: (newLocalClicks: number) => void
  /** Callback when button is right-clicked. Receives the current click count. Does not increment or spawn particles. */
  onRightClick?: (currentClicks: number) => void
  /** Whether the button is disabled */
  disabled?: boolean
  /** Show particle effects on click */
  showParticles?: boolean
  /** Custom aria-label override */
  ariaLabel?: string

  // ========== PARTICLE CONFIGURATION ==========
  /**
   * Particle effect preset (burst, fountain, confetti, gentle, fireworks)
   * @example
   * ```tsx
   * useLikeButton({ particlePreset: 'burst' })
   * ```
   */
  particlePreset?: ParticlePreset

  /**
   * Custom particle configuration (overrides preset)
   * @example
   * ```tsx
   * useLikeButton({
   *   particleConfig: {
   *     shape: 'star',
   *     colors: ['#FFD700', '#FFA500'],
   *     count: 12,
   *   }
   * })
   * ```
   */
  particleConfig?: Partial<ParticleConfig>
}

/** Default values */
export const LIKE_BUTTON_DEFAULTS = {
  maxClicks: 14,
  size: 96,
  fillColor: "#EF4444",
  waveColor: "#B91C1C",
} as const

/** Return type for the useLikeButton hook */
export interface UseLikeButtonReturn {
  /** Current click count */
  localClicks: number
  /** Whether max clicks reached */
  isMaxed: boolean
  /** Whether button is disabled */
  disabled: boolean
  /** Fill percentage (0-100) */
  fillPercentage: number
  /** Active particles to render */
  particles: ParticleData[]
  /** Click handler for the button */
  handleClick: () => void
  /** Right-click handler for the button */
  handleRightClick: (e: React.MouseEvent) => void
  /** Aria label for accessibility */
  ariaLabel: string
  /** Whether button has been pressed */
  isPressed: boolean
}

/**
 * Headless hook for LikeButton logic.
 * Handles state management, particle spawning, and accessibility.
 *
 * @example
 * ```tsx
 * const { handleClick, localClicks, particles, ariaLabel } = useLikeButton({
 *   maxClicks: 10,
 *   onClick: (clicks) => console.log('Clicked!', clicks),
 * });
 * ```
 */
export function useLikeButton(options: UseLikeButtonOptions = {}): UseLikeButtonReturn {
  const {
    localClicks: externalLocalClicks,
    maxClicks = LIKE_BUTTON_DEFAULTS.maxClicks,
    onClick,
    onRightClick,
    disabled: externalDisabled,
    showParticles = true,
    particlePreset,
    particleConfig,
    ariaLabel: customAriaLabel,
  } = options

  // Internal state for uncontrolled mode
  const [internalLocalClicks, setInternalLocalClicks] = useState(0)
  const [particles, setParticles] = useState<ParticleData[]>([])

  // Track active timeout IDs for cleanup on unmount
  const timeoutRefs = useRef<Set<ReturnType<typeof setTimeout>>>(new Set())

  // Cleanup all pending timeouts on unmount to prevent memory leaks
  // and "setState on unmounted component" warnings
  useEffect(() => {
    return () => {
      for (const timeoutId of timeoutRefs.current) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // Use external state if provided, otherwise use internal
  const localClicks = externalLocalClicks ?? internalLocalClicks
  const isMaxed = localClicks >= maxClicks
  const disabled = externalDisabled ?? isMaxed

  const spawnParticles = useCallback(() => {
    if (!showParticles) return

    // Resolve final particle configuration from preset and custom config
    const config = resolveParticleConfig(particlePreset, particleConfig)

    // Normalize ranges for random value generation
    const distanceRange = normalizeRange(config.distance)
    const sizeRange = normalizeRange(config.size)

    const id = Date.now()

    const newParticles = Array.from({ length: config.count }).map((_, i) => ({
      id: `${id}-${i}`,
      angle: randomAngle(config.spread, config.spreadOffset),
      distance: randomInRange(distanceRange),
      scale: randomInRange(sizeRange),
      color: config.colors[Math.floor(Math.random() * config.colors.length)],
      shape: config.shape,
      speed: config.speed,
      easing: config.easing,
      fadeOut: config.fadeOut,
    }))

    setParticles((prev) => [...prev, ...newParticles])

    // Cleanup particles after animation completes
    // Add buffer time to ensure animation finishes
    const cleanupDelay = config.speed + 100
    // Use Set for O(1) lookup instead of O(n) find() - avoids O(n²) filter
    const idsToRemove = new Set(newParticles.map((p) => p.id))
    const timeoutId = setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !idsToRemove.has(p.id)))
      // Remove from tracking set after completion
      timeoutRefs.current.delete(timeoutId)
    }, cleanupDelay)
    // Track timeout for cleanup on unmount
    timeoutRefs.current.add(timeoutId)
  }, [showParticles, particlePreset, particleConfig])

  const handleClick = useCallback(() => {
    if (disabled) return

    const newLocalClicks = localClicks + 1

    // Update internal state if in uncontrolled mode
    if (externalLocalClicks === undefined) {
      setInternalLocalClicks(newLocalClicks)
    }

    spawnParticles()
    onClick?.(newLocalClicks)
  }, [disabled, localClicks, externalLocalClicks, spawnParticles, onClick])

  const handleRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault() // Prevent context menu
      if (disabled) return

      // Right-click does not increment clicks or spawn particles
      // It only calls the callback with the current click count
      onRightClick?.(localClicks)
    },
    [disabled, localClicks, onRightClick],
  )

  const fillPercentage = (localClicks / maxClicks) * 100

  const defaultAriaLabel = isMaxed
    ? "Thank you for your likes!"
    : `Like this content. ${maxClicks - localClicks} clicks remaining`

  return {
    localClicks,
    isMaxed,
    disabled,
    fillPercentage,
    particles,
    handleClick,
    handleRightClick,
    ariaLabel: customAriaLabel ?? defaultAriaLabel,
    isPressed: localClicks > 0,
  }
}
