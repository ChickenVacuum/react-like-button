import { act, renderHook } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { LIKE_BUTTON_DEFAULTS, useLikeButton } from "../useLikeButton"

describe("useLikeButton", () => {
  describe("initial state", () => {
    it("should start with 0 clicks", () => {
      const { result } = renderHook(() => useLikeButton())

      expect(result.current.localClicks).toBe(0)
    })

    it("should not be maxed initially", () => {
      const { result } = renderHook(() => useLikeButton())

      expect(result.current.isMaxed).toBe(false)
    })

    it("should not be disabled initially", () => {
      const { result } = renderHook(() => useLikeButton())

      expect(result.current.disabled).toBe(false)
    })

    it("should have 0% fill initially", () => {
      const { result } = renderHook(() => useLikeButton())

      expect(result.current.fillPercentage).toBe(0)
    })

    it("should have no particles initially", () => {
      const { result } = renderHook(() => useLikeButton())

      expect(result.current.particles).toHaveLength(0)
    })

    it("should not be pressed initially", () => {
      const { result } = renderHook(() => useLikeButton())

      expect(result.current.isPressed).toBe(false)
    })
  })

  describe("click handling", () => {
    it("should increment clicks on handleClick", () => {
      const { result } = renderHook(() => useLikeButton())

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.localClicks).toBe(1)
    })

    it("should call onClick with new click count", () => {
      const onClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onClick }))

      act(() => {
        result.current.handleClick()
      })

      expect(onClick).toHaveBeenCalledWith(1)
    })

    it("should update fillPercentage on click", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 10 }))

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.fillPercentage).toBe(10)
    })

    it("should set isPressed to true after first click", () => {
      const { result } = renderHook(() => useLikeButton())

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.isPressed).toBe(true)
    })
  })

  describe("right-click handling", () => {
    it("should call onRightClick with current click count", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick }))

      const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent

      act(() => {
        result.current.handleRightClick(mockEvent)
      })

      expect(onRightClick).toHaveBeenCalledWith(0)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it("should not increment clicks on right-click", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick }))

      const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent

      act(() => {
        result.current.handleRightClick(mockEvent)
        result.current.handleRightClick(mockEvent)
      })

      expect(result.current.localClicks).toBe(0)
      expect(onRightClick).toHaveBeenCalledTimes(2)
    })

    it("should not call onRightClick when disabled", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick, disabled: true }))

      const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent

      act(() => {
        result.current.handleRightClick(mockEvent)
      })

      expect(onRightClick).not.toHaveBeenCalled()
    })
  })

  describe("keyboard accessibility (handleKeyDown)", () => {
    it("should call onRightClick when Shift+Enter is pressed", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick }))

      const mockEvent = {
        shiftKey: true,
        key: "Enter",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      act(() => {
        result.current.handleKeyDown(mockEvent)
      })

      expect(onRightClick).toHaveBeenCalledWith(0)
      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it("should not call onRightClick on Enter without Shift", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick }))

      const mockEvent = {
        shiftKey: false,
        key: "Enter",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      act(() => {
        result.current.handleKeyDown(mockEvent)
      })

      expect(onRightClick).not.toHaveBeenCalled()
      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })

    it("should not call onRightClick on Shift with other keys", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick }))

      const mockEvent = {
        shiftKey: true,
        key: "Space",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      act(() => {
        result.current.handleKeyDown(mockEvent)
      })

      expect(onRightClick).not.toHaveBeenCalled()
      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })

    it("should not call onRightClick when disabled", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick, disabled: true }))

      const mockEvent = {
        shiftKey: true,
        key: "Enter",
        preventDefault: vi.fn(),
      } as unknown as React.KeyboardEvent

      act(() => {
        result.current.handleKeyDown(mockEvent)
      })

      expect(onRightClick).not.toHaveBeenCalled()
    })

    it("should report hasRightClickAction as true when onRightClick is provided", () => {
      const onRightClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ onRightClick }))

      expect(result.current.hasRightClickAction).toBe(true)
    })

    it("should report hasRightClickAction as false when onRightClick is not provided", () => {
      const { result } = renderHook(() => useLikeButton())

      expect(result.current.hasRightClickAction).toBe(false)
    })
  })

  describe("max clicks", () => {
    it("should use default maxClicks", () => {
      const { result } = renderHook(() => useLikeButton())

      // Click up to max - each click in separate act to allow state updates
      for (let i = 0; i < LIKE_BUTTON_DEFAULTS.maxClicks; i++) {
        act(() => {
          result.current.handleClick()
        })
      }

      expect(result.current.isMaxed).toBe(true)
    })

    it("should respect custom maxClicks", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 3 }))

      act(() => {
        result.current.handleClick()
      })
      act(() => {
        result.current.handleClick()
      })
      act(() => {
        result.current.handleClick()
      })

      expect(result.current.isMaxed).toBe(true)
      expect(result.current.fillPercentage).toBe(100)
    })

    it("should disable button when maxed", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 1 }))

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.disabled).toBe(true)
    })

    it("should not increment past maxClicks", () => {
      const onClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ maxClicks: 2, onClick }))

      // Each click in separate act to allow state updates between clicks
      act(() => {
        result.current.handleClick()
      })
      act(() => {
        result.current.handleClick()
      })
      act(() => {
        result.current.handleClick() // Should be ignored
      })

      expect(onClick).toHaveBeenCalledTimes(2)
      expect(result.current.localClicks).toBe(2)
    })
  })

  describe("controlled mode", () => {
    it("should use external localClicks value", () => {
      const { result } = renderHook(() => useLikeButton({ localClicks: 5 }))

      expect(result.current.localClicks).toBe(5)
    })

    it("should calculate fillPercentage from external value", () => {
      const { result } = renderHook(() => useLikeButton({ localClicks: 5, maxClicks: 10 }))

      expect(result.current.fillPercentage).toBe(50)
    })

    it("should be maxed when external value equals maxClicks", () => {
      const { result } = renderHook(() => useLikeButton({ localClicks: 10, maxClicks: 10 }))

      expect(result.current.isMaxed).toBe(true)
    })

    it("should call onClick with incremented external value", () => {
      const onClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ localClicks: 5, onClick }))

      act(() => {
        result.current.handleClick()
      })

      expect(onClick).toHaveBeenCalledWith(6)
    })
  })

  describe("disabled state", () => {
    it("should respect external disabled prop", () => {
      const { result } = renderHook(() => useLikeButton({ disabled: true }))

      expect(result.current.disabled).toBe(true)
    })

    it("should not call onClick when disabled", () => {
      const onClick = vi.fn()
      const { result } = renderHook(() => useLikeButton({ disabled: true, onClick }))

      act(() => {
        result.current.handleClick()
      })

      expect(onClick).not.toHaveBeenCalled()
    })
  })

  describe("particles", () => {
    it("should spawn particles on click", () => {
      const { result } = renderHook(() => useLikeButton())

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.particles.length).toBeGreaterThan(0)
    })

    it("should spawn correct number of particles", () => {
      const { result } = renderHook(() => useLikeButton({ particleConfig: { count: 5 } }))

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.particles).toHaveLength(5)
    })

    it("should not spawn particles when showParticles is false", () => {
      const { result } = renderHook(() => useLikeButton({ showParticles: false }))

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.particles).toHaveLength(0)
    })

    it("should use custom particle colors", () => {
      const customColors = ["#ff0000", "#00ff00"]
      const { result } = renderHook(() =>
        useLikeButton({ particleConfig: { colors: customColors } }),
      )

      act(() => {
        result.current.handleClick()
      })

      result.current.particles.forEach((particle) => {
        expect(customColors).toContain(particle.color)
      })
    })

    it("should use particle preset configuration", () => {
      const { result } = renderHook(() => useLikeButton({ particlePreset: "burst" }))

      act(() => {
        result.current.handleClick()
      })

      // Burst preset has 12 particles
      expect(result.current.particles).toHaveLength(12)
      // Burst preset uses heart shape
      expect(result.current.particles[0].shape).toBe("heart")
    })

    it("should merge preset with custom config", () => {
      const { result } = renderHook(() =>
        useLikeButton({
          particlePreset: "burst",
          particleConfig: { count: 20 },
        }),
      )

      act(() => {
        result.current.handleClick()
      })

      // Custom count overrides preset count
      expect(result.current.particles).toHaveLength(20)
      // But shape is still from burst preset
      expect(result.current.particles[0].shape).toBe("heart")
    })

    it("should generate particles with correct shape", () => {
      const { result } = renderHook(() => useLikeButton({ particleConfig: { shape: "star" } }))

      act(() => {
        result.current.handleClick()
      })

      result.current.particles.forEach((particle) => {
        expect(particle.shape).toBe("star")
      })
    })

    it("should generate particles with correct speed", () => {
      const { result } = renderHook(() => useLikeButton({ particleConfig: { speed: 1000 } }))

      act(() => {
        result.current.handleClick()
      })

      result.current.particles.forEach((particle) => {
        expect(particle.speed).toBe(1000)
      })
    })

    it("should generate particles with correct easing", () => {
      const customEasing = "ease-in-out"
      const { result } = renderHook(() =>
        useLikeButton({ particleConfig: { easing: customEasing } }),
      )

      act(() => {
        result.current.handleClick()
      })

      result.current.particles.forEach((particle) => {
        expect(particle.easing).toBe(customEasing)
      })
    })

    it("should generate particles with correct fadeOut setting", () => {
      const { result } = renderHook(() => useLikeButton({ particleConfig: { fadeOut: false } }))

      act(() => {
        result.current.handleClick()
      })

      result.current.particles.forEach((particle) => {
        expect(particle.fadeOut).toBe(false)
      })
    })

    it("should generate particles within distance range", () => {
      const { result } = renderHook(() =>
        useLikeButton({
          particleConfig: { distance: { min: 100, max: 150 } },
        }),
      )

      act(() => {
        result.current.handleClick()
      })

      result.current.particles.forEach((particle) => {
        expect(particle.distance).toBeGreaterThanOrEqual(100)
        expect(particle.distance).toBeLessThanOrEqual(150)
      })
    })

    it("should generate particles within size range", () => {
      const { result } = renderHook(() =>
        useLikeButton({
          particleConfig: { size: { min: 2.0, max: 3.0 } },
        }),
      )

      act(() => {
        result.current.handleClick()
      })

      result.current.particles.forEach((particle) => {
        expect(particle.scale).toBeGreaterThanOrEqual(2.0)
        expect(particle.scale).toBeLessThanOrEqual(3.0)
      })
    })

    it("should generate particles with spread and offset", () => {
      const { result } = renderHook(() =>
        useLikeButton({
          particleConfig: { spread: 90, spreadOffset: 0 },
        }),
      )

      act(() => {
        result.current.handleClick()
      })

      // All angles should be between 0 and 90 degrees
      result.current.particles.forEach((particle) => {
        expect(particle.angle).toBeGreaterThanOrEqual(0)
        expect(particle.angle).toBeLessThan(90)
      })
    })

    it("should generate unique particle IDs", () => {
      const { result } = renderHook(() => useLikeButton())

      act(() => {
        result.current.handleClick()
      })

      const ids = result.current.particles.map((p) => p.id)
      const uniqueIds = new Set(ids)
      expect(uniqueIds.size).toBe(ids.length)
    })
  })

  describe("aria label", () => {
    it("should have default aria label", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 10 }))

      expect(result.current.ariaLabel).toContain("10 clicks remaining")
    })

    it("should update aria label when maxed", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 1 }))

      act(() => {
        result.current.handleClick()
      })

      expect(result.current.ariaLabel).toContain("Thank you")
    })

    it("should use custom aria label", () => {
      const { result } = renderHook(() => useLikeButton({ ariaLabel: "Custom label" }))

      expect(result.current.ariaLabel).toBe("Custom label")
    })
  })
})
