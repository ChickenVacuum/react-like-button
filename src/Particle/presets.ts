import type { ParticleConfig, ParticlePreset, ParticlePresetConfig } from "./types"

/**
 * Default particle configuration.
 * Used as the base for all particle effects when no preset or custom config is provided.
 */
export const DEFAULT_PARTICLE_CONFIG: Required<ParticleConfig> = {
  shape: "heart",
  speed: 500,
  distance: { min: 60, max: 100 },
  spread: 360,
  spreadOffset: 0,
  size: { min: 1.0, max: 1.5 },
  colors: ["#EF4444", "#B9FF14", "#3B82F6"],
  count: 8,
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  fadeOut: true,
}

/**
 * Built-in particle effect presets.
 * Each preset provides a distinct visual effect optimized for different use cases.
 *
 * @example
 * ```tsx
 * import { PARTICLE_PRESETS } from '@fmarlats/react-like-button';
 *
 * // Use a preset directly
 * const burstConfig = PARTICLE_PRESETS.burst;
 * ```
 */
export const PARTICLE_PRESETS: Record<ParticlePreset, ParticlePresetConfig> = {
  /**
   * Burst - Fast, enthusiastic explosion effect
   * - Wide 360° spread
   * - Fast animation (400ms)
   * - Multiple colors
   * - 12 particles
   * - Perfect for: Likes, favorites, celebrations
   */
  burst: {
    shape: "heart",
    speed: 400,
    distance: { min: 80, max: 120 },
    spread: 360,
    spreadOffset: 0,
    size: { min: 1.0, max: 1.5 },
    colors: ["#EF4444", "#F59E0B", "#3B82F6"],
    count: 12,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fadeOut: true,
  },

  /**
   * Fountain - Upward spray effect
   * - 120° upward spread
   * - Medium animation (600ms)
   * - Cool colors (blue, purple, pink)
   * - 10 particles
   * - Perfect for: Achievements, upgrades, success
   */
  fountain: {
    shape: "circle",
    speed: 600,
    distance: { min: 60, max: 100 },
    spread: 120,
    spreadOffset: -90, // Upward
    size: { min: 0.8, max: 1.2 },
    colors: ["#3B82F6", "#8B5CF6", "#EC4899"],
    count: 10,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fadeOut: true,
  },

  /**
   * Confetti - Colorful celebration effect
   * - Full 360° spread
   * - Slow animation (800ms)
   * - Rainbow colors
   * - 15 particles
   * - Perfect for: Milestones, victories, special events
   */
  confetti: {
    shape: "square",
    speed: 800,
    distance: { min: 70, max: 110 },
    spread: 360,
    spreadOffset: 0,
    size: { min: 0.6, max: 1.4 },
    colors: ["#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899"],
    count: 15,
    easing: "ease-out",
    fadeOut: true,
  },

  /**
   * Gentle - Subtle, calm effect
   * - 180° upward spread
   * - Slow animation (700ms)
   * - Soft red tones
   * - 6 particles
   * - Perfect for: Subtle interactions, quiet appreciation
   */
  gentle: {
    shape: "heart",
    speed: 700,
    distance: { min: 40, max: 60 },
    spread: 180,
    spreadOffset: -90,
    size: { min: 0.8, max: 1.0 },
    colors: ["#EF4444", "#F87171"],
    count: 6,
    easing: "ease-in-out",
    fadeOut: true,
  },

  /**
   * Fireworks - Explosive sparkle effect
   * - Full 360° spread
   * - Medium-fast animation (500ms)
   * - Warm sparkle colors
   * - 16 particles
   * - Large size range
   * - Perfect for: Big celebrations, major achievements
   */
  fireworks: {
    shape: "sparkle",
    speed: 500,
    distance: { min: 100, max: 150 },
    spread: 360,
    spreadOffset: 0,
    size: { min: 1.2, max: 2.0 },
    colors: ["#FBBF24", "#F59E0B", "#EF4444", "#EC4899"],
    count: 16,
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    fadeOut: true,
  },
}

/**
 * Get a particle preset configuration by name.
 *
 * @param preset - The preset name
 * @returns The complete particle configuration for the preset
 *
 * @example
 * ```tsx
 * import { getParticlePreset } from '@fmarlats/react-like-button';
 *
 * const burstConfig = getParticlePreset('burst');
 * const fountainConfig = getParticlePreset('fountain');
 * ```
 */
export function getParticlePreset(preset: ParticlePreset): ParticlePresetConfig {
  return PARTICLE_PRESETS[preset]
}
