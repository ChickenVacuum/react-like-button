#!/usr/bin/env node
/**
 * Cross-platform CSS build script
 * Concatenates vanilla CSS files into a single dist/styles.css
 *
 * This replaces the Unix-only `cat` command for Windows compatibility.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, "..")

// CSS files to concatenate (in order)
const cssFiles = [
  "src/LikeButton/LikeButton.vanilla.css",
  "src/Particle/Particle.vanilla.css",
]

// Output file
const outputFile = "dist/styles.css"

function buildCss() {
  // Ensure dist directory exists
  const distDir = join(rootDir, "dist")
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true })
  }

  // Read and concatenate all CSS files
  const cssContent = cssFiles
    .map((file) => {
      const filePath = join(rootDir, file)
      try {
        return readFileSync(filePath, "utf-8")
      } catch (error) {
        console.error(`Error reading ${file}:`, error.message)
        process.exit(1)
      }
    })
    .join("\n")

  // Write the concatenated CSS
  const outputPath = join(rootDir, outputFile)
  try {
    writeFileSync(outputPath, cssContent, "utf-8")
    console.log(`✓ Built ${outputFile} (${cssFiles.length} files concatenated)`)
  } catch (error) {
    console.error(`Error writing ${outputFile}:`, error.message)
    process.exit(1)
  }
}

buildCss()

