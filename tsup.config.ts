import { defineConfig } from "tsup"

/**
 * CSS Bundling Note:
 *
 * The vanilla CSS files (LikeButton.vanilla.css, Particle.vanilla.css) are
 * concatenated via scripts/build-css.js (cross-platform Node.js script).
 *
 * To add more CSS files, update the cssFiles array in scripts/build-css.js.
 *
 * If the project scales significantly, consider using postcss-import:
 *   1. pnpm add -D postcss postcss-cli postcss-import cssnano
 *   2. Create postcss.config.js with import and minification plugins
 *   3. Create src/styles.css with: @import "./LikeButton/LikeButton.vanilla.css";
 *   4. Update build: "tsup && postcss src/styles.css -o dist/styles.css"
 */

export default defineConfig({
  entry: {
    index: "src/index.ts",
    vanilla: "src/vanilla.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
  esbuildOptions(options) {
    options.jsx = "automatic"
  },
})
