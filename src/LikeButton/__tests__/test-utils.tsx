/**
 * Shared test utilities for LikeButton component tests.
 *
 * This module provides:
 * - Shared test fixtures (presets, shapes, etc.)
 * - Common helper functions
 * - Mock factories
 */
import { vi } from "vitest"
import type { ParticlePreset, ParticleShapePreset } from "../../Particle/types"

// ============================================
// Test Fixtures
// ============================================

/**
 * Particle preset configurations with expected particle counts.
 * Use with it.each or forEach for data-driven tests.
 */
export const PARTICLE_PRESETS = [
  { name: "burst" as const, expectedCount: 12 },
  { name: "fountain" as const, expectedCount: 10 },
  { name: "confetti" as const, expectedCount: 15 },
  { name: "gentle" as const, expectedCount: 6 },
  { name: "fireworks" as const, expectedCount: 16 },
] satisfies Array<{ name: ParticlePreset; expectedCount: number }>

/**
 * All available particle shapes for testing.
 */
export const PARTICLE_SHAPES: ParticleShapePreset[] = [
  "heart",
  "star",
  "circle",
  "square",
  "sparkle",
]

// ============================================
// Mock Factories
// ============================================

/**
 * Create mock callback functions for testing.
 */
export function createMockCallbacks() {
  return {
    onClick: vi.fn(),
    onRightClick: vi.fn(),
  }
}

// ============================================
// DOM Query Helpers
// ============================================

/**
 * Get particle elements from the DOM using a selector.
 */
export function getParticles(selector: string): NodeListOf<Element> {
  return document.querySelectorAll(selector)
}

/**
 * Get the count of particles in the DOM.
 */
export function getParticleCount(selector: string): number {
  return getParticles(selector).length
}

/**
 * Get SVG elements within a particle container.
 */
export function getParticleSvgs(particleSelector: string): NodeListOf<Element> {
  const svgSelector = particleSelector.replace("> div", "svg")
  return document.querySelectorAll(svgSelector)
}
