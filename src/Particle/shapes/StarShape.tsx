import type { ParticleShapeProps } from "../types"

/**
 * Star-shaped particle component.
 * Classic 5-pointed star for celebration effects.
 */
export function StarShape({ size, color, className = "" }: ParticleShapeProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`fill-current ${className}`}
      style={{ color }}
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  )
}
