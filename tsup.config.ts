import { defineConfig } from "tsup"

/**
 * CSS Bundling Note:
 *
 * The vanilla CSS files (LikeButton.vanilla.css, Particle.vanilla.css) are
 * concatenated via `cat` in the build script (package.json).
 *
 * If the project scales with more CSS files, consider using postcss-import:
 *   1. pnpm add -D postcss-import
 *   2. Create postcss.config.js: { plugins: [require('postcss-import')] }
 *   3. Create src/styles.css with: @import "./LikeButton/LikeButton.vanilla.css";
 *   4. Update build: "tsup && postcss src/styles.css -o dist/styles.css"
 */

export default defineConfig({
  entry: {
    index: "src/index.ts",
    vanilla: "src/vanilla.ts",
  },
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic"
  },
})
