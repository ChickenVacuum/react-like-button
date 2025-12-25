// Headless hook (logic only)
export { useLikeButton, LIKE_BUTTON_DEFAULTS } from "./LikeButton/useLikeButton";
export type {
  UseLikeButtonOptions,
  UseLikeButtonReturn,
  ParticleData,
} from "./LikeButton/useLikeButton";

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
} from "./LikeButton/types";

// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton/LikeButton";

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./LikeButton/DefaultHeartIcon";

// Vanilla CSS version (also available from ./vanilla entry)
export { LikeButtonVanilla } from "./LikeButton/LikeButton.vanilla";

// Particle components
export { Particle } from "./Particle/Particle";
export { ParticleVanilla } from "./Particle/Particle.vanilla";
export { useParticle } from "./Particle/useParticle";
export type { ParticleProps, UseParticleReturn } from "./Particle/useParticle";

