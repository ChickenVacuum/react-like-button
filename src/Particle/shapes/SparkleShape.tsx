import type { ParticleShapeProps } from "../types"

/**
 * Sparkle-shaped particle component.
 * 4-pointed sparkle/diamond for magical, glittery effects.
 */
export function SparkleShape({ size, color, className = "" }: ParticleShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`fill-current ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <path d="M12 2l2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5L12 2z" />
    </svg>
  )
}
