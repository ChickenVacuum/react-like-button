import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { LikeButtonVanilla } from "../LikeButton.vanilla"

// Ensure cleanup after each test
afterEach(() => {
  cleanup()
})

describe("LikeButtonVanilla", () => {
  describe("rendering", () => {
    it("should render a button element", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should render with custom size", () => {
      render(<LikeButtonVanilla size={120} />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })
  })

  describe("particle presets", () => {
    it("should render with burst preset", () => {
      render(<LikeButtonVanilla particlePreset="burst" />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should render with fountain preset", () => {
      render(<LikeButtonVanilla particlePreset="fountain" />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should render with confetti preset", () => {
      render(<LikeButtonVanilla particlePreset="confetti" />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should render with gentle preset", () => {
      render(<LikeButtonVanilla particlePreset="gentle" />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should render with fireworks preset", () => {
      render(<LikeButtonVanilla particlePreset="fireworks" />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should spawn particles with burst preset on click", () => {
      render(<LikeButtonVanilla particlePreset="burst" />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Burst preset spawns 12 particles
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(12)
    })

    it("should spawn particles with fountain preset on click", () => {
      render(<LikeButtonVanilla particlePreset="fountain" />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Fountain preset spawns 10 particles
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(10)
    })

    it("should spawn particles with confetti preset on click", () => {
      render(<LikeButtonVanilla particlePreset="confetti" />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Confetti preset spawns 15 particles
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(15)
    })

    it("should spawn particles with gentle preset on click", () => {
      render(<LikeButtonVanilla particlePreset="gentle" />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Gentle preset spawns 6 particles
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(6)
    })

    it("should spawn particles with fireworks preset on click", () => {
      render(<LikeButtonVanilla particlePreset="fireworks" />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Fireworks preset spawns 16 particles
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(16)
    })
  })

  describe("custom particle configuration", () => {
    it("should render with custom particle count", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 25 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(25)
    })

    it("should render with custom particle shape", () => {
      render(<LikeButtonVanilla particleConfig={{ shape: "star" }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Particles should be rendered
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should render with custom particle colors", () => {
      render(<LikeButtonVanilla particleConfig={{ colors: ["#ff0000", "#00ff00"] }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should merge preset with custom config", () => {
      render(<LikeButtonVanilla particlePreset="burst" particleConfig={{ count: 30 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Custom count should override preset count
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(30)
    })

    it("should render with custom speed", () => {
      render(<LikeButtonVanilla particleConfig={{ speed: 2000 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should render with custom easing", () => {
      render(<LikeButtonVanilla particleConfig={{ easing: "ease-in-out" }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should render with fadeOut disabled", () => {
      render(<LikeButtonVanilla particleConfig={{ fadeOut: false }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should render with custom distance range", () => {
      render(<LikeButtonVanilla particleConfig={{ distance: { min: 100, max: 200 } }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should render with custom size range", () => {
      render(<LikeButtonVanilla particleConfig={{ size: { min: 2.0, max: 3.0 } }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should render with custom spread and offset", () => {
      render(<LikeButtonVanilla particleConfig={{ spread: 90, spreadOffset: -90 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })
  })

  describe("particle rendering and cleanup", () => {
    it("should render particles after click", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")

      // No particles initially
      let particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(0)

      // Click to spawn particles
      fireEvent.click(button)

      // Particles should be rendered
      particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should not render particles when showParticles is false", () => {
      render(<LikeButtonVanilla showParticles={false} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(0)
    })

    it("should render particles with correct shape components", () => {
      render(<LikeButtonVanilla particleConfig={{ shape: "star" }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Particles should contain SVG elements (shapes are SVG-based)
      const svgs = document.querySelectorAll(".like-button__particles svg")
      expect(svgs.length).toBeGreaterThan(0)
    })

    it("should render particles with heart shape by default", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const svgs = document.querySelectorAll(".like-button__particles svg")
      expect(svgs.length).toBeGreaterThan(0)
    })

    it("should spawn new particles on each click", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 5 }} />)

      const button = screen.getByRole("button")

      // First click
      fireEvent.click(button)
      let particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(5)

      // Second click (particles accumulate briefly before cleanup)
      fireEvent.click(button)
      particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThanOrEqual(5)
    })
  })

  describe("edge cases and error handling", () => {
    it("should handle empty particle config", () => {
      render(<LikeButtonVanilla particleConfig={{}} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Should use defaults
      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBeGreaterThan(0)
    })

    it("should handle partial particle config", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 7 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(7)
    })

    it("should handle zero particle count", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 0 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(0)
    })

    it("should handle single particle", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 1 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(1)
    })

    it("should handle large particle count", () => {
      render(<LikeButtonVanilla particleConfig={{ count: 100 }} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(100)
    })

    it("should handle all shape presets", () => {
      const shapes = ["heart", "star", "circle", "square", "sparkle"] as const

      shapes.forEach((shape) => {
        cleanup()
        render(<LikeButtonVanilla particleConfig={{ shape }} />)

        const button = screen.getByRole("button")
        fireEvent.click(button)

        const particles = document.querySelectorAll(".like-button__particles > div")
        expect(particles.length).toBeGreaterThan(0)
      })
    })

    it("should handle combined preset and config overrides", () => {
      render(
        <LikeButtonVanilla
          particlePreset="burst"
          particleConfig={{
            count: 8,
            shape: "star",
            colors: ["#ff0000"],
            speed: 1500,
          }}
        />,
      )

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      expect(particles.length).toBe(8)
    })
  })

  describe("API parity with Tailwind version", () => {
    it("should accept same props as Tailwind version", () => {
      // Both versions should accept identical props
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

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should produce same particle count as Tailwind version with same config", () => {
      cleanup()
      render(<LikeButtonVanilla particlePreset="confetti" />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      const particles = document.querySelectorAll(".like-button__particles > div")
      // Confetti preset has 15 particles in both versions
      expect(particles.length).toBe(15)
    })
  })
})
