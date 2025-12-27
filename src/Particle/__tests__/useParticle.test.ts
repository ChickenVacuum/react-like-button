import { act, renderHook } from "@testing-library/react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { useParticle } from "../useParticle"

describe("useParticle", () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const defaultProps = {
    angle: 45,
    distance: 50,
    scale: 1,
    speed: 500,
    easing: "ease-out",
    fadeOut: true,
  }

  describe("initial state", () => {
    it("should not be animating initially", () => {
      const { result } = renderHook(() => useParticle(defaultProps))

      expect(result.current.isAnimating).toBe(false)
    })

    it("should have initial transform at origin", () => {
      const { result } = renderHook(() => useParticle(defaultProps))

      expect(result.current.transform).toBe("translate(0, 0) scale(0)")
    })

    it("should have opacity 1 initially", () => {
      const { result } = renderHook(() => useParticle(defaultProps))

      expect(result.current.opacity).toBe(1)
    })
  })

  describe("position calculations", () => {
    it("should calculate correct x position for 0 degrees", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, angle: 0, distance: 100 }))

      expect(result.current.x).toBe(100)
      expect(result.current.y).toBeCloseTo(0, 10)
    })

    it("should calculate correct y position for 90 degrees", () => {
      const { result } = renderHook(() =>
        useParticle({ ...defaultProps, angle: 90, distance: 100 }),
      )

      expect(result.current.x).toBeCloseTo(0, 10)
      expect(result.current.y).toBe(100)
    })

    it("should calculate correct position for 45 degrees", () => {
      const { result } = renderHook(() =>
        useParticle({ ...defaultProps, angle: 45, distance: 100 }),
      )

      const expected = Math.cos((45 * Math.PI) / 180) * 100
      expect(result.current.x).toBeCloseTo(expected, 10)
      expect(result.current.y).toBeCloseTo(expected, 10)
    })

    it("should scale distance correctly", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, angle: 0, distance: 50 }))

      expect(result.current.x).toBe(50)
    })
  })

  describe("animation state", () => {
    it("should start animating after mount", async () => {
      const { result } = renderHook(() => useParticle(defaultProps))

      // Trigger the requestAnimationFrame callback
      await act(async () => {
        vi.runAllTimers()
      })

      expect(result.current.isAnimating).toBe(true)
    })

    it("should update transform when animating", async () => {
      const { result } = renderHook(() =>
        useParticle({ ...defaultProps, angle: 0, distance: 100, scale: 1.5 }),
      )

      await act(async () => {
        vi.runAllTimers()
      })

      expect(result.current.transform).toBe("translate(100px, 0px) scale(1.5)")
    })

    it("should set opacity to 0 when animating with fadeOut", async () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, fadeOut: true }))

      await act(async () => {
        vi.runAllTimers()
      })

      expect(result.current.opacity).toBe(0)
    })
  })

  describe("animation configuration", () => {
    it("should return speed from props", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, speed: 800 }))

      expect(result.current.speed).toBe(800)
    })

    it("should return easing from props", () => {
      const { result } = renderHook(() =>
        useParticle({ ...defaultProps, easing: "cubic-bezier(0.4, 0, 0.2, 1)" }),
      )

      expect(result.current.easing).toBe("cubic-bezier(0.4, 0, 0.2, 1)")
    })

    it("should return fadeOut from props", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, fadeOut: false }))

      expect(result.current.fadeOut).toBe(false)
    })
  })

  describe("various animation configurations", () => {
    it("should handle fast animation (200ms)", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, speed: 200 }))

      expect(result.current.speed).toBe(200)
    })

    it("should handle slow animation (1000ms)", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, speed: 1000 }))

      expect(result.current.speed).toBe(1000)
    })

    it("should handle different easing functions", () => {
      const easings = [
        "ease-in",
        "ease-out",
        "ease-in-out",
        "linear",
        "cubic-bezier(0.22, 1, 0.36, 1)",
      ]

      easings.forEach((easing) => {
        const { result } = renderHook(() => useParticle({ ...defaultProps, easing }))
        expect(result.current.easing).toBe(easing)
      })
    })

    it("should handle large distances", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, distance: 500 }))

      expect(result.current.x).toBeGreaterThan(0)
      expect(result.current.y).toBeGreaterThan(0)
    })

    it("should handle small distances", () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, distance: 10 }))

      expect(result.current.x).toBeLessThan(15)
      expect(result.current.y).toBeLessThan(15)
    })

    it("should handle large scale values", async () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, scale: 3.0 }))

      await act(async () => {
        vi.runAllTimers()
      })

      expect(result.current.transform).toContain("scale(3)")
    })

    it("should handle small scale values", async () => {
      const { result } = renderHook(() => useParticle({ ...defaultProps, scale: 0.5 }))

      await act(async () => {
        vi.runAllTimers()
      })

      expect(result.current.transform).toContain("scale(0.5)")
    })
  })
})
