// Vanilla CSS entry point
// Use this for projects without Tailwind CSS
// NOTE: This entry point does NOT export the Tailwind version to prevent accidental usage
//
// ⚠️  IMPORTANT: When adding or removing exports, update BOTH vanilla.ts and index.ts
//     to keep the API surface consistent across entry points.

// ============================================================================
// CORE COMPONENTS (Vanilla CSS versions only)
// ============================================================================

// Default icon (shared between Tailwind and Vanilla versions)
export { DefaultHeartIcon } from "./LikeButton/DefaultHeartIcon"
// Vanilla CSS version - both as named export and default export
export {
  LikeButtonVanilla,
  LikeButtonVanilla as default,
} from "./LikeButton/LikeButton.vanilla"

// ============================================================================
// HEADLESS HOOK (shared - no CSS dependency)
// ============================================================================

export { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./LikeButton/useLikeButton"

// ============================================================================
// PARTICLE PRESETS (shared - no CSS dependency)
// ============================================================================

export { PARTICLE_PRESETS } from "./Particle/presets"

// ============================================================================
// TYPES (shared - no CSS dependency)
// ============================================================================

// LikeButton component types
export type {
  BaseLikeButtonProps,
  Cursor,
  CursorPreset,
  CustomCursor,
  CustomShape,
  IconRenderProps,
  LikeButtonProps,
  LikeButtonVanillaProps,
  Shape,
  ShapePreset,
  StyleOverrides,
} from "./LikeButton/types"

// Headless hook types
export type {
  AriaLabelProp,
  AriaLabelState,
  ParticleData,
  UseLikeButtonOptions,
  UseLikeButtonReturn,
} from "./LikeButton/useLikeButton"

// Particle configuration types
export type {
  CustomParticleShape,
  ParticleConfig,
  ParticlePreset,
  ParticleShape,
  ParticleShapePreset,
  ParticleShapeProps,
  Range,
} from "./Particle/types"
