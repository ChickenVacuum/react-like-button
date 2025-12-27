import { describe, expect, it } from "vitest"
import { DEFAULT_PARTICLE_CONFIG } from "../presets"
import {
  mergeParticleConfig,
  normalizeAngle,
  normalizeRange,
  randomAngle,
  randomInRange,
  resolveParticleConfig,
} from "../utils"

describe("Particle Utils", () => {
  describe("normalizeRange", () => {
    it("converts a number to a range with same min and max", () => {
      const result = normalizeRange(100)
      expect(result).toEqual({ min: 100, max: 100 })
    })

    it("returns the range object as-is", () => {
      const range = { min: 50, max: 150 }
      const result = normalizeRange(range)
      expect(result).toEqual(range)
    })

    it("handles zero", () => {
      const result = normalizeRange(0)
      expect(result).toEqual({ min: 0, max: 0 })
    })

    it("handles negative numbers", () => {
      const result = normalizeRange(-50)
      expect(result).toEqual({ min: -50, max: -50 })
    })
  })

  describe("randomInRange", () => {
    it("returns the same value when min equals max", () => {
      const result = randomInRange({ min: 100, max: 100 })
      expect(result).toBe(100)
    })

    it("returns a value within the range", () => {
      const range = { min: 50, max: 150 }
      for (let i = 0; i < 100; i++) {
        const result = randomInRange(range)
        expect(result).toBeGreaterThanOrEqual(range.min)
        expect(result).toBeLessThanOrEqual(range.max)
      }
    })

    it("handles zero range", () => {
      const result = randomInRange({ min: 0, max: 0 })
      expect(result).toBe(0)
    })

    it("handles negative ranges", () => {
      const range = { min: -100, max: -50 }
      for (let i = 0; i < 100; i++) {
        const result = randomInRange(range)
        expect(result).toBeGreaterThanOrEqual(range.min)
        expect(result).toBeLessThanOrEqual(range.max)
      }
    })
  })

  describe("normalizeAngle", () => {
    it("returns angle as-is when in 0-360 range", () => {
      expect(normalizeAngle(0)).toBe(0)
      expect(normalizeAngle(180)).toBe(180)
      expect(normalizeAngle(359)).toBe(359)
    })

    it("normalizes angles greater than 360", () => {
      expect(normalizeAngle(360)).toBe(0)
      expect(normalizeAngle(450)).toBe(90)
      expect(normalizeAngle(720)).toBe(0)
    })

    it("normalizes negative angles", () => {
      expect(normalizeAngle(-90)).toBe(270)
      expect(normalizeAngle(-180)).toBe(180)
      expect(normalizeAngle(-270)).toBe(90)
      expect(normalizeAngle(-360)).toBe(0)
    })

    it("handles large positive angles", () => {
      expect(normalizeAngle(1080)).toBe(0)
      expect(normalizeAngle(1125)).toBe(45)
    })

    it("handles large negative angles", () => {
      expect(normalizeAngle(-720)).toBe(0)
      expect(normalizeAngle(-810)).toBe(270)
    })
  })

  describe("randomAngle", () => {
    it("generates angles within full circle (360°)", () => {
      for (let i = 0; i < 100; i++) {
        const angle = randomAngle(360, 0)
        expect(angle).toBeGreaterThanOrEqual(0)
        expect(angle).toBeLessThan(360)
      }
    })

    it("generates angles within semicircle (180°)", () => {
      for (let i = 0; i < 100; i++) {
        const angle = randomAngle(180, 0)
        expect(angle).toBeGreaterThanOrEqual(0)
        expect(angle).toBeLessThan(180)
      }
    })

    it("applies offset correctly", () => {
      for (let i = 0; i < 100; i++) {
        const angle = randomAngle(180, 90)
        expect(angle).toBeGreaterThanOrEqual(90)
        expect(angle).toBeLessThan(270)
      }
    })

    it("handles upward burst (offset: -90, spread: 180)", () => {
      for (let i = 0; i < 100; i++) {
        const angle = randomAngle(180, -90)
        // Should be in range 270-360 or 0-90 (upward semicircle)
        expect(angle >= 270 || angle <= 90).toBe(true)
      }
    })

    it("handles narrow spread", () => {
      for (let i = 0; i < 100; i++) {
        const angle = randomAngle(45, 0)
        expect(angle).toBeGreaterThanOrEqual(0)
        expect(angle).toBeLessThan(45)
      }
    })

    it("normalizes result to 0-360 range", () => {
      for (let i = 0; i < 100; i++) {
        const angle = randomAngle(360, 360)
        expect(angle).toBeGreaterThanOrEqual(0)
        expect(angle).toBeLessThan(360)
      }
    })

    it("handles zero spread", () => {
      const angle = randomAngle(0, 90)
      expect(angle).toBe(90)
    })
  })

  describe("mergeParticleConfig", () => {
    it("returns base config when override is undefined", () => {
      const base = { count: 8, colors: ["#FF0000"], speed: 500 }
      const result = mergeParticleConfig(base, undefined)
      expect(result).toEqual(base)
    })

    it("merges override into base", () => {
      const base = { count: 8, colors: ["#FF0000"], speed: 500 }
      const override = { count: 12, speed: 600 }
      const result = mergeParticleConfig(base, override)

      expect(result.count).toBe(12)
      expect(result.speed).toBe(600)
      expect(result.colors).toEqual(["#FF0000"]) // Unchanged from base
    })

    it("override completely replaces base values", () => {
      const base = { colors: ["#FF0000", "#00FF00"], count: 8 }
      const override = { colors: ["#0000FF"] }
      const result = mergeParticleConfig(base, override)

      expect(result.colors).toEqual(["#0000FF"])
      expect(result.count).toBe(8)
    })

    it("handles empty override", () => {
      const base = { count: 8, speed: 500 }
      const override = {}
      const result = mergeParticleConfig(base, override)

      expect(result).toEqual(base)
    })

    it("handles partial configs", () => {
      const base = { shape: "heart" as const, count: 8 }
      const override = { count: 12 }
      const result = mergeParticleConfig(base, override)

      expect(result.shape).toBe("heart")
      expect(result.count).toBe(12)
    })

    it("handles range values", () => {
      const base = { distance: { min: 60, max: 100 } }
      const override = { distance: { min: 80, max: 120 } }
      const result = mergeParticleConfig(base, override)

      expect(result.distance).toEqual({ min: 80, max: 120 })
    })
  })

  describe("resolveParticleConfig", () => {
    it("returns defaults when no preset or config", () => {
      const result = resolveParticleConfig(undefined, undefined)
      expect(result).toEqual(DEFAULT_PARTICLE_CONFIG)
    })

    it("applies preset over defaults", () => {
      const result = resolveParticleConfig("burst", undefined)
      expect(result.count).toBe(12) // burst preset count
      expect(result.shape).toBe("heart") // burst preset shape
      expect(result.speed).toBe(400) // burst preset speed
    })

    it("applies config over defaults when no preset", () => {
      const result = resolveParticleConfig(undefined, { count: 15, speed: 700 })
      expect(result.count).toBe(15)
      expect(result.speed).toBe(700)
      expect(result.shape).toBe(DEFAULT_PARTICLE_CONFIG.shape) // From defaults
    })

    it("applies config over preset (config has highest priority)", () => {
      const result = resolveParticleConfig("burst", { count: 5, speed: 1000 })
      expect(result.count).toBe(5) // Custom config wins
      expect(result.speed).toBe(1000) // Custom config wins
      expect(result.shape).toBe("heart") // From burst preset
    })

    it("merges all three layers correctly", () => {
      const result = resolveParticleConfig("fountain", { count: 20 })
      // From custom config
      expect(result.count).toBe(20)
      // From fountain preset
      expect(result.shape).toBe("circle")
      expect(result.spreadOffset).toBe(-90)
      // From defaults (if not in preset)
      expect(result.fadeOut).toBe(true)
    })

    it("handles all presets", () => {
      const presets = ["burst", "fountain", "confetti", "gentle", "fireworks"] as const

      presets.forEach((preset) => {
        const result = resolveParticleConfig(preset, undefined)
        expect(result).toBeDefined()
        expect(result.count).toBeGreaterThan(0)
        expect(result.speed).toBeGreaterThan(0)
      })
    })

    it("returns complete config with all required fields", () => {
      const result = resolveParticleConfig("burst", { count: 10 })

      expect(result).toHaveProperty("shape")
      expect(result).toHaveProperty("speed")
      expect(result).toHaveProperty("distance")
      expect(result).toHaveProperty("spread")
      expect(result).toHaveProperty("spreadOffset")
      expect(result).toHaveProperty("size")
      expect(result).toHaveProperty("colors")
      expect(result).toHaveProperty("count")
      expect(result).toHaveProperty("easing")
      expect(result).toHaveProperty("fadeOut")
    })

    it("handles custom shape in config", () => {
      const customShape = {
        render: () => null,
      }
      const result = resolveParticleConfig(undefined, { shape: customShape })
      expect(result.shape).toBe(customShape)
    })

    it("handles number values for distance and size", () => {
      const result = resolveParticleConfig(undefined, { distance: 100, size: 2.0 })
      expect(result.distance).toBe(100)
      expect(result.size).toBe(2.0)
    })

    it("handles range values for distance and size", () => {
      const result = resolveParticleConfig(undefined, {
        distance: { min: 50, max: 150 },
        size: { min: 0.5, max: 2.5 },
      })
      expect(result.distance).toEqual({ min: 50, max: 150 })
      expect(result.size).toEqual({ min: 0.5, max: 2.5 })
    })
  })
})
