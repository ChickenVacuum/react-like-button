import { useId, useMemo } from "react";
import { useLikeButton, LIKE_BUTTON_DEFAULTS } from "./useLikeButton";
import { ParticleVanilla } from "../Particle/Particle.vanilla";
import { DefaultHeartIcon } from "./DefaultHeartIcon";
import type { LikeButtonVanillaProps, IconRenderProps } from "./types";
import {
  DEFAULT_STYLES,
  getShapeStyles,
  computeHoverOffset,
  computeButtonStyles,
  generateDynamicStyles,
  getCursorStyle,
} from "./utils";

export type { LikeButtonVanillaProps };

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
 * <LikeButtonVanilla onClick={(clicks) => console.log('Clicks:', clicks)} />
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
 * ```
 */
export function LikeButtonVanilla({
  size = LIKE_BUTTON_DEFAULTS.size,
  fillColor = LIKE_BUTTON_DEFAULTS.fillColor,
  waveColor = LIKE_BUTTON_DEFAULTS.waveColor,
  className = "",
  showParticles = true,
  renderIcon,
  shape = "circle",
  styles = {},
  cursor = "heart",
  ...hookOptions
}: LikeButtonVanillaProps) {
  // Hooks must be called first and in consistent order
  const reactId = useId();
  const buttonId = `like-button${reactId.replace(/:/g, "-")}`;

  const {
    handleClick,
    handleRightClick,
    disabled,
    ariaLabel,
    isPressed,
    isMaxed,
    fillPercentage,
    particles,
  } = useLikeButton({ showParticles, ...hookOptions });

  // Memoize style computations
  const mergedStyles = useMemo(
    () => ({ ...DEFAULT_STYLES, ...styles }),
    [styles],
  );

  const shapeStyles = useMemo(() => getShapeStyles(shape), [shape]);

  const buttonStyle = useMemo(
    () => computeButtonStyles(size, mergedStyles, shapeStyles),
    [size, mergedStyles, shapeStyles],
  );

  const hoverShadowOffset = useMemo(
    () => computeHoverOffset(mergedStyles.shadowOffset),
    [mergedStyles.shadowOffset],
  );

  const dynamicStyles = useMemo(
    () =>
      generateDynamicStyles(`#${buttonId}`, hoverShadowOffset, mergedStyles),
    [buttonId, hoverShadowOffset, mergedStyles],
  );

  // Cursor style (not-allowed when disabled)
  const cursorStyle = useMemo(
    () => (disabled ? "not-allowed" : getCursorStyle(cursor)),
    [cursor, disabled],
  );

  // Icon configuration
  const iconSize = size * 0.5;
  const iconRenderProps: IconRenderProps = {
    size: iconSize,
    className: "like-button__icon",
    isMaxed,
    fillPercentage,
  };

  const renderedIcon =
    renderIcon === null ? null : renderIcon === undefined ? (
      <DefaultHeartIcon {...iconRenderProps} />
    ) : (
      renderIcon(iconRenderProps)
    );

  return (
    <div className="like-button-container">
      {/* Dynamic styles for hover/active states */}
      <style>{dynamicStyles}</style>

      <button
        id={buttonId}
        type="button"
        onClick={handleClick}
        onContextMenu={handleRightClick}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-pressed={isPressed}
        aria-disabled={disabled}
        style={{ ...buttonStyle, cursor: cursorStyle }}
        className={`like-button ${className}`.trim()}
      >
        {/* Liquid Fill Container */}
        <div
          className="like-button__fill"
          style={{
            backgroundColor: fillColor,
            height: isMaxed ? "100%" : `${fillPercentage * 0.85}%`,
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
  );
}

export default LikeButtonVanilla;

