/**
 * LikeButton Module
 *
 * This module contains the LikeButton component and related utilities.
 * All exports here are part of the public API.
 */

// ============================================================================
// CORE COMPONENTS
// ============================================================================

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./DefaultHeartIcon"
// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton"
// Vanilla CSS version
export { LikeButtonVanilla } from "./LikeButton.vanilla"

// ============================================================================
// HEADLESS HOOK
// ============================================================================

export { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./useLikeButton"

// ============================================================================
// TYPES
// ============================================================================

// Component prop types
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
} from "./types"

// Headless hook types
export type {
  ParticleData,
  UseLikeButtonOptions,
  UseLikeButtonReturn,
} from "./useLikeButton"
