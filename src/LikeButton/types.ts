import type { UseLikeButtonOptions } from "./useLikeButton";

/** Props passed to custom icon render function */
export interface IconRenderProps {
  /** Suggested icon size in pixels (50% of button size by default) */
  size: number;
  /** Base CSS classes for positioning and transitions */
  className: string;
  /** Whether button is at max clicks */
  isMaxed: boolean;
  /** Current fill percentage (0-100) */
  fillPercentage: number;
}

/** Preset shape values */
export type ShapePreset = "circle" | "rounded" | "square";

/** Custom shape configuration */
export interface CustomShape {
  /** CSS border-radius value (e.g., "1rem", "50%", "1rem 2rem") */
  borderRadius?: string;
  /** CSS clip-path value for custom shapes (e.g., "polygon(...)", "circle(...)") */
  clipPath?: string;
}

/** Shape prop type - either a preset or custom configuration */
export type Shape = ShapePreset | CustomShape;

/** Preset cursor values */
export type CursorPreset = "heart" | "star" | "thumbs-up" | "pointer" | "none";

/** Custom cursor configuration */
export interface CustomCursor {
  /**
   * Cursor URL - can be a data URL (SVG/image) or external URL.
   * @example "data:image/svg+xml;utf8,<svg>...</svg>"
   * @example "/cursors/my-cursor.png"
   */
  url: string;
  /** Hotspot X coordinate (default: 16) */
  hotspotX?: number;
  /** Hotspot Y coordinate (default: 16) */
  hotspotY?: number;
  /** Fallback cursor if custom cursor fails to load (default: "pointer") */
  fallback?: "pointer" | "default" | "grab";
}

/**
 * Cursor prop type - either a preset string or custom configuration.
 * - "heart" (default): Heart-shaped cursor
 * - "star": Star-shaped cursor
 * - "thumbs-up": Thumbs up cursor
 * - "pointer": Standard pointer cursor (disables custom cursor)
 * - "none": Hides cursor entirely
 * - CustomCursor: Custom cursor with URL and hotspot configuration
 */
export type Cursor = CursorPreset | CustomCursor;

/** Override brutalist styling */
export interface StyleOverrides {
  /** Border width in pixels (default: 4) */
  borderWidth?: number;
  /** Border color (default: "#111827") */
  borderColor?: string;
  /** Shadow offset in pixels (default: 8) */
  shadowOffset?: number;
  /** Shadow color (default: "#111827") */
  shadowColor?: string;
  /** Background color (default: "white") */
  backgroundColor?: string;
}

/**
 * Base props shared between Tailwind and Vanilla CSS versions.
 * Both versions accept identical props for API consistency.
 */
export interface BaseLikeButtonProps extends UseLikeButtonOptions {
  /** Button size in pixels */
  size?: number;
  /** Fill color for the liquid effect */
  fillColor?: string;
  /** Wave color (darker shade for back wave) */
  waveColor?: string;
  /** Additional CSS class name */
  className?: string;
  /**
   * Custom icon render function.
   * - If undefined: renders default heart icon
   * - If null: renders no icon
   * - If function: calls with IconRenderProps
   */
  renderIcon?: ((props: IconRenderProps) => React.ReactNode) | null;
  /**
   * Button shape.
   * - Presets: "circle" (default), "rounded", "square"
   * - Custom: { borderRadius?: string, clipPath?: string }
   */
  shape?: Shape;
  /** Override brutalist styling (border, shadow, background) */
  styles?: StyleOverrides;
  /**
   * Cursor displayed when hovering over the button.
   * - "heart" (default): Heart-shaped cursor
   * - "star": Star-shaped cursor
   * - "thumbs-up": Thumbs up cursor
   * - "pointer": Standard pointer cursor
   * - "none": Hides cursor
   * - CustomCursor: { url, hotspotX?, hotspotY?, fallback? }
   */
  cursor?: Cursor;
}

/** Props for the LikeButton component (Tailwind version) */
export interface LikeButtonProps extends BaseLikeButtonProps {}

/** Props for the LikeButton component (Vanilla CSS version) */
export interface LikeButtonVanillaProps extends BaseLikeButtonProps {}

