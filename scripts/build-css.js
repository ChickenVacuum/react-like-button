#!/usr/bin/env node
/**
 * Cross-platform CSS build script
 * - Concatenates vanilla CSS files into dist/styles.css
 * - Copies Tailwind CSS file to dist/like-button.css
 *
 * This replaces the Unix-only `cat` command for Windows compatibility.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = join(__dirname, "..")

// Vanilla CSS files to concatenate (in order) -> dist/styles.css
const vanillaCssFiles = [
  "src/LikeButton/LikeButton.vanilla.css",
  "src/Particle/Particle.vanilla.css",
]

// Tailwind CSS file -> dist/like-button.css
const tailwindCssFile = "src/LikeButton/LikeButton.css"

function ensureDistDir() {
  const distDir = join(rootDir, "dist")
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true })
  }
}

function readFile(file) {
  const filePath = join(rootDir, file)
  try {
    return readFileSync(filePath, "utf-8")
  } catch (error) {
    console.error(`Error reading ${file}:`, error.message)
    process.exit(1)
  }
}

function writeFile(outputFile, content) {
  const outputPath = join(rootDir, outputFile)
  try {
    writeFileSync(outputPath, content, "utf-8")
  } catch (error) {
    console.error(`Error writing ${outputFile}:`, error.message)
    process.exit(1)
  }
}

function buildCss() {
  ensureDistDir()

  // Build vanilla CSS (concatenated)
  const vanillaCssContent = vanillaCssFiles.map(readFile).join("\n")
  writeFile("dist/styles.css", vanillaCssContent)
  console.log(`✓ Built dist/styles.css (${vanillaCssFiles.length} files concatenated)`)

  // Copy Tailwind CSS
  const tailwindCssContent = readFile(tailwindCssFile)
  writeFile("dist/like-button.css", tailwindCssContent)
  console.log("✓ Built dist/like-button.css")
}

buildCss()

