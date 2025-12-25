// Vanilla CSS entry point
// Use this for projects without Tailwind CSS

// Re-export everything from main
export * from "./index";

// Override default export with vanilla version
export { LikeButtonVanilla as default } from "./LikeButton/LikeButton.vanilla";

