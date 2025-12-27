import type { ParticleShapeProps } from "../types"

/**
 * Square-shaped particle component.
 * Rounded square for geometric, modern effects.
 */
export function SquareShape({ size, color, className = "" }: ParticleShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`fill-current ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="3" />
    </svg>
  )
}

