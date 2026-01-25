/**
 * Particle Module - Internal Components
 *
 * This module contains particle-related components and utilities.
 * Most items are internal implementation details.
 *
 * Public API exports (via src/index.ts):
 * - PARTICLE_PRESETS: Built-in particle effect presets
 * - Types: ParticleConfig, ParticlePreset, ParticleShape, etc.
 */

// ============================================================================
// PUBLIC API (re-exported from src/index.ts)
// ============================================================================

// Presets for particle effects
export { PARTICLE_PRESETS } from "./presets"

// Type definitions for particle configuration
export type {
  CustomParticleShape,
  ParticleConfig,
  ParticlePreset,
  ParticleShape,
  ParticleShapePreset,
  ParticleShapeProps,
  Range,
} from "./types"

// ============================================================================
// INTERNAL API (used within the library, not re-exported)
// ============================================================================

// Internal components
export { Particle, Particle as default } from "./Particle"
export { ParticleVanilla } from "./Particle.vanilla"

// Internal presets and configuration
export { DEFAULT_PARTICLE_CONFIG, getParticlePreset } from "./presets"

// Internal shape components
export {
  CircleShape,
  getParticleShape,
  HeartShape,
  SparkleShape,
  SquareShape,
  StarShape,
} from "./shapes"

// Internal types
export type { ParticlePresetConfig } from "./types"
export type { ParticleProps, UseParticleReturn } from "./useParticle"

// Internal hooks and utilities
export { useParticle } from "./useParticle"
export {
  mergeParticleConfig,
  normalizeAngle,
  normalizeRange,
  randomAngle,
  randomInRange,
  resolveParticleConfig,
} from "./utils"
