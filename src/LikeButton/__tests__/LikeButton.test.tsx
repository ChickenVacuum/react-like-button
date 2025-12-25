import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { LikeButton } from "../LikeButton";
import { getCursorStyle } from "../utils";

// Ensure cleanup after each test
afterEach(() => {
  cleanup();
});

describe("getCursorStyle", () => {
  describe("preset cursors", () => {
    it('should return heart cursor URL for "heart" preset', () => {
      const result = getCursorStyle("heart");
      expect(result).toContain("url(");
      expect(result).toContain("16 16");
      expect(result).toContain("pointer");
      expect(result).toContain("EF4444"); // heart fill color
    });

    it('should return star cursor URL for "star" preset', () => {
      const result = getCursorStyle("star");
      expect(result).toContain("url(");
      expect(result).toContain("16 16");
      expect(result).toContain("pointer");
      expect(result).toContain("FBBF24"); // star fill color
    });

    it('should return thumbs-up cursor URL for "thumbs-up" preset', () => {
      const result = getCursorStyle("thumbs-up");
      expect(result).toContain("url(");
      expect(result).toContain("16 16");
      expect(result).toContain("pointer");
      expect(result).toContain("3B82F6"); // thumbs-up fill color
    });

    it('should return "pointer" for pointer preset', () => {
      const result = getCursorStyle("pointer");
      expect(result).toBe("pointer");
    });

    it('should return "none" for none preset', () => {
      const result = getCursorStyle("none");
      expect(result).toBe("none");
    });

    it("should default to heart cursor when no argument provided", () => {
      const result = getCursorStyle();
      expect(result).toContain("url(");
      expect(result).toContain("EF4444"); // heart fill color
    });
  });

  describe("custom cursors", () => {
    it("should generate cursor with custom URL and default hotspot", () => {
      const result = getCursorStyle({
        url: "https://example.com/cursor.png",
      });
      expect(result).toContain('url("https://example.com/cursor.png")');
      expect(result).toContain("16 16"); // default hotspot
      expect(result).toContain("pointer"); // default fallback
    });

    it("should generate cursor with custom hotspot", () => {
      const result = getCursorStyle({
        url: "https://example.com/cursor.png",
        hotspotX: 5,
        hotspotY: 10,
      });
      expect(result).toContain("5 10");
    });

    it("should generate cursor with custom fallback", () => {
      const result = getCursorStyle({
        url: "https://example.com/cursor.png",
        fallback: "grab",
      });
      expect(result).toContain("grab");
    });

    it("should handle data URL cursors", () => {
      const dataUrl = "data:image/svg+xml;utf8,<svg></svg>";
      const result = getCursorStyle({ url: dataUrl });
      expect(result).toContain(dataUrl);
    });
  });
});

describe("LikeButton", () => {
  describe("rendering", () => {
    it("should render a button element", () => {
      render(<LikeButton />);

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
    });

    it("should render with custom size", () => {
      render(<LikeButton size={120} />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ width: "120px", height: "120px" });
    });

    it("should apply custom className", () => {
      render(<LikeButton className="my-custom-class" />);

      const button = screen.getByRole("button");
      expect(button).toHaveClass("my-custom-class");
    });

    it("should render heart icon", () => {
      render(<LikeButton />);

      const svg = screen.getByRole("button").querySelector("svg");
      expect(svg).toBeInTheDocument();
    });
  });

  describe("click behavior", () => {
    it("should call onClick with click count", () => {
      const onClick = vi.fn();
      render(<LikeButton onClick={onClick} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledWith(1);
    });

    it("should increment clicks on each click", () => {
      const onClick = vi.fn();
      render(<LikeButton onClick={onClick} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button);

      expect(onClick).toHaveBeenCalledTimes(3);
      expect(onClick).toHaveBeenLastCalledWith(3);
    });

    it("should stop responding after maxClicks", () => {
      const onClick = vi.fn();
      render(<LikeButton onClick={onClick} maxClicks={2} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);
      fireEvent.click(button);
      fireEvent.click(button); // Should be ignored

      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it("should not respond when disabled", () => {
      const onClick = vi.fn();
      render(<LikeButton onClick={onClick} disabled />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(onClick).not.toHaveBeenCalled();
    });
  });

  describe("right-click behavior", () => {
    it("should call onRightClick with current click count", () => {
      const onRightClick = vi.fn();
      render(<LikeButton onRightClick={onRightClick} />);

      const button = screen.getByRole("button");
      fireEvent.contextMenu(button);

      expect(onRightClick).toHaveBeenCalledWith(0);
    });

    it("should not increment clicks on right-click", () => {
      const onClick = vi.fn();
      const onRightClick = vi.fn();
      render(<LikeButton onClick={onClick} onRightClick={onRightClick} />);

      const button = screen.getByRole("button");
      fireEvent.contextMenu(button);
      fireEvent.contextMenu(button);

      // Right-click should not increment
      expect(onRightClick).toHaveBeenCalledTimes(2);
      expect(onRightClick).toHaveBeenLastCalledWith(0);

      // Now click once
      fireEvent.click(button);
      expect(onClick).toHaveBeenCalledWith(1);

      // Right-click should show updated count
      fireEvent.contextMenu(button);
      expect(onRightClick).toHaveBeenLastCalledWith(1);
    });

    it("should not call onRightClick when disabled", () => {
      const onRightClick = vi.fn();
      render(<LikeButton onRightClick={onRightClick} disabled />);

      const button = screen.getByRole("button");
      fireEvent.contextMenu(button);

      expect(onRightClick).not.toHaveBeenCalled();
    });
  });

  describe("accessibility", () => {
    it("should have aria-label", () => {
      render(<LikeButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label");
    });

    it("should have aria-pressed attribute", () => {
      render(<LikeButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-pressed", "false");
    });

    it("should update aria-pressed after click", () => {
      render(<LikeButton />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      expect(button).toHaveAttribute("aria-pressed", "true");
    });

    it("should have aria-disabled when disabled", () => {
      render(<LikeButton disabled />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-disabled", "true");
    });

    it("should accept custom aria-label", () => {
      render(<LikeButton ariaLabel="Custom label" />);

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Custom label");
    });
  });

  describe("controlled mode", () => {
    it("should use external localClicks value", () => {
      const onClick = vi.fn();
      render(<LikeButton localClicks={5} maxClicks={10} onClick={onClick} />);

      const button = screen.getByRole("button");
      fireEvent.click(button);

      // Should report 6 (5 + 1)
      expect(onClick).toHaveBeenCalledWith(6);
    });

    it("should be disabled when external localClicks equals maxClicks", () => {
      render(<LikeButton localClicks={10} maxClicks={10} />);

      const button = screen.getByRole("button");
      expect(button).toBeDisabled();
    });
  });

  describe("shape prop", () => {
    it("should apply circle shape by default", () => {
      render(<LikeButton />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderRadius: "9999px" });
    });

    it("should apply rounded shape", () => {
      render(<LikeButton shape="rounded" />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderRadius: "1rem" });
    });

    it("should apply square shape", () => {
      render(<LikeButton shape="square" />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderRadius: "0" });
    });

    it("should apply custom borderRadius", () => {
      render(<LikeButton shape={{ borderRadius: "2rem" }} />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderRadius: "2rem" });
    });
  });

  describe("styles prop", () => {
    it("should apply custom border width", () => {
      render(<LikeButton styles={{ borderWidth: 2 }} />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderWidth: "2px" });
    });

    it("should apply custom border color", () => {
      render(<LikeButton styles={{ borderColor: "#ff0000" }} />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ borderColor: "#ff0000" });
    });

    it("should apply custom background color", () => {
      render(<LikeButton styles={{ backgroundColor: "#f0f0f0" }} />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ backgroundColor: "#f0f0f0" });
    });
  });

  describe("cursor prop", () => {
    it("should apply heart cursor by default", () => {
      render(<LikeButton />);

      const button = screen.getByRole("button");
      const cursorStyle = button.style.cursor;
      expect(cursorStyle).toContain("url(");
    });

    it("should apply pointer cursor", () => {
      render(<LikeButton cursor="pointer" />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ cursor: "pointer" });
    });

    it("should apply none cursor", () => {
      render(<LikeButton cursor="none" />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ cursor: "none" });
    });

    it("should apply not-allowed cursor when disabled", () => {
      render(<LikeButton disabled cursor="heart" />);

      const button = screen.getByRole("button");
      expect(button).toHaveStyle({ cursor: "not-allowed" });
    });
  });

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
      );

      expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    });

    it("should render no icon when null", () => {
      render(<LikeButton renderIcon={null} />);

      const button = screen.getByRole("button");
      // The icon SVG has viewBox="0 0 24 24", wave SVGs have "0 0 100 20"
      const iconSvg = button.querySelector('svg[viewBox="0 0 24 24"]');
      expect(iconSvg).not.toBeInTheDocument();
    });

    it("should pass correct props to renderIcon", () => {
      const renderIcon = vi.fn(() => <span>Icon</span>);
      render(<LikeButton size={100} renderIcon={renderIcon} />);

      expect(renderIcon).toHaveBeenCalledWith(
        expect.objectContaining({
          size: 50, // 50% of button size
          isMaxed: false,
          fillPercentage: 0,
        }),
      );
    });
  });
});

