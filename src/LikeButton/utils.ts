import type { Cursor, CursorPreset, Shape, StyleOverrides } from "./types"

// ============================================
// Layout & Animation Constants
// ============================================

/**
 * Maximum fill height percentage.
 * Leaves room for wave animation at top (15% reserved for wave visual).
 */
export const MAX_FILL_HEIGHT = 85

/**
 * Icon size as a ratio of the button size.
 * Icon will be 50% of the button dimension.
 */
export const ICON_SIZE_RATIO = 0.5

/**
 * Minimum hover offset in pixels.
 * Used to ensure the button always has some visible hover movement.
 */
export const MIN_HOVER_OFFSET = 2

/**
 * Buffer time (ms) added to particle animation duration before cleanup.
 * Ensures animation completes before particle is removed from DOM.
 */
export const PARTICLE_CLEANUP_BUFFER_MS = 100

// ============================================
// Wave Animation Durations (seconds)
// These are used in inline styles and CSS animations
// ============================================

/** Duration for the back wave animation (slower, creates depth) */
export const WAVE_BACK_DURATION_S = 3

/** Duration for the front wave animation (faster, creates motion) */
export const WAVE_FRONT_DURATION_S = 1.5

// ============================================
// Default Styles
// ============================================

/** Default style values for brutalist design */
export const DEFAULT_STYLES: Required<StyleOverrides> = {
  borderWidth: 4,
  borderColor: "#111827",
  shadowOffset: 8,
  shadowColor: "#111827",
  backgroundColor: "white",
}

/**
 * Compute CSS properties from a shape prop value.
 * Handles both preset strings and custom shape objects.
 */
export function getShapeStyles(shape: Shape = "circle"): React.CSSProperties {
  if (typeof shape === "string") {
    switch (shape) {
      case "circle":
        return { borderRadius: "9999px" }
      case "rounded":
        return { borderRadius: "1rem" }
      case "square":
        return { borderRadius: "0" }
      default:
        return { borderRadius: "9999px" }
    }
  }

  // Custom shape object
  const styles: React.CSSProperties = {}
  if (shape.clipPath) {
    styles.clipPath = shape.clipPath
    // When using clipPath, default to no border-radius unless specified
    styles.borderRadius = shape.borderRadius ?? "0"
  } else if (shape.borderRadius) {
    styles.borderRadius = shape.borderRadius
  }
  return styles
}

/**
 * Compute the shadow offset for hover state.
 * Returns half the original offset, with a minimum defined by MIN_HOVER_OFFSET.
 */
export function computeHoverOffset(shadowOffset: number): number {
  return Math.max(shadowOffset / 2, MIN_HOVER_OFFSET)
}

/**
 * Compute button inline styles from merged style overrides and shape styles.
 */
export function computeButtonStyles(
  size: number,
  mergedStyles: Required<StyleOverrides>,
  shapeStyles: React.CSSProperties,
): React.CSSProperties {
  return {
    width: size,
    height: size,
    borderWidth: mergedStyles.borderWidth,
    borderColor: mergedStyles.borderColor,
    backgroundColor: mergedStyles.backgroundColor,
    boxShadow: `${mergedStyles.shadowOffset}px ${mergedStyles.shadowOffset}px 0px ${mergedStyles.shadowColor}`,
    ...shapeStyles,
  }
}

/**
 * Generate CSS custom properties for hover/active states.
 * These are set as inline styles on the button element.
 *
 * The static CSS rules in LikeButton.vanilla.css (or Tailwind's hover: classes)
 * reference these custom properties for the actual hover/active styling.
 *
 * This approach:
 * - Eliminates inline <style> tag injection (better for CSP)
 * - Reduces DOM pollution (no duplicate keyframe definitions)
 * - Works with both Tailwind and vanilla CSS versions
 */
export function computeHoverActiveVars(
  hoverShadowOffset: number,
  mergedStyles: Required<StyleOverrides>,
): React.CSSProperties {
  const translateOnHover = mergedStyles.shadowOffset - hoverShadowOffset

  return {
    "--shadow-offset": `${mergedStyles.shadowOffset}px`,
    "--shadow-color": mergedStyles.shadowColor,
    "--hover-shadow-offset": `${hoverShadowOffset}px`,
    "--translate-hover": `${translateOnHover}px`,
  } as React.CSSProperties
}

// ============================================
// Cursor Utilities
// ============================================

/** SVG cursor data URLs for preset cursors (32x32, hotspot at center) */
const CURSOR_SVGS: Record<Exclude<CursorPreset, "pointer" | "none">, string> = {
  heart: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23EF4444' stroke='%23111827' stroke-width='1.5'><path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'/></svg>`,
  star: `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%23FBBF24' stroke='%23111827' stroke-width='1.5'><path d='M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'/></svg>`,
  "thumbs-up": `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 24 24' fill='%233B82F6' stroke='%23111827' stroke-width='1.5'><path d='M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3'/></svg>`,
}

/** Default hotspot position (center of 32x32 cursor) */
const DEFAULT_HOTSPOT = 16

/**
 * Generate CSS cursor value from cursor prop.
 * Returns a complete CSS cursor property value.
 */
export function getCursorStyle(cursor: Cursor = "heart"): string {
  // Handle preset strings
  if (typeof cursor === "string") {
    switch (cursor) {
      case "pointer":
        return "pointer"
      case "none":
        return "none"
      case "heart":
      case "star":
      case "thumbs-up":
        return `url("${CURSOR_SVGS[cursor]}") ${DEFAULT_HOTSPOT} ${DEFAULT_HOTSPOT}, pointer`
      default:
        // Fallback for unknown presets
        return "pointer"
    }
  }

  // Handle custom cursor object
  const {
    url,
    hotspotX = DEFAULT_HOTSPOT,
    hotspotY = DEFAULT_HOTSPOT,
    fallback = "pointer",
  } = cursor
  return `url("${url}") ${hotspotX} ${hotspotY}, ${fallback}`
}
