import { useEffect, useState } from "react"
import type { ParticleShape } from "./types"

/** Props for particle components */
export interface ParticleProps {
  /** Angle in degrees (0-360) for particle direction */
  angle: number
  /** Distance in pixels the particle travels */
  distance: number
  /** Scale multiplier for particle size */
  scale: number
  /** Color of the particle (hex or CSS color) */
  color: string
  /** Particle shape (preset or custom) */
  shape: ParticleShape
  /** Animation duration in milliseconds */
  speed: number
  /** CSS easing function for animation */
  easing: string
  /** Whether particle should fade out */
  fadeOut: boolean
}

/** Return type for the useParticle hook */
export interface UseParticleReturn {
  /** Whether the animation has started */
  isAnimating: boolean
  /** X position offset in pixels */
  x: number
  /** Y position offset in pixels */
  y: number
  /** Computed transform string */
  transform: string
  /** Computed opacity value */
  opacity: number
  /** Animation duration in milliseconds */
  speed: number
  /** CSS easing function */
  easing: string
  /** Whether to fade out */
  fadeOut: boolean
}

/**
 * Headless hook for particle animation logic.
 * Handles animation state and position calculations.
 */
export function useParticle({
  angle,
  distance,
  scale,
  speed,
  easing,
  fadeOut,
}: Pick<
  ParticleProps,
  "angle" | "distance" | "scale" | "speed" | "easing" | "fadeOut"
>): UseParticleReturn {
  const [isAnimating, setIsAnimating] = useState(false)

  // Trigger animation after browser has painted the initial state
  // Using double RAF ensures the initial state is committed before transitioning
  useEffect(() => {
    let cancelled = false
    let raf2: number | undefined

    // First RAF: scheduled during current frame
    const raf1 = requestAnimationFrame(() => {
      // Second RAF: runs after browser has painted
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) {
          setIsAnimating(true)
        }
      })
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(raf1)
      if (raf2 !== undefined) cancelAnimationFrame(raf2)
    }
  }, [])

  // Calculate final position
  const x = Math.cos((angle * Math.PI) / 180) * distance
  const y = Math.sin((angle * Math.PI) / 180) * distance

  return {
    isAnimating,
    x,
    y,
    transform: isAnimating
      ? `translate(${x}px, ${y}px) scale(${scale})`
      : "translate(0, 0) scale(1)",
    opacity: isAnimating ? 0 : 1,
    speed,
    easing,
    fadeOut,
  }
}
