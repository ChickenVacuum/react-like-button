// Headless hook (logic only)

// Tailwind version (default)
export { Particle, Particle as default } from "./Particle"
// Vanilla CSS version
export { ParticleVanilla } from "./Particle.vanilla"
// Presets and configuration
export { DEFAULT_PARTICLE_CONFIG, getParticlePreset, PARTICLE_PRESETS } from "./presets"
// Shape components
export {
  CircleShape,
  getParticleShape,
  HeartShape,
  SparkleShape,
  SquareShape,
  StarShape,
} from "./shapes"
// Type definitions
export type {
  CustomParticleShape,
  ParticleConfig,
  ParticlePreset,
  ParticlePresetConfig,
  ParticleShape,
  ParticleShapePreset,
  ParticleShapeProps,
  Range,
} from "./types"
export type { ParticleProps, UseParticleReturn } from "./useParticle"
export { useParticle } from "./useParticle"
// Utility functions
export {
  mergeParticleConfig,
  normalizeAngle,
  normalizeRange,
  randomAngle,
  randomInRange,
  resolveParticleConfig,
} from "./utils"
