import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { LikeButtonVanilla } from "../LikeButton.vanilla"
import { getParticleCount, getParticleSvgs, PARTICLE_PRESETS, PARTICLE_SHAPES } from "./test-utils"

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

  describe("default maxClicks=1 behavior", () => {
    it("should fill to max with single click by default", () => {
      const onClick = vi.fn()
      render(<LikeButtonVanilla onClick={onClick} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))
      expect(button).toBeDisabled()
    })

    it("should be disabled after one click with default settings", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(button).toBeDisabled()
    })
  })

  describe("click behavior", () => {
    it("should call onClick with click count", () => {
      const onClick = vi.fn()
      render(<LikeButtonVanilla onClick={onClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))
    })

    it("should increment clicks on each click", () => {
      const onClick = vi.fn()
      render(<LikeButtonVanilla onClick={onClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledTimes(3)
      expect(onClick).toHaveBeenLastCalledWith(3, expect.any(Object))
    })

    it("should stop responding after maxClicks", () => {
      const onClick = vi.fn()
      render(<LikeButtonVanilla onClick={onClick} maxClicks={2} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button) // Should be ignored

      expect(onClick).toHaveBeenCalledTimes(2)
    })

    it("should not respond when disabled", () => {
      const onClick = vi.fn()
      render(<LikeButtonVanilla onClick={onClick} disabled />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe("right-click behavior", () => {
    it("should call onRightClick with current click count", () => {
      const onRightClick = vi.fn()
      render(<LikeButtonVanilla onRightClick={onRightClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.contextMenu(button)

      expect(onRightClick).toHaveBeenCalledWith(0, expect.any(Object))
    })

    it("should not increment clicks on right-click", () => {
      const onClick = vi.fn()
      const onRightClick = vi.fn()
      render(<LikeButtonVanilla onClick={onClick} onRightClick={onRightClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.contextMenu(button)
      fireEvent.contextMenu(button)

      expect(onRightClick).toHaveBeenCalledTimes(2)
      expect(onRightClick).toHaveBeenLastCalledWith(0, expect.any(Object))

      fireEvent.click(button)
      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))

      fireEvent.contextMenu(button)
      expect(onRightClick).toHaveBeenLastCalledWith(1, expect.any(Object))
    })

    it("should not call onRightClick when disabled", () => {
      const onRightClick = vi.fn()
      render(<LikeButtonVanilla onRightClick={onRightClick} disabled />)

      const button = screen.getByRole("button")
      fireEvent.contextMenu(button)

      expect(onRightClick).not.toHaveBeenCalled()
    })
  })

  describe("keyboard accessibility", () => {
    it("should trigger onRightClick with Shift+Enter", () => {
      const onRightClick = vi.fn()
      render(<LikeButtonVanilla onRightClick={onRightClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.keyDown(button, { key: "Enter", shiftKey: true })

      expect(onRightClick).toHaveBeenCalledWith(0, expect.any(Object))
    })

    it("should not trigger onRightClick with Enter only", () => {
      const onRightClick = vi.fn()
      render(<LikeButtonVanilla onRightClick={onRightClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.keyDown(button, { key: "Enter", shiftKey: false })

      expect(onRightClick).not.toHaveBeenCalled()
    })

    it("should have aria-keyshortcuts when onRightClick is provided", () => {
      render(<LikeButtonVanilla onRightClick={() => {}} />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-keyshortcuts", "Shift+Enter")
    })

    it("should not have aria-keyshortcuts when onRightClick is not provided", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      expect(button).not.toHaveAttribute("aria-keyshortcuts")
    })
  })

  describe("accessibility", () => {
    it("should have aria-label", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-label")
    })

    it("should have aria-pressed attribute", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-pressed", "false")
    })

    it("should update aria-pressed after click", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(button).toHaveAttribute("aria-pressed", "true")
    })

    it("should have aria-disabled when disabled", () => {
      render(<LikeButtonVanilla disabled />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-disabled", "true")
    })

    it("should accept custom aria-label", () => {
      render(<LikeButtonVanilla ariaLabel="Custom label" />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-label", "Custom label")
    })
  })

  describe("controlled mode", () => {
    it("should use external localClicks value", () => {
      const onClick = vi.fn()
      render(<LikeButtonVanilla localClicks={5} maxClicks={10} onClick={onClick} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledWith(6, expect.any(Object))
    })

    it("should be disabled when external localClicks equals maxClicks", () => {
      render(<LikeButtonVanilla localClicks={10} maxClicks={10} />)

      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
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
