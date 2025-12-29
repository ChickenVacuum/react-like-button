import { forwardRef, useId, useMemo } from "react"
import { Particle } from "../Particle/Particle"
import { DefaultHeartIcon } from "./DefaultHeartIcon"
import type { LikeButtonProps } from "./types"
import { LIKE_BUTTON_DEFAULTS, useLikeButton } from "./useLikeButton"
import {
  computeButtonStyles,
  computeHoverActiveVars,
  computeHoverOffset,
  DEFAULT_STYLES,
  getCursorStyle,
  getShapeStyles,
  MAX_FILL_HEIGHT,
} from "./utils"

export type { LikeButtonProps }

// Static Tailwind class strings extracted to avoid string concatenation on every render
const BUTTON_BASE_CLASSES =
  "relative overflow-hidden z-10 border-solid flex items-center justify-center group transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-dark focus-visible:ring-offset-2"
const WRAPPER_CLASSES = "relative inline-block"
const FILL_CONTAINER_CLASSES =
  "absolute bottom-0 left-0 right-0 z-0 transition-[height] duration-500 ease-out"
const WAVE_CONTAINER_CLASSES = "absolute bottom-full left-0 w-[200%] h-4 flex"
const WAVE_SVG_CLASSES = "w-1/2 h-full fill-current"
const PARTICLE_CONTAINER_CLASSES =
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"

/**
 * LikeButton - Animated like button with liquid fill and particle effects.
 * This version uses Tailwind CSS for styling.
 *
 * @example
 * ```tsx
 * // Default heart button
 * <LikeButton onClick={(clicks, event) => console.log('Clicks:', clicks)} />
 *
 * // Custom icon
 * <LikeButton renderIcon={({ size }) => <CustomIcon size={size} />} />
 *
 * // Custom shape
 * <LikeButton shape="rounded" />
 * <LikeButton shape={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
 *
 * // Custom styles
 * <LikeButton styles={{ shadowOffset: 4, borderWidth: 2 }} />
 *
 * // Custom cursor
 * <LikeButton cursor="star" />
 * <LikeButton cursor="pointer" /> // Standard pointer
 * <LikeButton cursor={{ url: "data:image/svg+xml;...", hotspotX: 16, hotspotY: 16 }} />
 *
 * // Minimum fill for custom shapes
 * <LikeButton minFillPercent={15} shape={{ clipPath: "polygon(...)" }} />
 *
 * // Particle presets
 * <LikeButton particlePreset="burst" />
 * <LikeButton particlePreset="confetti" />
 * <LikeButton particlePreset="fireworks" />
 *
 * // Custom particle configuration
 * <LikeButton particleConfig={{
 *   shape: 'star',
 *   colors: ['#FFD700', '#FFA500'],
 *   count: 15,
 *   speed: 800
 * }} />
 *
 * // Combine preset with custom config
 * <LikeButton
 *   particlePreset="burst"
 *   particleConfig={{ count: 20, colors: ['#ff0000'] }}
 * />
 *
 * // Advanced particle configuration
 * <LikeButton particleConfig={{
 *   shape: 'sparkle',
 *   count: 12,
 *   speed: 600,
 *   distance: { min: 80, max: 120 },
 *   spread: 180,
 *   spreadOffset: -90, // Upward spray
 *   size: { min: 1.2, max: 2.0 },
 *   easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
 *   fadeOut: true
 * }} />
 * ```
 */
export const LikeButton = forwardRef<HTMLButtonElement, LikeButtonProps>(function LikeButton(
  {
    size = LIKE_BUTTON_DEFAULTS.size,
    fillColor = LIKE_BUTTON_DEFAULTS.fillColor,
    waveColor = LIKE_BUTTON_DEFAULTS.waveColor,
    className = "",
    showParticles = true,
    renderIcon,
    shape = "circle",
    styles = {},
    cursor = "heart",
    minFillPercent = 0,
    ...hookOptions
  },
  ref,
) {
  // Clamp minFillPercent to valid range (0-85)
  const clampedMinFill = Math.max(0, Math.min(MAX_FILL_HEIGHT, minFillPercent))
  // Hooks must be called first and in consistent order
  const reactId = useId()
  const buttonId = `like-button${reactId.replace(/:/g, "-")}`

  const {
    handleClick,
    handleRightClick,
    handleKeyDown,
    disabled,
    ariaLabel,
    isPressed,
    isMaxed,
    fillPercentage,
    particles,
    hasRightClickAction,
  } = useLikeButton({ showParticles, ...hookOptions })

  // Memoize style computations
  const mergedStyles = useMemo(() => ({ ...DEFAULT_STYLES, ...styles }), [styles])

  const shapeStyles = useMemo(() => getShapeStyles(shape), [shape])

  const buttonStyle = useMemo(
    () => computeButtonStyles(size, mergedStyles, shapeStyles),
    [size, mergedStyles, shapeStyles],
  )

  const hoverShadowOffset = useMemo(
    () => computeHoverOffset(mergedStyles.shadowOffset),
    [mergedStyles.shadowOffset],
  )

  // CSS custom properties for hover/active states (no <style> tag needed)
  const hoverActiveVars = useMemo(
    () => computeHoverActiveVars(hoverShadowOffset, mergedStyles),
    [hoverShadowOffset, mergedStyles],
  )

  // Cursor style (not-allowed when disabled)
  const cursorStyle = useMemo(
    () => (disabled ? "not-allowed" : getCursorStyle(cursor)),
    [cursor, disabled],
  )

  // Icon configuration
  const iconSize = size * 0.5
  const iconRenderProps = {
    size: iconSize,
    className: "relative z-20 transition-colors duration-300 pointer-events-none",
    isMaxed,
    fillPercentage,
  }

  const renderedIcon =
    renderIcon === null ? null : renderIcon === undefined ? (
      <DefaultHeartIcon {...iconRenderProps} />
    ) : (
      renderIcon(iconRenderProps)
    )

  return (
    <div className={WRAPPER_CLASSES}>
      <button
        ref={ref}
        id={buttonId}
        data-like-button
        type="button"
        onClick={handleClick}
        onContextMenu={handleRightClick}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-pressed={isPressed}
        aria-disabled={disabled}
        aria-keyshortcuts={hasRightClickAction ? "Shift+Enter" : undefined}
        style={{ ...buttonStyle, ...hoverActiveVars, cursor: cursorStyle }}
        className={`${BUTTON_BASE_CLASSES} ${className}`}
      >
        {/* Liquid Fill Container */}
        <div
          className={FILL_CONTAINER_CLASSES}
          style={{
            backgroundColor: fillColor,
            height: isMaxed
              ? "100%"
              : `${clampedMinFill + (fillPercentage / 100) * (MAX_FILL_HEIGHT - clampedMinFill)}%`,
          }}
        >
          {/* Wave 1 (Back Layer) */}
          <div
            className={WAVE_CONTAINER_CLASSES}
            style={{ animation: "wave-scroll-left 3s linear infinite" }}
          >
            {[0, 1].map((i) => (
              <svg
                key={i}
                className={WAVE_SVG_CLASSES}
                style={{ color: waveColor }}
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0,10 Q25,0 50,10 T100,10 V20 H0 Z" />
              </svg>
            ))}
          </div>

          {/* Wave 2 (Front Layer) */}
          <div
            className={WAVE_CONTAINER_CLASSES}
            style={{ animation: "wave-scroll-right 1.5s linear infinite" }}
          >
            {[0, 1].map((i) => (
              <svg
                key={i}
                className={WAVE_SVG_CLASSES}
                style={{ color: fillColor }}
                viewBox="0 0 100 20"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <path d="M0,10 Q25,5 50,10 T100,10 V20 H0 Z" />
              </svg>
            ))}
          </div>
        </div>

        {/* Icon (customizable via renderIcon prop) */}
        {renderedIcon}
      </button>

      {/* Particles */}
      {showParticles && (
        <div className={PARTICLE_CONTAINER_CLASSES} aria-hidden="true">
          {particles.map((p) => (
            <Particle key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  )
})

export default LikeButton
