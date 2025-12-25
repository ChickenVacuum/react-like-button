import { useEffect, useState } from "react";

/** Props for particle components */
export interface ParticleProps {
  /** Angle in degrees (0-360) for particle direction */
  angle: number;
  /** Distance in pixels the particle travels */
  distance: number;
  /** Scale multiplier for particle size */
  scale: number;
  /** Color of the particle (hex or CSS color) */
  color: string;
}

/** Return type for the useParticle hook */
export interface UseParticleReturn {
  /** Whether the animation has started */
  isAnimating: boolean;
  /** X position offset in pixels */
  x: number;
  /** Y position offset in pixels */
  y: number;
  /** Computed transform string */
  transform: string;
  /** Computed opacity value */
  opacity: number;
}

/**
 * Headless hook for particle animation logic.
 * Handles animation state and position calculations.
 */
export function useParticle({
  angle,
  distance,
  scale,
}: Pick<ParticleProps, "angle" | "distance" | "scale">): UseParticleReturn {
  const [isAnimating, setIsAnimating] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    const timer = requestAnimationFrame(() => setIsAnimating(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  // Calculate final position
  const x = Math.cos((angle * Math.PI) / 180) * distance;
  const y = Math.sin((angle * Math.PI) / 180) * distance;

  return {
    isAnimating,
    x,
    y,
    transform: isAnimating
      ? `translate(${x}px, ${y}px) scale(${scale})`
      : "translate(0, 0) scale(0)",
    opacity: isAnimating ? 0 : 1,
  };
}

