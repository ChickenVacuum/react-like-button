import { describe, expect, it } from "vitest"
import { DEFAULT_PARTICLE_CONFIG, getParticlePreset, PARTICLE_PRESETS } from "../presets"

describe("Particle Presets", () => {
  describe("PARTICLE_PRESETS", () => {
    it("should have all required presets", () => {
      expect(PARTICLE_PRESETS).toHaveProperty("burst")
      expect(PARTICLE_PRESETS).toHaveProperty("fountain")
      expect(PARTICLE_PRESETS).toHaveProperty("confetti")
      expect(PARTICLE_PRESETS).toHaveProperty("gentle")
      expect(PARTICLE_PRESETS).toHaveProperty("fireworks")
    })

    it("should have exactly 5 presets", () => {
      expect(Object.keys(PARTICLE_PRESETS)).toHaveLength(5)
    })

    it("should have valid configuration for each preset", () => {
      Object.values(PARTICLE_PRESETS).forEach((preset) => {
        expect(preset).toHaveProperty("shape")
        expect(preset).toHaveProperty("speed")
        expect(preset).toHaveProperty("distance")
        expect(preset).toHaveProperty("spread")
        expect(preset).toHaveProperty("spreadOffset")
        expect(preset).toHaveProperty("size")
        expect(preset).toHaveProperty("colors")
        expect(preset).toHaveProperty("count")
        expect(preset).toHaveProperty("easing")
        expect(preset).toHaveProperty("fadeOut")
      })
    })

    it("should have valid numeric values", () => {
      Object.values(PARTICLE_PRESETS).forEach((preset) => {
        expect(preset.speed).toBeGreaterThan(0)
        expect(preset.count).toBeGreaterThan(0)
        expect(preset.spread).toBeGreaterThanOrEqual(0)
        expect(preset.spread).toBeLessThanOrEqual(360)
        expect(preset.colors.length).toBeGreaterThan(0)
      })
    })

    it("should have valid distance ranges", () => {
      Object.values(PARTICLE_PRESETS).forEach((preset) => {
        if (typeof preset.distance === "object") {
          expect(preset.distance.min).toBeLessThanOrEqual(preset.distance.max)
          expect(preset.distance.min).toBeGreaterThan(0)
        }
      })
    })

    it("should have valid size ranges", () => {
      Object.values(PARTICLE_PRESETS).forEach((preset) => {
        if (typeof preset.size === "object") {
          expect(preset.size.min).toBeLessThanOrEqual(preset.size.max)
          expect(preset.size.min).toBeGreaterThan(0)
        }
      })
    })
  })

  describe("getParticlePreset", () => {
    it("should return burst preset", () => {
      const preset = getParticlePreset("burst")
      expect(preset).toBe(PARTICLE_PRESETS.burst)
      expect(preset.shape).toBe("heart")
      expect(preset.count).toBe(12)
    })

    it("should return fountain preset", () => {
      const preset = getParticlePreset("fountain")
      expect(preset).toBe(PARTICLE_PRESETS.fountain)
      expect(preset.shape).toBe("circle")
      expect(preset.spreadOffset).toBe(-90)
    })

    it("should return confetti preset", () => {
      const preset = getParticlePreset("confetti")
      expect(preset).toBe(PARTICLE_PRESETS.confetti)
      expect(preset.shape).toBe("square")
      expect(preset.count).toBe(15)
    })

    it("should return gentle preset", () => {
      const preset = getParticlePreset("gentle")
      expect(preset).toBe(PARTICLE_PRESETS.gentle)
      expect(preset.count).toBe(6)
    })

    it("should return fireworks preset", () => {
      const preset = getParticlePreset("fireworks")
      expect(preset).toBe(PARTICLE_PRESETS.fireworks)
      expect(preset.shape).toBe("sparkle")
      expect(preset.count).toBe(16)
    })
  })

  describe("DEFAULT_PARTICLE_CONFIG", () => {
    it("should have all required fields", () => {
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("shape")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("speed")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("distance")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("spread")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("spreadOffset")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("size")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("colors")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("count")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("easing")
      expect(DEFAULT_PARTICLE_CONFIG).toHaveProperty("fadeOut")
    })

    it("should have valid default values", () => {
      expect(DEFAULT_PARTICLE_CONFIG.shape).toBe("heart")
      expect(DEFAULT_PARTICLE_CONFIG.speed).toBe(500)
      expect(DEFAULT_PARTICLE_CONFIG.count).toBe(8)
      expect(DEFAULT_PARTICLE_CONFIG.spread).toBe(360)
      expect(DEFAULT_PARTICLE_CONFIG.spreadOffset).toBe(0)
      expect(DEFAULT_PARTICLE_CONFIG.fadeOut).toBe(true)
    })

    it("should have valid distance range", () => {
      expect(DEFAULT_PARTICLE_CONFIG.distance).toEqual({ min: 60, max: 100 })
    })

    it("should have valid size range", () => {
      expect(DEFAULT_PARTICLE_CONFIG.size).toEqual({ min: 1.0, max: 1.5 })
    })

    it("should have valid colors array", () => {
      expect(Array.isArray(DEFAULT_PARTICLE_CONFIG.colors)).toBe(true)
      expect(DEFAULT_PARTICLE_CONFIG.colors.length).toBeGreaterThan(0)
    })

    it("should have valid easing function", () => {
      expect(typeof DEFAULT_PARTICLE_CONFIG.easing).toBe("string")
      expect(DEFAULT_PARTICLE_CONFIG.easing.length).toBeGreaterThan(0)
    })
  })

  describe("Preset characteristics", () => {
    it("burst should be fast and wide", () => {
      const burst = PARTICLE_PRESETS.burst
      expect(burst.speed).toBeLessThan(500) // Fast
      expect(burst.spread).toBe(360) // Full circle
      expect(burst.count).toBeGreaterThan(10) // Many particles
    })

    it("fountain should spray upward", () => {
      const fountain = PARTICLE_PRESETS.fountain
      expect(fountain.spreadOffset).toBe(-90) // Upward
      expect(fountain.spread).toBeLessThan(180) // Not full circle
    })

    it("confetti should be colorful and slow", () => {
      const confetti = PARTICLE_PRESETS.confetti
      expect(confetti.colors.length).toBeGreaterThan(4) // Many colors
      expect(confetti.speed).toBeGreaterThan(600) // Slower
    })

    it("gentle should be subtle", () => {
      const gentle = PARTICLE_PRESETS.gentle
      expect(gentle.count).toBeLessThan(8) // Fewer particles
      expect(gentle.speed).toBeGreaterThan(500) // Slower
    })

    it("fireworks should be explosive", () => {
      const fireworks = PARTICLE_PRESETS.fireworks
      expect(fireworks.shape).toBe("sparkle")
      expect(fireworks.count).toBeGreaterThan(12) // Many particles
      if (typeof fireworks.distance === "object") {
        expect(fireworks.distance.max).toBeGreaterThan(120) // Large distance
      }
    })
  })
})

