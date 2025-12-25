import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { useLikeButton, LIKE_BUTTON_DEFAULTS } from "../useLikeButton";

describe("useLikeButton", () => {
  describe("initial state", () => {
    it("should start with 0 clicks", () => {
      const { result } = renderHook(() => useLikeButton());

      expect(result.current.localClicks).toBe(0);
    });

    it("should not be maxed initially", () => {
      const { result } = renderHook(() => useLikeButton());

      expect(result.current.isMaxed).toBe(false);
    });

    it("should not be disabled initially", () => {
      const { result } = renderHook(() => useLikeButton());

      expect(result.current.disabled).toBe(false);
    });

    it("should have 0% fill initially", () => {
      const { result } = renderHook(() => useLikeButton());

      expect(result.current.fillPercentage).toBe(0);
    });

    it("should have no particles initially", () => {
      const { result } = renderHook(() => useLikeButton());

      expect(result.current.particles).toHaveLength(0);
    });

    it("should not be pressed initially", () => {
      const { result } = renderHook(() => useLikeButton());

      expect(result.current.isPressed).toBe(false);
    });
  });

  describe("click handling", () => {
    it("should increment clicks on handleClick", () => {
      const { result } = renderHook(() => useLikeButton());

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.localClicks).toBe(1);
    });

    it("should call onClick with new click count", () => {
      const onClick = vi.fn();
      const { result } = renderHook(() => useLikeButton({ onClick }));

      act(() => {
        result.current.handleClick();
      });

      expect(onClick).toHaveBeenCalledWith(1);
    });

    it("should update fillPercentage on click", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 10 }));

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.fillPercentage).toBe(10);
    });

    it("should set isPressed to true after first click", () => {
      const { result } = renderHook(() => useLikeButton());

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.isPressed).toBe(true);
    });
  });

  describe("right-click handling", () => {
    it("should call onRightClick with current click count", () => {
      const onRightClick = vi.fn();
      const { result } = renderHook(() => useLikeButton({ onRightClick }));

      const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent;

      act(() => {
        result.current.handleRightClick(mockEvent);
      });

      expect(onRightClick).toHaveBeenCalledWith(0);
      expect(mockEvent.preventDefault).toHaveBeenCalled();
    });

    it("should not increment clicks on right-click", () => {
      const onRightClick = vi.fn();
      const { result } = renderHook(() => useLikeButton({ onRightClick }));

      const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent;

      act(() => {
        result.current.handleRightClick(mockEvent);
        result.current.handleRightClick(mockEvent);
      });

      expect(result.current.localClicks).toBe(0);
      expect(onRightClick).toHaveBeenCalledTimes(2);
    });

    it("should not call onRightClick when disabled", () => {
      const onRightClick = vi.fn();
      const { result } = renderHook(() =>
        useLikeButton({ onRightClick, disabled: true }),
      );

      const mockEvent = { preventDefault: vi.fn() } as unknown as React.MouseEvent;

      act(() => {
        result.current.handleRightClick(mockEvent);
      });

      expect(onRightClick).not.toHaveBeenCalled();
    });
  });

  describe("max clicks", () => {
    it("should use default maxClicks", () => {
      const { result } = renderHook(() => useLikeButton());

      // Click up to max - each click in separate act to allow state updates
      for (let i = 0; i < LIKE_BUTTON_DEFAULTS.maxClicks; i++) {
        act(() => {
          result.current.handleClick();
        });
      }

      expect(result.current.isMaxed).toBe(true);
    });

    it("should respect custom maxClicks", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 3 }));

      act(() => {
        result.current.handleClick();
      });
      act(() => {
        result.current.handleClick();
      });
      act(() => {
        result.current.handleClick();
      });

      expect(result.current.isMaxed).toBe(true);
      expect(result.current.fillPercentage).toBe(100);
    });

    it("should disable button when maxed", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 1 }));

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.disabled).toBe(true);
    });

    it("should not increment past maxClicks", () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useLikeButton({ maxClicks: 2, onClick }),
      );

      // Each click in separate act to allow state updates between clicks
      act(() => {
        result.current.handleClick();
      });
      act(() => {
        result.current.handleClick();
      });
      act(() => {
        result.current.handleClick(); // Should be ignored
      });

      expect(onClick).toHaveBeenCalledTimes(2);
      expect(result.current.localClicks).toBe(2);
    });
  });

  describe("controlled mode", () => {
    it("should use external localClicks value", () => {
      const { result } = renderHook(() => useLikeButton({ localClicks: 5 }));

      expect(result.current.localClicks).toBe(5);
    });

    it("should calculate fillPercentage from external value", () => {
      const { result } = renderHook(() =>
        useLikeButton({ localClicks: 5, maxClicks: 10 }),
      );

      expect(result.current.fillPercentage).toBe(50);
    });

    it("should be maxed when external value equals maxClicks", () => {
      const { result } = renderHook(() =>
        useLikeButton({ localClicks: 10, maxClicks: 10 }),
      );

      expect(result.current.isMaxed).toBe(true);
    });

    it("should call onClick with incremented external value", () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useLikeButton({ localClicks: 5, onClick }),
      );

      act(() => {
        result.current.handleClick();
      });

      expect(onClick).toHaveBeenCalledWith(6);
    });
  });

  describe("disabled state", () => {
    it("should respect external disabled prop", () => {
      const { result } = renderHook(() => useLikeButton({ disabled: true }));

      expect(result.current.disabled).toBe(true);
    });

    it("should not call onClick when disabled", () => {
      const onClick = vi.fn();
      const { result } = renderHook(() =>
        useLikeButton({ disabled: true, onClick }),
      );

      act(() => {
        result.current.handleClick();
      });

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("particles", () => {
    it("should spawn particles on click", () => {
      const { result } = renderHook(() => useLikeButton());

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.particles.length).toBeGreaterThan(0);
    });

    it("should spawn correct number of particles", () => {
      const { result } = renderHook(() =>
        useLikeButton({ particleCount: 5 }),
      );

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.particles).toHaveLength(5);
    });

    it("should not spawn particles when showParticles is false", () => {
      const { result } = renderHook(() =>
        useLikeButton({ showParticles: false }),
      );

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.particles).toHaveLength(0);
    });

    it("should use custom particle colors", () => {
      const customColors = ["#ff0000", "#00ff00"];
      const { result } = renderHook(() =>
        useLikeButton({ particleColors: customColors }),
      );

      act(() => {
        result.current.handleClick();
      });

      result.current.particles.forEach((particle) => {
        expect(customColors).toContain(particle.color);
      });
    });
  });

  describe("aria label", () => {
    it("should have default aria label", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 10 }));

      expect(result.current.ariaLabel).toContain("10 clicks remaining");
    });

    it("should update aria label when maxed", () => {
      const { result } = renderHook(() => useLikeButton({ maxClicks: 1 }));

      act(() => {
        result.current.handleClick();
      });

      expect(result.current.ariaLabel).toContain("Thank you");
    });

    it("should use custom aria label", () => {
      const { result } = renderHook(() =>
        useLikeButton({ ariaLabel: "Custom label" }),
      );

      expect(result.current.ariaLabel).toBe("Custom label");
    });
  });
});

