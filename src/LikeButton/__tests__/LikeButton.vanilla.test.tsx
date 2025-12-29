import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { LikeButtonVanilla } from "../LikeButton.vanilla"
import {
  getParticleCount,
  getParticleSvgs,
  PARTICLE_PRESETS,
  PARTICLE_SHAPES,
} from "./test-utils.tsx"

// Selector for vanilla component particles
const PARTICLE_SELECTOR = ".like-button__particles > div"

afterEach(() => {
  cleanup()
})

describe("LikeButtonVanilla", () => {
  describe("rendering", () => {
    it("should render a button element", () => {
      render(<LikeButtonVanilla />)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("should render with custom size", () => {
      render(<LikeButtonVanilla size={120} />)
      expect(screen.getByRole("button")).toBeInTheDocument()
    })
  })

  describe("particle presets", () => {
    PARTICLE_PRESETS.forEach(({ name, expectedCount }) => {
      it(`should render with ${name} preset`, () => {
        render(<LikeButtonVanilla particlePreset={name} />)
        expect(screen.getByRole("button")).toBeInTheDocument()
      })

      it(`should spawn ${expectedCount} particles with ${name} preset on click`, () => {
        render(<LikeButtonVanilla particlePreset={name} />)
        fireEvent.click(screen.getByRole("button"))
        expect(getParticleCount(PARTICLE_SELECTOR)).toBe(expectedCount)
      })
    })
  })

  describe("custom particle configuration", () => {
    it("should render with custom particle count", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 25 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(25)
    })

    it("should render with custom particle shape", () => {
      render(<LikeButtonVanilla particleConfig={{ shape: "star" }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom particle colors", () => {
      render(<LikeButtonVanilla particleConfig={{ colors: ["#ff0000", "#00ff00"] }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should merge preset with custom config (custom count overrides preset)", () => {
      render(<LikeButtonVanilla particlePreset="burst" particleConfig={{ count: 30 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(30)
    })

    it("should render with custom speed", () => {
      render(<LikeButtonVanilla particleConfig={{ speed: 2000 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom easing", () => {
      render(<LikeButtonVanilla particleConfig={{ easing: "ease-in-out" }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with fadeOut disabled", () => {
      render(<LikeButtonVanilla particleConfig={{ fadeOut: false }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom distance range", () => {
      render(<LikeButtonVanilla particleConfig={{ distance: { min: 100, max: 200 } }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom size range", () => {
      render(<LikeButtonVanilla particleConfig={{ size: { min: 2.0, max: 3.0 } }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom spread and offset", () => {
      render(<LikeButtonVanilla particleConfig={{ spread: 90, spreadOffset: -90 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })
  })

  describe("particle rendering", () => {
    it("should render no particles initially", () => {
      render(<LikeButtonVanilla />)
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(0)
    })

    it("should render particles after click", () => {
      render(<LikeButtonVanilla />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should not render particles when showParticles is false", () => {
      render(<LikeButtonVanilla showParticles={false} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(0)
    })

    it("should render particles as SVG elements", () => {
      render(<LikeButtonVanilla particleConfig={{ shape: "star" }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleSvgs(PARTICLE_SELECTOR).length).toBeGreaterThan(0)
    })

    it("should render heart shape particles by default", () => {
      render(<LikeButtonVanilla />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleSvgs(PARTICLE_SELECTOR).length).toBeGreaterThan(0)
    })

    it("should spawn new particles on each click", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 5 }} />)
      const button = screen.getByRole("button")

      fireEvent.click(button)
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(5)

      fireEvent.click(button)
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThanOrEqual(5)
    })
  })

  describe("particle edge cases", () => {
    it("should handle empty particle config", () => {
      render(<LikeButtonVanilla particleConfig={{}} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should handle zero particle count", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 0 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(0)
    })

    it("should handle single particle", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 1 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(1)
    })

    it("should handle large particle count", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 100 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(100)
    })

    PARTICLE_SHAPES.forEach((shape) => {
      it(`should render ${shape} shape particles`, () => {
        render(<LikeButtonVanilla particleConfig={{ shape }} />)
        fireEvent.click(screen.getByRole("button"))
        expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
      })
    })

    it("should handle combined preset and config overrides", () => {
      render(
        <LikeButtonVanilla
          particlePreset="burst"
          particleConfig={{ count: 8, shape: "star", colors: ["#ff0000"], speed: 1500 }}
        />,
      )
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(8)
    })
  })

  describe("API parity with Tailwind version", () => {
    it("should accept same props as Tailwind version", () => {
      render(
        <LikeButtonVanilla
          size={100}
          fillColor="#ff0000"
          waveColor="#00ff00"
          particlePreset="burst"
          particleConfig={{ count: 10 }}
          showParticles={true}
          maxClicks={5}
          localClicks={2}
        />,
      )
      expect(screen.getByRole("button")).toBeInTheDocument()
    })

    it("should produce same particle count as Tailwind version with same config", () => {
      render(<LikeButtonVanilla particlePreset="confetti" />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(15)
    })
  })
})
