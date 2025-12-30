import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { createRef } from "react"
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
    it("should use external clicks value", () => {
      const onClick = vi.fn()
      render(<LikeButtonVanilla clicks={5} maxClicks={10} onClick={onClick} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledWith(6, expect.any(Object))
    })

    it("should be disabled when external clicks equals maxClicks", () => {
      render(<LikeButtonVanilla clicks={10} maxClicks={10} />)

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
          clicks={2}
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

  describe("shape prop", () => {
    it("should apply circle shape by default", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "9999px" })
    })

    it("should apply rounded shape", () => {
      render(<LikeButtonVanilla shape="rounded" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "1rem" })
    })

    it("should apply square shape", () => {
      render(<LikeButtonVanilla shape="square" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "0" })
    })

    it("should apply custom borderRadius", () => {
      render(<LikeButtonVanilla shape={{ borderRadius: "2rem" }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "2rem" })
    })
  })

  describe("styles prop", () => {
    it("should apply custom border width", () => {
      render(<LikeButtonVanilla styles={{ borderWidth: 2 }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderWidth: "2px" })
    })

    it("should apply custom border color", () => {
      render(<LikeButtonVanilla styles={{ borderColor: "#ff0000" }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderColor: "#ff0000" })
    })

    it("should apply custom background color", () => {
      render(<LikeButtonVanilla styles={{ backgroundColor: "#f0f0f0" }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ backgroundColor: "#f0f0f0" })
    })
  })

  describe("cursor prop", () => {
    it("should apply heart cursor by default", () => {
      render(<LikeButtonVanilla />)

      const button = screen.getByRole("button")
      const cursorStyle = button.style.cursor
      expect(cursorStyle).toContain("url(")
    })

    it("should apply pointer cursor", () => {
      render(<LikeButtonVanilla cursor="pointer" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ cursor: "pointer" })
    })

    it("should apply none cursor", () => {
      render(<LikeButtonVanilla cursor="none" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ cursor: "none" })
    })

    it("should apply not-allowed cursor when disabled", () => {
      render(<LikeButtonVanilla disabled cursor="heart" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ cursor: "not-allowed" })
    })
  })

  describe("renderIcon prop", () => {
    it("should render custom icon", () => {
      render(
        <LikeButtonVanilla
          renderIcon={({ size }) => (
            <span data-testid="custom-icon" style={{ width: size }}>
              ★
            </span>
          )}
        />,
      )

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument()
    })

    it("should render no icon when null", () => {
      render(<LikeButtonVanilla renderIcon={null} />)

      const button = screen.getByRole("button")
      // The icon SVG has viewBox="0 0 24 24", wave SVGs have "0 0 100 20"
      const iconSvg = button.querySelector('svg[viewBox="0 0 24 24"]')
      expect(iconSvg).not.toBeInTheDocument()
    })

    it("should pass correct props to renderIcon", () => {
      const renderIcon = vi.fn(() => <span>Icon</span>)
      render(<LikeButtonVanilla size={100} renderIcon={renderIcon} />)

      expect(renderIcon).toHaveBeenCalledWith(
        expect.objectContaining({
          size: 50, // 50% of button size
          isMaxed: false,
          fillPercentage: 0,
        }),
      )
    })
  })

  describe("minFillPercent prop", () => {
    it("should apply minimum fill percentage when no clicks", () => {
      render(<LikeButtonVanilla minFillPercent={20} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".like-button__fill")

      expect(fill).toHaveStyle({ height: "20%" })
    })

    it("should scale correctly with clicks", () => {
      render(<LikeButtonVanilla minFillPercent={10} clicks={5} maxClicks={10} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".like-button__fill")

      // fillPercentage = 50%, expected: 10 + (50/100) * (85-10) = 47.5%
      expect(fill).toHaveStyle({ height: "47.5%" })
    })

    it("should show 100% height when maxed regardless of minFillPercent", () => {
      render(<LikeButtonVanilla minFillPercent={20} clicks={10} maxClicks={10} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".like-button__fill")

      // When maxed, should always be 100%
      expect(fill).toHaveStyle({ height: "100%" })
    })

    it("should clamp minFillPercent above 85 to 85", () => {
      render(<LikeButtonVanilla minFillPercent={100} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".like-button__fill")

      // Should be clamped to 85%
      expect(fill).toHaveStyle({ height: "85%" })
    })

    it("should clamp negative minFillPercent to 0", () => {
      render(<LikeButtonVanilla minFillPercent={-10} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".like-button__fill")

      // Should be clamped to 0%
      expect(fill).toHaveStyle({ height: "0%" })
    })
  })

  describe("showWaves prop", () => {
    it("should render wave elements by default", () => {
      render(<LikeButtonVanilla />)
      const button = screen.getByRole("button")
      const waves = button.querySelectorAll(".like-button__wave")
      expect(waves.length).toBeGreaterThan(0)
    })

    it("should not render wave elements when showWaves is false", () => {
      render(<LikeButtonVanilla showWaves={false} />)
      const button = screen.getByRole("button")
      const waves = button.querySelectorAll(".like-button__wave")
      expect(waves.length).toBe(0)
    })

    it("should still render fill container when showWaves is false", () => {
      render(<LikeButtonVanilla showWaves={false} clicks={5} maxClicks={10} />)
      const button = screen.getByRole("button")
      const fill = button.querySelector(".like-button__fill")
      expect(fill).toBeInTheDocument()
    })

    it("should still show particles when showWaves is false", () => {
      render(<LikeButtonVanilla showWaves={false} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should disable both waves and particles independently", () => {
      render(<LikeButtonVanilla showWaves={false} showParticles={false} />)
      const button = screen.getByRole("button")
      const waves = button.querySelectorAll(".like-button__wave")
      expect(waves.length).toBe(0)

      fireEvent.click(button)
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(0)
    })
  })

  describe("ref forwarding", () => {
    it("should forward ref to the button element", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<LikeButtonVanilla ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.tagName).toBe("BUTTON")
    })

    it("should allow programmatic focus via ref", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<LikeButtonVanilla ref={ref} />)

      ref.current?.focus()

      expect(document.activeElement).toBe(ref.current)
    })

    it("should allow programmatic click via ref", () => {
      const ref = createRef<HTMLButtonElement>()
      const onClick = vi.fn()
      render(<LikeButtonVanilla ref={ref} onClick={onClick} />)

      ref.current?.click()

      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))
    })
  })
})
