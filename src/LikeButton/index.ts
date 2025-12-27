// Headless hook (logic only)

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./DefaultHeartIcon"
// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton"
// Vanilla CSS version
export { LikeButtonVanilla } from "./LikeButton.vanilla"
// Types for customization
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
export type {
  ParticleData,
  UseLikeButtonOptions,
  UseLikeButtonReturn,
} from "./useLikeButton"
export { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./useLikeButton"
