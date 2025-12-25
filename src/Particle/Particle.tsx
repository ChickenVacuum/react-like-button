import { useParticle } from "./useParticle";
import type { ParticleProps } from "./useParticle";

/**
 * Particle - Animated heart particle for burst effects.
 * This version uses Tailwind CSS for styling.
 */
export function Particle({ angle, distance, scale, color }: ParticleProps) {
  const { transform, opacity } = useParticle({ angle, distance, scale });

  return (
    <div
      className="absolute w-10 h-10 transition-all duration-500 ease-out"
      style={{
        color,
        transform,
        opacity,
        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full fill-current" aria-hidden="true">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
    </div>
  );
}

export default Particle;

