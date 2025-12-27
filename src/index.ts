// Headless hook (logic only)

// Default icon (can be used as reference for custom icons)
export { DefaultHeartIcon } from "./LikeButton/DefaultHeartIcon"
// Tailwind version (default)
export { LikeButton, LikeButton as default } from "./LikeButton/LikeButton"
// Vanilla CSS version (also available from ./vanilla entry)
export { LikeButtonVanilla } from "./LikeButton/LikeButton.vanilla"
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
} from "./LikeButton/types"
export type {
  ParticleData,
  UseLikeButtonOptions,
  UseLikeButtonReturn,
} from "./LikeButton/useLikeButton"
export { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./LikeButton/useLikeButton"

// Particle components
export { Particle } from "./Particle/Particle"
export { ParticleVanilla } from "./Particle/Particle.vanilla"
// Particle types
export type {
  CustomParticleShape,
  ParticleConfig,
  ParticlePreset,
  ParticleShape,
  ParticleShapePreset,
  ParticleShapeProps,
  Range,
} from "./Particle/types"
export type { ParticleProps, UseParticleReturn } from "./Particle/useParticle"
export { useParticle } from "./Particle/useParticle"
