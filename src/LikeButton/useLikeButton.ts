import { useState, useCallback } from "react";

/** Data structure for a single particle effect */
export interface ParticleData {
  id: string;
  angle: number;
  distance: number;
  scale: number;
  color: string;
}

/** Options for the useLikeButton hook */
export interface UseLikeButtonOptions {
  /** Number of clicks by current user (controlled mode). If not provided, internal state is used. */
  localClicks?: number;
  /** Maximum number of clicks allowed per user */
  maxClicks?: number;
  /** Callback when button is clicked. Receives the new local click count. */
  onClick?: (newLocalClicks: number) => void;
  /** Callback when button is right-clicked. Receives the current click count. Does not increment or spawn particles. */
  onRightClick?: (currentClicks: number) => void;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Custom particle colors (array of hex colors) */
  particleColors?: string[];
  /** Show particle effects on click */
  showParticles?: boolean;
  /** Number of particles per click */
  particleCount?: number;
  /** Custom aria-label override */
  ariaLabel?: string;
}

/** Default values */
export const LIKE_BUTTON_DEFAULTS = {
  maxClicks: 14,
  size: 96,
  fillColor: "#EF4444",
  waveColor: "#B91C1C",
  particleColors: ["#EF4444", "#B9FF14", "#3B82F6"],
  particleCount: 8,
} as const;

/** Return type for the useLikeButton hook */
export interface UseLikeButtonReturn {
  /** Current click count */
  localClicks: number;
  /** Whether max clicks reached */
  isMaxed: boolean;
  /** Whether button is disabled */
  disabled: boolean;
  /** Fill percentage (0-100) */
  fillPercentage: number;
  /** Active particles to render */
  particles: ParticleData[];
  /** Click handler for the button */
  handleClick: () => void;
  /** Right-click handler for the button */
  handleRightClick: (e: React.MouseEvent) => void;
  /** Aria label for accessibility */
  ariaLabel: string;
  /** Whether button has been pressed */
  isPressed: boolean;
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
export function useLikeButton(
  options: UseLikeButtonOptions = {},
): UseLikeButtonReturn {
  const {
    localClicks: externalLocalClicks,
    maxClicks = LIKE_BUTTON_DEFAULTS.maxClicks,
    onClick,
    onRightClick,
    disabled: externalDisabled,
    particleColors = LIKE_BUTTON_DEFAULTS.particleColors,
    showParticles = true,
    particleCount = LIKE_BUTTON_DEFAULTS.particleCount,
    ariaLabel: customAriaLabel,
  } = options;

  // Internal state for uncontrolled mode
  const [internalLocalClicks, setInternalLocalClicks] = useState(0);
  const [particles, setParticles] = useState<ParticleData[]>([]);

  // Use external state if provided, otherwise use internal
  const localClicks = externalLocalClicks ?? internalLocalClicks;
  const isMaxed = localClicks >= maxClicks;
  const disabled = externalDisabled ?? isMaxed;

  const spawnParticles = useCallback(() => {
    if (!showParticles) return;

    const id = Date.now();
    const newParticles = Array.from({ length: particleCount }).map((_, i) => ({
      id: `${id}-${i}`,
      angle: Math.random() * 360,
      distance: 60 + Math.random() * 40,
      scale: 1.0 + Math.random() * 0.5,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    // Cleanup particles after animation
    setTimeout(() => {
      setParticles((prev) =>
        prev.filter((p) => !newParticles.find((np) => np.id === p.id)),
      );
    }, 1000);
  }, [showParticles, particleCount, particleColors]);

  const handleClick = useCallback(() => {
    if (disabled) return;

    const newLocalClicks = localClicks + 1;

    // Update internal state if in uncontrolled mode
    if (externalLocalClicks === undefined) {
      setInternalLocalClicks(newLocalClicks);
    }

    spawnParticles();
    onClick?.(newLocalClicks);
  }, [disabled, localClicks, externalLocalClicks, spawnParticles, onClick]);

  const handleRightClick = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault(); // Prevent context menu
      if (disabled) return;

      // Right-click does not increment clicks or spawn particles
      // It only calls the callback with the current click count
      onRightClick?.(localClicks);
    },
    [disabled, localClicks, onRightClick],
  );

  const fillPercentage = (localClicks / maxClicks) * 100;

  const defaultAriaLabel = isMaxed
    ? "Thank you for your likes!"
    : `Like this content. ${maxClicks - localClicks} clicks remaining`;

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
  };
}

