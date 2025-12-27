import type { ParticleShapeProps } from "../types"

/**
 * Circle-shaped particle component.
 * Simple filled circle for clean, minimal effects.
 */
export function CircleShape({ size, color, className = "" }: ParticleShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`fill-current ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
    </svg>
  )
}

