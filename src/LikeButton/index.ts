// Headless hook (logic only)
export { useLikeButton, LIKE_BUTTON_DEFAULTS } from "./useLikeButton";
export type {
  UseLikeButtonOptions,
  UseLikeButtonReturn,
  ParticleData,
} from "./useLikeButton";

// Types for customization
export type {
  LikeButtonProps,
  LikeButtonVanillaProps,
  BaseLikeButtonProps,
  IconRenderProps,
  ShapePreset,
  CustomShape,
  Shape,
  StyleOverrides,
  CursorPreset,
  CustomCursor,
  Cursor,
} from "./types";

// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton";

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./DefaultHeartIcon";

// Vanilla CSS version
export { LikeButtonVanilla } from "./LikeButton.vanilla";

