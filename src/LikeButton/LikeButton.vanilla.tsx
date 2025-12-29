import { forwardRef, useId, useMemo } from "react"
import { ParticleVanilla } from "../Particle/Particle.vanilla"
import { DefaultHeartIcon } from "./DefaultHeartIcon"
import type { IconRenderProps, LikeButtonVanillaProps } from "./types"
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

export type { LikeButtonVanillaProps }

/**
 * LikeButton - Animated like button with liquid fill and particle effects.
 * This version uses vanilla CSS (no Tailwind dependency).
 *
 * @example
 * ```tsx
 * import { LikeButtonVanilla } from '@jepepa/like-button';
 * import '@jepepa/like-button/styles.css';
 *
 * // Default usage
 * <LikeButtonVanilla onClick={(clicks, event) => console.log('Clicks:', clicks)} />
 *
 * // Custom icon
 * <LikeButtonVanilla renderIcon={({ size }) => <CustomIcon size={size} />} />
 *
 * // Custom shape
 * <LikeButtonVanilla shape="rounded" />
 * <LikeButtonVanilla shape={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
 *
 * // Custom styles
 * <LikeButtonVanilla styles={{ shadowOffset: 4, borderWidth: 2 }} />
 *
 * // Custom cursor
 * <LikeButtonVanilla cursor="star" />
 * <LikeButtonVanilla cursor={{ url: "data:image/svg+xml;...", hotspotX: 16, hotspotY: 16 }} />
 *
 * // Minimum fill for custom shapes
 * <LikeButtonVanilla minFillPercent={15} shape={{ clipPath: "polygon(...)" }} />
 *
 * // Particle presets (same API as Tailwind version)
 * <LikeButtonVanilla particlePreset="burst" />
 * <LikeButtonVanilla particlePreset="confetti" />
 * <LikeButtonVanilla particlePreset="fireworks" />
 *
 * // Custom particle configuration
 * <LikeButtonVanilla particleConfig={{
 *   shape: 'star',
 *   colors: ['#FFD700', '#FFA500'],
 *   count: 15,
 *   speed: 800
 * }} />
 *
 * // Combine preset with custom config
 * <LikeButtonVanilla
 *   particlePreset="burst"
 *   particleConfig={{ count: 20 }}
 * />
 * ```
 */
export const LikeButtonVanilla = forwardRef<HTMLButtonElement, LikeButtonVanillaProps>(
  function LikeButtonVanilla(
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
    const iconRenderProps: IconRenderProps = {
      size: iconSize,
      className: "like-button__icon",
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
      <div className="like-button-container">
        <button
          ref={ref}
          id={buttonId}
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
          className={`like-button ${className}`.trim()}
        >
          {/* Liquid Fill Container */}
          <div
            className="like-button__fill"
            style={{
              backgroundColor: fillColor,
              height: isMaxed
                ? "100%"
                : `${clampedMinFill + (fillPercentage / 100) * (MAX_FILL_HEIGHT - clampedMinFill)}%`,
            }}
          >
            {/* Wave 1 (Back Layer) */}
            <div className="like-button__wave like-button__wave--back">
              {[0, 1].map((i) => (
                <svg
                  key={i}
                  className="like-button__wave-svg"
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
            <div className="like-button__wave like-button__wave--front">
              {[0, 1].map((i) => (
                <svg
                  key={i}
                  className="like-button__wave-svg"
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
          <div className="like-button__particles" aria-hidden="true">
            {particles.map((p) => (
              <ParticleVanilla key={p.id} {...p} />
            ))}
          </div>
        )}
      </div>
    )
  },
)

export default LikeButtonVanilla
