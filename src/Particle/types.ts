/**
 * Particle System Type Definitions
 *
 * This file contains all type definitions for the enhanced particle effects system.
 * Supports configurable shapes, animations, presets, and custom particle configurations.
 */

// ============================================================================
// PARTICLE SHAPE TYPES
// ============================================================================

/**
 * Built-in particle shape presets
 *
 * @example
 * ```tsx
 * <LikeButton particleConfig={{ shape: 'star' }} />
 * <LikeButton particleConfig={{ shape: 'heart' }} />
 * <LikeButton particleConfig={{ shape: 'sparkle' }} />
 * ```
 */
export type ParticleShapePreset = "heart" | "star" | "circle" | "square" | "sparkle"

/**
 * Props passed to particle shape render functions
 *
 * @example
 * ```tsx
 * const MyShape = ({ size, color, className }: ParticleShapeProps) => (
 *   <svg width={size} height={size} className={className}>
 *     <circle cx={size/2} cy={size/2} r={size/2} fill={color} />
 *   </svg>
 * );
 * ```
 */
export interface ParticleShapeProps {
  /** Size of the shape in pixels */
  size: number
  /** Color of the shape (hex or CSS color) */
  color: string
  /** Additional CSS class names */
  className?: string
}

/**
 * Custom particle shape configuration
 *
 * @example
 * ```tsx
 * const customShape: CustomParticleShape = {
 *   render: ({ size, color }) => (
 *     <svg width={size} height={size}>
 *       <polygon points="..." fill={color} />
 *     </svg>
 *   )
 * };
 *
 * <LikeButton particleConfig={{ shape: customShape }} />
 * ```
 */
export interface CustomParticleShape {
  /** Custom render function for the particle shape */
  render: (props: ParticleShapeProps) => React.ReactNode
}

/**
 * Particle shape - either a preset string or custom shape config
 *
 * @example
 * ```tsx
 * // Using preset
 * const shape1: ParticleShape = 'star';
 *
 * // Using custom shape
 * const shape2: ParticleShape = {
 *   render: (props) => <MyCustomShape {...props} />
 * };
 * ```
 */
export type ParticleShape = ParticleShapePreset | CustomParticleShape

// ============================================================================
// PARTICLE PRESET TYPES
// ============================================================================

/**
 * Built-in particle effect presets
 *
 * - **burst**: Quick explosion of hearts in all directions (12 particles)
 * - **fountain**: Upward spray effect (10 particles)
 * - **confetti**: Colorful celebration with mixed shapes (15 particles)
 * - **gentle**: Subtle floating effect (6 particles)
 * - **fireworks**: Explosive sparkle effect (16 particles)
 *
 * @example
 * ```tsx
 * <LikeButton particlePreset="burst" />
 * <LikeButton particlePreset="confetti" />
 * <LikeButton particlePreset="fireworks" />
 * ```
 */
export type ParticlePreset = "burst" | "fountain" | "confetti" | "gentle" | "fireworks"

// ============================================================================
// PARTICLE CONFIGURATION
// ============================================================================

/**
 * Range configuration for numeric values
 *
 * @example
 * ```tsx
 * const distanceRange: Range = { min: 80, max: 120 };
 * const sizeRange: Range = { min: 1.0, max: 2.0 };
 *
 * <LikeButton particleConfig={{
 *   distance: distanceRange,
 *   size: sizeRange
 * }} />
 * ```
 */
export interface Range {
  /** Minimum value */
  min: number
  /** Maximum value */
  max: number
}

/**
 * Complete particle configuration interface.
 * All fields are optional - defaults will be applied.
 *
 * @example
 * ```tsx
 * const config: ParticleConfig = {
 *   shape: 'star',
 *   colors: ['#FFD700', '#FFA500'],
 *   count: 12,
 *   speed: 600,
 *   distance: { min: 80, max: 120 },
 *   spread: 180,
 *   spreadOffset: -90,
 * };
 * ```
 */
export interface ParticleConfig {
  // ========== SHAPE ==========
  /**
   * Particle shape - preset name or custom shape config
   * @default 'heart'
   */
  shape?: ParticleShape

  // ========== VISUAL ==========
  /**
   * Array of colors for particles (randomly selected)
   * @default ['#EF4444', '#B9FF14', '#3B82F6']
   */
  colors?: string[]

  /**
   * Number of particles to spawn per click
   * @default 8
   */
  count?: number

  /**
   * Size range for particles (scale multiplier)
   * Can be a single number or a range
   * @default { min: 1.0, max: 1.5 }
   */
  size?: number | Range

  // ========== ANIMATION ==========
  /**
   * Animation duration in milliseconds
   * @default 500
   */
  speed?: number

  /**
   * Distance particles travel in pixels
   * Can be a single number or a range
   * @default { min: 60, max: 100 }
   */
  distance?: number | Range

  /**
   * Spread angle in degrees (0-360)
   * 360 = full circle, 180 = semicircle, etc.
   * @default 360
   */
  spread?: number

  /**
   * Starting angle offset in degrees
   * 0 = right, 90 = down, 180 = left, 270 = up
   * @default 0
   */
  spreadOffset?: number

  /**
   * CSS easing function for particle animation
   * @default 'cubic-bezier(0.22, 1, 0.36, 1)'
   */
  easing?: string

  /**
   * Whether particles fade out during animation
   * @default true
   */
  fadeOut?: boolean
}

/**
 * Preset configuration type.
 * Used internally to define preset configurations.
 */
export type ParticlePresetConfig = Required<Omit<ParticleConfig, "shape">> & {
  shape: ParticleShapePreset // Presets only use preset shapes, not custom
}
