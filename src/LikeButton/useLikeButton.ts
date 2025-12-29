import { useCallback, useEffect, useRef, useState } from "react"
import type { ParticleConfig, ParticlePreset, ParticleShape } from "../Particle/types"
import {
  normalizeRange,
  randomAngle,
  randomInRange,
  resolveParticleConfig,
} from "../Particle/utils"
import { PARTICLE_CLEANUP_BUFFER_MS } from "./utils"

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

/**
 * State object passed to dynamic aria-label functions.
 * Enables internationalization (i18n) support for accessibility labels.
 */
export interface AriaLabelState {
  /** Whether the maximum clicks have been reached */
  isMaxed: boolean
  /** Number of clicks remaining before max */
  remaining: number
  /** Current number of clicks by the user */
  clicks: number
  /** Maximum number of clicks allowed */
  maxClicks: number
}

/**
 * Aria label can be either:
 * - A static string for simple use cases
 * - A function that receives state for dynamic/i18n labels
 *
 * @example
 * ```tsx
 * // Static string
 * ariaLabel="Like this post"
 *
 * // Dynamic function for i18n
 * ariaLabel={({ isMaxed, remaining }) =>
 *   isMaxed ? t('likes.maxed') : t('likes.remaining', { count: remaining })
 * }
 * ```
 */
export type AriaLabelProp = string | ((state: AriaLabelState) => string)

/** Options for the useLikeButton hook */
export interface UseLikeButtonOptions {
  /** Current click count (controlled mode). If not provided, internal state is used. */
  clicks?: number
  /** Maximum number of clicks allowed per user */
  maxClicks?: number
  /**
   * Callback when button is clicked.
   * @param clicks - The current click count, after increment
   * @param event - The mouse event that triggered the click
   */
  onClick?: (clicks: number, event: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Callback when button is right-clicked. Also triggered by Shift+Enter for keyboard accessibility.
   * @param clicks - The current click count, not incremented as right-click does not increment
   * @param event - The mouse or keyboard event that triggered the action
   */
  onRightClick?: (
    clicks: number,
    event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>,
  ) => void
  /** Whether the button is disabled */
  disabled?: boolean
  /**
   * Show particle effects on click.
   * When false, no particles are spawned or rendered.
   * @default true
   */
  showParticles?: boolean
  /**
   * Custom aria-label override. Accepts either a static string or a function
   * that receives the current state for dynamic/i18n labels.
   *
   * @example
   * ```tsx
   * // Static string
   * ariaLabel="Like this post"
   *
   * // Dynamic function for i18n support
   * ariaLabel={({ isMaxed, remaining }) =>
   *   isMaxed ? t('likes.maxed') : t('likes.remaining', { count: remaining })
   * }
   * ```
   */
  ariaLabel?: AriaLabelProp

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
  maxClicks: 1,
  size: 96,
  fillColor: "#EF4444",
  waveColor: "#B91C1C",
} as const

/** Return type for the useLikeButton hook */
export interface UseLikeButtonReturn {
  /** Current click count */
  clicks: number
  /** Whether max clicks reached */
  isMaxed: boolean
  /** Whether button is disabled */
  disabled: boolean
  /** Fill percentage (0-100) */
  fillPercentage: number
  /** Active particles to render */
  particles: ParticleData[]
  /** Click handler for the button */
  handleClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  /** Right-click handler for the button */
  handleRightClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  /**
   * Keyboard handler for accessibility.
   * Triggers onRightClick when Shift+Enter is pressed.
   */
  handleKeyDown: (e: React.KeyboardEvent<HTMLButtonElement>) => void
  /** Aria label for accessibility */
  ariaLabel: string
  /** Whether button has been pressed */
  isPressed: boolean
  /** Whether onRightClick is provided (for aria-keyshortcuts) */
  hasRightClickAction: boolean
}

/**
 * Headless hook for LikeButton logic.
 * Handles state management, particle spawning, and accessibility.
 *
 * @example
 * ```tsx
 * const { handleClick, clicks, particles, ariaLabel } = useLikeButton({
 *   maxClicks: 10,
 *   onClick: (count, event) => {
 *     console.log('Clicked!', count)
 *     // Access event if needed
 *     event.stopPropagation()
 *   },
 * });
 * ```
 */
export function useLikeButton(options: UseLikeButtonOptions = {}): UseLikeButtonReturn {
  const {
    clicks: externalClicks,
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
  const [internalClicks, setInternalClicks] = useState(0)
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
  const clicks = externalClicks ?? internalClicks
  const isMaxed = clicks >= maxClicks
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
    const cleanupDelay = config.speed + PARTICLE_CLEANUP_BUFFER_MS
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

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled) return

      const newClicks = clicks + 1

      // Update internal state if in uncontrolled mode
      if (externalClicks === undefined) {
        setInternalClicks(newClicks)
      }

      spawnParticles()
      onClick?.(newClicks, e)
    },
    [disabled, clicks, externalClicks, spawnParticles, onClick],
  )

  const handleRightClick = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault() // Prevent context menu
      if (disabled) return

      // Right-click does not increment clicks or spawn particles
      // It only calls the callback with the current click count
      onRightClick?.(clicks, e)
    },
    [disabled, clicks, onRightClick],
  )

  /**
   * Keyboard handler for accessibility.
   * Shift+Enter triggers the right-click action as a keyboard alternative.
   */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      if (e.shiftKey && e.key === "Enter") {
        e.preventDefault()
        if (disabled) return
        onRightClick?.(clicks, e)
      }
    },
    [disabled, clicks, onRightClick],
  )

  const fillPercentage = (clicks / maxClicks) * 100

  const defaultAriaLabel = isMaxed
    ? "Thank you for your likes!"
    : `Like this content. ${maxClicks - clicks} clicks remaining`

  // Compute aria label - support both static string and dynamic function
  const ariaLabelState: AriaLabelState = {
    isMaxed,
    remaining: maxClicks - clicks,
    clicks,
    maxClicks,
  }

  const computedAriaLabel =
    customAriaLabel === undefined
      ? defaultAriaLabel
      : typeof customAriaLabel === "function"
        ? customAriaLabel(ariaLabelState)
        : customAriaLabel

  return {
    clicks,
    isMaxed,
    disabled,
    fillPercentage,
    particles,
    handleClick,
    handleRightClick,
    handleKeyDown,
    ariaLabel: computedAriaLabel,
    isPressed: clicks > 0,
    hasRightClickAction: onRightClick !== undefined,
  }
}
