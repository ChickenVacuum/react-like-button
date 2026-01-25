import { getParticleShape } from "./shapes"
import type { ParticleProps } from "./useParticle"
import { useParticle } from "./useParticle"

/**
 * Particle - Animated particle for burst effects.
 * This version uses vanilla CSS (no Tailwind dependency).
 *
 * Supports multiple shapes (heart, star, circle, square, sparkle) and custom shapes.
 * Animation is fully configurable via speed, easing, and fadeOut props.
 */
export function ParticleVanilla({
  angle,
  distance,
  scale,
  color,
  shape,
  speed,
  easing,
  fadeOut,
}: ParticleProps) {
  const { transform, opacity } = useParticle({
    angle,
    distance,
    scale,
    speed,
    easing,
    fadeOut,
  })

  // Get the shape component (preset or custom)
  const ShapeComponent = getParticleShape(shape)

  return (
    <div
      className="particle"
      style={{
        color,
        transform,
        opacity: fadeOut ? opacity : 1,
        transitionDuration: `${speed}ms`,
        transitionTimingFunction: easing,
      }}
    >
      <ShapeComponent size={40} color={color} className="particle__icon" />
    </div>
  )
}

export default ParticleVanilla
