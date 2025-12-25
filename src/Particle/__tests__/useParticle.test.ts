import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { useParticle } from "../useParticle";

describe("useParticle", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("initial state", () => {
    it("should not be animating initially", () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 45, distance: 50, scale: 1 }),
      );

      expect(result.current.isAnimating).toBe(false);
    });

    it("should have initial transform at origin", () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 45, distance: 50, scale: 1 }),
      );

      expect(result.current.transform).toBe("translate(0, 0) scale(0)");
    });

    it("should have opacity 1 initially", () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 45, distance: 50, scale: 1 }),
      );

      expect(result.current.opacity).toBe(1);
    });
  });

  describe("position calculations", () => {
    it("should calculate correct x position for 0 degrees", () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 0, distance: 100, scale: 1 }),
      );

      expect(result.current.x).toBe(100);
      expect(result.current.y).toBeCloseTo(0, 10);
    });

    it("should calculate correct y position for 90 degrees", () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 90, distance: 100, scale: 1 }),
      );

      expect(result.current.x).toBeCloseTo(0, 10);
      expect(result.current.y).toBe(100);
    });

    it("should calculate correct position for 45 degrees", () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 45, distance: 100, scale: 1 }),
      );

      const expected = Math.cos((45 * Math.PI) / 180) * 100;
      expect(result.current.x).toBeCloseTo(expected, 10);
      expect(result.current.y).toBeCloseTo(expected, 10);
    });

    it("should scale distance correctly", () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 0, distance: 50, scale: 1 }),
      );

      expect(result.current.x).toBe(50);
    });
  });

  describe("animation state", () => {
    it("should start animating after mount", async () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 45, distance: 50, scale: 1 }),
      );

      // Trigger the requestAnimationFrame callback
      await act(async () => {
        vi.runAllTimers();
      });

      expect(result.current.isAnimating).toBe(true);
    });

    it("should update transform when animating", async () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 0, distance: 100, scale: 1.5 }),
      );

      await act(async () => {
        vi.runAllTimers();
      });

      expect(result.current.transform).toBe("translate(100px, 0px) scale(1.5)");
    });

    it("should set opacity to 0 when animating", async () => {
      const { result } = renderHook(() =>
        useParticle({ angle: 45, distance: 50, scale: 1 }),
      );

      await act(async () => {
        vi.runAllTimers();
      });

      expect(result.current.opacity).toBe(0);
    });
  });
});

