import { cleanup, fireEvent, render, screen } from "@testing-library/react"
import { createRef } from "react"
import { afterEach, describe, expect, it, vi } from "vitest"
import { LikeButton } from "../LikeButton"
import { getCursorStyle } from "../utils"
import { getParticleCount, getParticleSvgs, PARTICLE_PRESETS, PARTICLE_SHAPES } from "./test-utils"

// Selector for Tailwind component particles
const PARTICLE_SELECTOR = '[aria-hidden="true"] > div'

afterEach(() => {
  cleanup()
})

describe("getCursorStyle", () => {
  describe("preset cursors", () => {
    it('should return heart cursor URL for "heart" preset', () => {
      const result = getCursorStyle("heart")
      expect(result).toContain("url(")
      expect(result).toContain("16 16")
      expect(result).toContain("pointer")
      expect(result).toContain("EF4444") // heart fill color
    })

    it('should return star cursor URL for "star" preset', () => {
      const result = getCursorStyle("star")
      expect(result).toContain("url(")
      expect(result).toContain("16 16")
      expect(result).toContain("pointer")
      expect(result).toContain("FBBF24") // star fill color
    })

    it('should return thumbs-up cursor URL for "thumbs-up" preset', () => {
      const result = getCursorStyle("thumbs-up")
      expect(result).toContain("url(")
      expect(result).toContain("16 16")
      expect(result).toContain("pointer")
      expect(result).toContain("3B82F6") // thumbs-up fill color
    })

    it('should return "pointer" for pointer preset', () => {
      const result = getCursorStyle("pointer")
      expect(result).toBe("pointer")
    })

    it('should return "none" for none preset', () => {
      const result = getCursorStyle("none")
      expect(result).toBe("none")
    })

    it("should default to heart cursor when no argument provided", () => {
      const result = getCursorStyle()
      expect(result).toContain("url(")
      expect(result).toContain("EF4444") // heart fill color
    })
  })

  describe("custom cursors", () => {
    it("should generate cursor with custom URL and default hotspot", () => {
      const result = getCursorStyle({
        url: "https://example.com/cursor.png",
      })
      expect(result).toContain('url("https://example.com/cursor.png")')
      expect(result).toContain("16 16") // default hotspot
      expect(result).toContain("pointer") // default fallback
    })

    it("should generate cursor with custom hotspot", () => {
      const result = getCursorStyle({
        url: "https://example.com/cursor.png",
        hotspotX: 5,
        hotspotY: 10,
      })
      expect(result).toContain("5 10")
    })

    it("should generate cursor with custom fallback", () => {
      const result = getCursorStyle({
        url: "https://example.com/cursor.png",
        fallback: "grab",
      })
      expect(result).toContain("grab")
    })

    it("should handle data URL cursors", () => {
      const dataUrl = "data:image/svg+xml;utf8,<svg></svg>"
      const result = getCursorStyle({ url: dataUrl })
      expect(result).toContain(dataUrl)
    })
  })
})

describe("LikeButton", () => {
  describe("rendering", () => {
    it("should render a button element", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      expect(button).toBeInTheDocument()
    })

    it("should render with custom size", () => {
      render(<LikeButton size={120} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ width: "120px", height: "120px" })
    })

    it("should apply custom className", () => {
      render(<LikeButton className="my-custom-class" />)

      const button = screen.getByRole("button")
      expect(button).toHaveClass("my-custom-class")
    })

    it("should render heart icon", () => {
      render(<LikeButton />)

      const svg = screen.getByRole("button").querySelector("svg")
      expect(svg).toBeInTheDocument()
    })
  })

  describe("default maxClicks=1 behavior", () => {
    it("should fill to max with single click by default", () => {
      const onClick = vi.fn()
      render(<LikeButton onClick={onClick} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))
      expect(button).toBeDisabled()
    })

    it("should be disabled after one click with default settings", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(button).toBeDisabled()
    })
  })

  describe("click behavior", () => {
    it("should call onClick with click count", () => {
      const onClick = vi.fn()
      render(<LikeButton onClick={onClick} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))
    })

    it("should increment clicks on each click", () => {
      const onClick = vi.fn()
      render(<LikeButton onClick={onClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button)

      expect(onClick).toHaveBeenCalledTimes(3)
      expect(onClick).toHaveBeenLastCalledWith(3, expect.any(Object))
    })

    it("should stop responding after maxClicks", () => {
      const onClick = vi.fn()
      render(<LikeButton onClick={onClick} maxClicks={2} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)
      fireEvent.click(button)
      fireEvent.click(button) // Should be ignored

      expect(onClick).toHaveBeenCalledTimes(2)
    })

    it("should not respond when disabled", () => {
      const onClick = vi.fn()
      render(<LikeButton onClick={onClick} disabled />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe("right-click behavior", () => {
    it("should call onRightClick with current click count", () => {
      const onRightClick = vi.fn()
      render(<LikeButton onRightClick={onRightClick} />)

      const button = screen.getByRole("button")
      fireEvent.contextMenu(button)

      expect(onRightClick).toHaveBeenCalledWith(0, expect.any(Object))
    })

    it("should not increment clicks on right-click", () => {
      const onClick = vi.fn()
      const onRightClick = vi.fn()
      render(<LikeButton onClick={onClick} onRightClick={onRightClick} maxClicks={5} />)

      const button = screen.getByRole("button")
      fireEvent.contextMenu(button)
      fireEvent.contextMenu(button)

      // Right-click should not increment
      expect(onRightClick).toHaveBeenCalledTimes(2)
      expect(onRightClick).toHaveBeenLastCalledWith(0, expect.any(Object))

      // Now click once
      fireEvent.click(button)
      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))

      // Right-click should show updated count
      fireEvent.contextMenu(button)
      expect(onRightClick).toHaveBeenLastCalledWith(1, expect.any(Object))
    })

    it("should not call onRightClick when disabled", () => {
      const onRightClick = vi.fn()
      render(<LikeButton onRightClick={onRightClick} disabled />)

      const button = screen.getByRole("button")
      fireEvent.contextMenu(button)

      expect(onRightClick).not.toHaveBeenCalled()
    })
  })

  describe("keyboard accessibility", () => {
    it("should trigger onRightClick with Shift+Enter", () => {
      const onRightClick = vi.fn()
      render(<LikeButton onRightClick={onRightClick} />)

      const button = screen.getByRole("button")
      fireEvent.keyDown(button, { key: "Enter", shiftKey: true })

      expect(onRightClick).toHaveBeenCalledWith(0, expect.any(Object))
    })

    it("should not trigger onRightClick with Enter only (no Shift)", () => {
      const onRightClick = vi.fn()
      render(<LikeButton onRightClick={onRightClick} />)

      const button = screen.getByRole("button")
      fireEvent.keyDown(button, { key: "Enter", shiftKey: false })

      expect(onRightClick).not.toHaveBeenCalled()
    })

    it("should not trigger onRightClick with Shift+Enter when disabled", () => {
      const onRightClick = vi.fn()
      render(<LikeButton onRightClick={onRightClick} disabled />)

      const button = screen.getByRole("button")
      fireEvent.keyDown(button, { key: "Enter", shiftKey: true })

      expect(onRightClick).not.toHaveBeenCalled()
    })

    it("should have aria-keyshortcuts when onRightClick is provided", () => {
      const onRightClick = vi.fn()
      render(<LikeButton onRightClick={onRightClick} />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-keyshortcuts", "Shift+Enter")
    })

    it("should not have aria-keyshortcuts when onRightClick is not provided", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      expect(button).not.toHaveAttribute("aria-keyshortcuts")
    })

    it("should use current click count when Shift+Enter is pressed", () => {
      const onRightClick = vi.fn()
      render(<LikeButton onRightClick={onRightClick} maxClicks={5} />)

      const button = screen.getByRole("button")

      // Click twice first
      fireEvent.click(button)
      fireEvent.click(button)

      // Then use Shift+Enter
      fireEvent.keyDown(button, { key: "Enter", shiftKey: true })

      expect(onRightClick).toHaveBeenCalledWith(2, expect.any(Object))
    })
  })

  describe("accessibility", () => {
    it("should have aria-label", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-label")
    })

    it("should have aria-pressed attribute", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-pressed", "false")
    })

    it("should update aria-pressed after click", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      expect(button).toHaveAttribute("aria-pressed", "true")
    })

    it("should have aria-disabled when disabled", () => {
      render(<LikeButton disabled />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-disabled", "true")
    })

    it("should accept custom aria-label", () => {
      render(<LikeButton ariaLabel="Custom label" />)

      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("aria-label", "Custom label")
    })
  })

  describe("controlled mode", () => {
    it("should use external localClicks value", () => {
      const onClick = vi.fn()
      render(<LikeButton localClicks={5} maxClicks={10} onClick={onClick} />)

      const button = screen.getByRole("button")
      fireEvent.click(button)

      // Should report 6 (5 + 1)
      expect(onClick).toHaveBeenCalledWith(6, expect.any(Object))
    })

    it("should be disabled when external localClicks equals maxClicks", () => {
      render(<LikeButton localClicks={10} maxClicks={10} />)

      const button = screen.getByRole("button")
      expect(button).toBeDisabled()
    })
  })

  describe("shape prop", () => {
    it("should apply circle shape by default", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "9999px" })
    })

    it("should apply rounded shape", () => {
      render(<LikeButton shape="rounded" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "1rem" })
    })

    it("should apply square shape", () => {
      render(<LikeButton shape="square" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "0" })
    })

    it("should apply custom borderRadius", () => {
      render(<LikeButton shape={{ borderRadius: "2rem" }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderRadius: "2rem" })
    })
  })

  describe("styles prop", () => {
    it("should apply custom border width", () => {
      render(<LikeButton styles={{ borderWidth: 2 }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderWidth: "2px" })
    })

    it("should apply custom border color", () => {
      render(<LikeButton styles={{ borderColor: "#ff0000" }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ borderColor: "#ff0000" })
    })

    it("should apply custom background color", () => {
      render(<LikeButton styles={{ backgroundColor: "#f0f0f0" }} />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ backgroundColor: "#f0f0f0" })
    })
  })

  describe("cursor prop", () => {
    it("should apply heart cursor by default", () => {
      render(<LikeButton />)

      const button = screen.getByRole("button")
      const cursorStyle = button.style.cursor
      expect(cursorStyle).toContain("url(")
    })

    it("should apply pointer cursor", () => {
      render(<LikeButton cursor="pointer" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ cursor: "pointer" })
    })

    it("should apply none cursor", () => {
      render(<LikeButton cursor="none" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ cursor: "none" })
    })

    it("should apply not-allowed cursor when disabled", () => {
      render(<LikeButton disabled cursor="heart" />)

      const button = screen.getByRole("button")
      expect(button).toHaveStyle({ cursor: "not-allowed" })
    })
  })

  describe("renderIcon prop", () => {
    it("should render custom icon", () => {
      render(
        <LikeButton
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
      render(<LikeButton renderIcon={null} />)

      const button = screen.getByRole("button")
      // The icon SVG has viewBox="0 0 24 24", wave SVGs have "0 0 100 20"
      const iconSvg = button.querySelector('svg[viewBox="0 0 24 24"]')
      expect(iconSvg).not.toBeInTheDocument()
    })

    it("should pass correct props to renderIcon", () => {
      const renderIcon = vi.fn(() => <span>Icon</span>)
      render(<LikeButton size={100} renderIcon={renderIcon} />)

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
      render(<LikeButton minFillPercent={20} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      expect(fill).toHaveStyle({ height: "20%" })
    })

    it("should scale correctly with clicks", () => {
      render(<LikeButton minFillPercent={10} localClicks={5} maxClicks={10} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      // fillPercentage = 50%, expected: 10 + (50/100) * (85-10) = 47.5%
      expect(fill).toHaveStyle({ height: "47.5%" })
    })

    it("should reach max fill height at 100% fill (not maxed)", () => {
      render(<LikeButton minFillPercent={10} localClicks={10} maxClicks={20} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      // fillPercentage = 50%, expected: 10 + (50/100) * (85-10) = 47.5%
      expect(fill).toHaveStyle({ height: "47.5%" })
    })

    it("should reach 85% at 100% fill when not maxed", () => {
      render(<LikeButton minFillPercent={10} localClicks={14} maxClicks={14} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      // When maxed (localClicks === maxClicks), should be 100%
      expect(fill).toHaveStyle({ height: "100%" })
    })

    it("should handle edge case when minFillPercent equals 85", () => {
      render(<LikeButton minFillPercent={85} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      expect(fill).toHaveStyle({ height: "85%" })
    })

    it("should clamp minFillPercent above 85 to 85", () => {
      render(<LikeButton minFillPercent={100} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      // Should be clamped to 85%
      expect(fill).toHaveStyle({ height: "85%" })
    })

    it("should clamp negative minFillPercent to 0", () => {
      render(<LikeButton minFillPercent={-10} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      // Should be clamped to 0%
      expect(fill).toHaveStyle({ height: "0%" })
    })

    it("should show 100% height when maxed regardless of minFillPercent", () => {
      render(<LikeButton minFillPercent={20} localClicks={10} maxClicks={10} />)

      const button = screen.getByRole("button")
      const fill = button.querySelector(".absolute.bottom-0")

      // When maxed, should always be 100%
      expect(fill).toHaveStyle({ height: "100%" })
    })
  })

  describe("particle presets", () => {
    PARTICLE_PRESETS.forEach(({ name, expectedCount }) => {
      it(`should render with ${name} preset`, () => {
        render(<LikeButton particlePreset={name} />)
        expect(screen.getByRole("button")).toBeInTheDocument()
      })

      it(`should spawn ${expectedCount} particles with ${name} preset on click`, () => {
        render(<LikeButton particlePreset={name} />)
        fireEvent.click(screen.getByRole("button"))
        expect(getParticleCount(PARTICLE_SELECTOR)).toBe(expectedCount)
      })
    })
  })

  describe("custom particle configuration", () => {
    it("should render with custom particle count", () => {
      render(<LikeButton particleConfig={{ count: 25 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(25)
    })

    it("should render with custom particle shape", () => {
      render(<LikeButton particleConfig={{ shape: "star" }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom particle colors", () => {
      render(<LikeButton particleConfig={{ colors: ["#ff0000", "#00ff00"] }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should merge preset with custom config (custom count overrides preset)", () => {
      render(<LikeButton particlePreset="burst" particleConfig={{ count: 30 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(30)
    })

    it("should render with custom speed", () => {
      render(<LikeButton particleConfig={{ speed: 2000 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom easing", () => {
      render(<LikeButton particleConfig={{ easing: "ease-in-out" }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with fadeOut disabled", () => {
      render(<LikeButton particleConfig={{ fadeOut: false }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom distance range", () => {
      render(<LikeButton particleConfig={{ distance: { min: 100, max: 200 } }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom size range", () => {
      render(<LikeButton particleConfig={{ size: { min: 2.0, max: 3.0 } }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should render with custom spread and offset", () => {
      render(<LikeButton particleConfig={{ spread: 90, spreadOffset: -90 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })
  })

  describe("particle rendering", () => {
    it("should render no particles initially", () => {
      render(<LikeButton />)
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(0)
    })

    it("should render particles after click", () => {
      render(<LikeButton />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should not render particles when showParticles is false", () => {
      render(<LikeButton showParticles={false} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(0)
    })

    it("should render particles as SVG elements", () => {
      render(<LikeButton particleConfig={{ shape: "star" }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleSvgs(PARTICLE_SELECTOR).length).toBeGreaterThan(0)
    })

    it("should render heart shape particles by default", () => {
      render(<LikeButton />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleSvgs(PARTICLE_SELECTOR).length).toBeGreaterThan(0)
    })

    it("should spawn new particles on each click", () => {
      render(<LikeButton particleConfig={{ count: 5 }} />)
      const button = screen.getByRole("button")

      fireEvent.click(button)
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(5)

      fireEvent.click(button)
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThanOrEqual(5)
    })
  })

  describe("particle edge cases", () => {
    it("should handle empty particle config", () => {
      render(<LikeButton particleConfig={{}} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
    })

    it("should handle zero particle count", () => {
      render(<LikeButton particleConfig={{ count: 0 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(0)
    })

    it("should handle single particle", () => {
      render(<LikeButton particleConfig={{ count: 1 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(1)
    })

    it("should handle large particle count", () => {
      render(<LikeButton particleConfig={{ count: 100 }} />)
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(100)
    })

    PARTICLE_SHAPES.forEach((shape) => {
      it(`should render ${shape} shape particles`, () => {
        render(<LikeButton particleConfig={{ shape }} />)
        fireEvent.click(screen.getByRole("button"))
        expect(getParticleCount(PARTICLE_SELECTOR)).toBeGreaterThan(0)
      })
    })

    it("should handle combined preset and config overrides", () => {
      render(
        <LikeButton
          particlePreset="burst"
          particleConfig={{ count: 8, shape: "star", colors: ["#ff0000"], speed: 1500 }}
        />,
      )
      fireEvent.click(screen.getByRole("button"))
      expect(getParticleCount(PARTICLE_SELECTOR)).toBe(8)
    })
  })

  describe("ref forwarding", () => {
    it("should forward ref to the button element", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<LikeButton ref={ref} />)

      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
      expect(ref.current?.tagName).toBe("BUTTON")
    })

    it("should allow programmatic focus via ref", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<LikeButton ref={ref} />)

      ref.current?.focus()

      expect(document.activeElement).toBe(ref.current)
    })

    it("should allow programmatic click via ref", () => {
      const ref = createRef<HTMLButtonElement>()
      const onClick = vi.fn()
      render(<LikeButton ref={ref} onClick={onClick} />)

      ref.current?.click()

      expect(onClick).toHaveBeenCalledWith(1, expect.any(Object))
    })
  })
})
