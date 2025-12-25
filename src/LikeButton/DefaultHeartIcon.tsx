import type { IconRenderProps } from "./types";

/**
 * Default heart icon for LikeButton.
 * Can be used as reference for creating custom icons.
 */
export function DefaultHeartIcon({ size, className }: IconRenderProps) {
  return (
    <svg
      className={className}
      style={{
        width: size,
        height: size,
        stroke: "#111827",
        strokeWidth: 2,
        fill: "transparent",
      }}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
      />
    </svg>
  );
}

export default DefaultHeartIcon;

