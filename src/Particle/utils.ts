import { DEFAULT_PARTICLE_CONFIG, getParticlePreset } from "./presets"
import type { ParticleConfig, ParticlePreset, Range } from "./types"

/**
 * Normalize a number or range configuration to a Range object.
 *
 * @param value - Either a single number or a range object
 * @returns Range object with min and max values
 *
 * @example
 * ```ts
 * normalizeRange(100) // { min: 100, max: 100 }
 * normalizeRange({ min: 50, max: 150 }) // { min: 50, max: 150 }
 * ```
 */
export function normalizeRange(value: number | Range): Range {
  return typeof value === "number" ? { min: value, max: value } : value
}

/**
 * Generate a random value within a range.
 *
 * @param range - Range object with min and max values
 * @returns Random number between min and max (inclusive)
 *
 * @example
 * ```ts
 * randomInRange({ min: 50, max: 100 }) // e.g., 73.42
 * randomInRange({ min: 1, max: 1 }) // 1
 * ```
 */
export function randomInRange(range: Range): number {
  return range.min + Math.random() * (range.max - range.min)
}

/**
 * Normalize an angle to the 0-360 degree range.
 *
 * @param angle - Angle in degrees (can be negative or > 360)
 * @returns Normalized angle between 0 and 360
 *
 * @example
 * ```ts
 * normalizeAngle(450) // 90
 * normalizeAngle(-90) // 270
 * normalizeAngle(180) // 180
 * ```
 */
export function normalizeAngle(angle: number): number {
  const normalized = angle % 360
  const result = normalized < 0 ? normalized + 360 : normalized
  // Handle -0 edge case
  return result === 0 ? 0 : result
}

/**
 * Generate a random angle within a spread range.
 *
 * @param spread - Spread angle in degrees (0-360)
 * @param offset - Starting angle offset in degrees
 * @returns Random angle within the spread range
 *
 * @example
 * ```ts
 * // Full circle
 * randomAngle(360, 0) // e.g., 234.5
 *
 * // Upward semicircle
 * randomAngle(180, -90) // e.g., -45 (normalized to 315)
 *
 * // Narrow 45° cone pointing right
 * randomAngle(45, -22.5) // e.g., 10
 * ```
 */
export function randomAngle(spread: number, offset: number): number {
  const angle = offset + Math.random() * spread
  return normalizeAngle(angle)
}

/**
 * Merge two particle configurations, with override taking precedence.
 * Performs a shallow merge - override values replace base values.
 *
 * @param base - Base configuration
 * @param override - Override configuration (takes precedence)
 * @returns Merged configuration
 *
 * @example
 * ```ts
 * const base = { count: 8, colors: ['#FF0000'], speed: 500 };
 * const override = { count: 12, speed: 600 };
 * const merged = mergeParticleConfig(base, override);
 * // Result: { count: 12, colors: ['#FF0000'], speed: 600 }
 * ```
 */
export function mergeParticleConfig(
  base: Partial<ParticleConfig>,
  override?: Partial<ParticleConfig>,
): Partial<ParticleConfig> {
  if (!override) {
    return base
  }

  return {
    ...base,
    ...override,
  }
}

/**
 * Resolve final particle configuration from preset and custom config.
 * Merge priority: defaults < preset < custom config
 *
 * @param preset - Optional preset name
 * @param config - Optional custom configuration
 * @returns Complete particle configuration with all required fields
 *
 * @example
 * ```ts
 * // Use defaults only
 * const config1 = resolveParticleConfig(undefined, undefined);
 *
 * // Use preset
 * const config2 = resolveParticleConfig('burst', undefined);
 *
 * // Use preset with overrides
 * const config3 = resolveParticleConfig('burst', { count: 20 });
 *
 * // Use custom config only
 * const config4 = resolveParticleConfig(undefined, { count: 15, colors: ['#000'] });
 * ```
 */
export function resolveParticleConfig(
  preset: ParticlePreset | undefined,
  config: Partial<ParticleConfig> | undefined,
): Required<ParticleConfig> {
  // Start with defaults
  let resolved: Partial<ParticleConfig> = { ...DEFAULT_PARTICLE_CONFIG }

  // Apply preset if provided
  if (preset) {
    resolved = mergeParticleConfig(resolved, getParticlePreset(preset))
  }

  // Apply custom config (highest priority)
  if (config) {
    resolved = mergeParticleConfig(resolved, config)
  }

  return resolved as Required<ParticleConfig>
}
