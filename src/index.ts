// Main entry point (Tailwind CSS version)
//
// ⚠️  IMPORTANT: When adding or removing exports, update BOTH index.ts and vanilla.ts
//     to keep the API surface consistent across entry points.

// ============================================================================
// CORE COMPONENTS
// ============================================================================

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./LikeButton/DefaultHeartIcon"
// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton/LikeButton"
// Vanilla CSS version (also available from ./vanilla entry)
export { LikeButtonVanilla } from "./LikeButton/LikeButton.vanilla"

// ============================================================================
// HEADLESS HOOK
// ============================================================================

export { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./LikeButton/useLikeButton"

// ============================================================================
// PARTICLE PRESETS
// ============================================================================

export { PARTICLE_PRESETS } from "./Particle/presets"

// ============================================================================
// TYPES
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
