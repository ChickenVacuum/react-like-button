import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { CircleShape } from "../CircleShape"
import { HeartShape } from "../HeartShape"
import { SparkleShape } from "../SparkleShape"
import { SquareShape } from "../SquareShape"
import { StarShape } from "../StarShape"
import { getParticleShape } from "../utils"

describe("getParticleShape", () => {
  describe("preset shapes", () => {
    it("returns HeartShape for 'heart' preset", () => {
      const ShapeComponent = getParticleShape("heart")
      expect(ShapeComponent).toBe(HeartShape)
    })

    it("returns StarShape for 'star' preset", () => {
      const ShapeComponent = getParticleShape("star")
      expect(ShapeComponent).toBe(StarShape)
    })

    it("returns CircleShape for 'circle' preset", () => {
      const ShapeComponent = getParticleShape("circle")
      expect(ShapeComponent).toBe(CircleShape)
    })

    it("returns SquareShape for 'square' preset", () => {
      const ShapeComponent = getParticleShape("square")
      expect(ShapeComponent).toBe(SquareShape)
    })

    it("returns SparkleShape for 'sparkle' preset", () => {
      const ShapeComponent = getParticleShape("sparkle")
      expect(ShapeComponent).toBe(SparkleShape)
    })
  })

  describe("custom shapes", () => {
    it("returns a component that calls custom render function", () => {
      const customRender = ({ size, color }: { size: number; color: string }) => (
        <div data-testid="custom-shape" style={{ width: size, height: size, background: color }}>
          Custom
        </div>
      )

      const ShapeComponent = getParticleShape({ render: customRender })
      const { getByTestId } = render(<ShapeComponent size={50} color="#FF0000" />)

      const customShape = getByTestId("custom-shape")
      expect(customShape).toBeInTheDocument()
      expect(customShape).toHaveStyle({ width: "50px", height: "50px", background: "#FF0000" })
    })

    it("passes className to custom render function", () => {
      const customRender = ({ className }: { className?: string }) => (
        <div data-testid="custom-shape-with-class" className={className}>
          Custom
        </div>
      )

      const ShapeComponent = getParticleShape({ render: customRender })
      const { getByTestId } = render(
        <ShapeComponent size={50} color="#FF0000" className="custom-class" />,
      )

      const customShape = getByTestId("custom-shape-with-class")
      expect(customShape).toHaveClass("custom-class")
    })

    it("custom shape can render SVG", () => {
      const customRender = ({ size, color }: { size: number; color: string }) => (
        <svg width={size} height={size} data-testid="custom-svg" aria-hidden="true">
          <rect width={size} height={size} fill={color} />
        </svg>
      )

      const ShapeComponent = getParticleShape({ render: customRender })
      const { getByTestId } = render(<ShapeComponent size={60} color="#00FF00" />)

      const customSvg = getByTestId("custom-svg")
      expect(customSvg).toBeInTheDocument()
      expect(customSvg).toHaveAttribute("width", "60")
      expect(customSvg).toHaveAttribute("height", "60")
    })

    it("custom shape can render complex components", () => {
      const customRender = ({ size, color }: { size: number; color: string }) => (
        <div data-testid="complex-shape" style={{ width: size, height: size }}>
          <span style={{ color }}>⭐</span>
          <span style={{ color }}>✨</span>
        </div>
      )

      const ShapeComponent = getParticleShape({ render: customRender })
      const { getByTestId } = render(<ShapeComponent size={40} color="#FFD700" />)

      const complexShape = getByTestId("complex-shape")
      expect(complexShape).toBeInTheDocument()
      expect(complexShape.textContent).toBe("⭐✨")
    })
  })

  describe("rendering", () => {
    it("preset shapes render correctly", () => {
      const presets = ["heart", "star", "circle", "square", "sparkle"] as const

      presets.forEach((preset) => {
        const ShapeComponent = getParticleShape(preset)
        const { container } = render(<ShapeComponent size={40} color="#000000" />)
        const svg = container.querySelector("svg")
        expect(svg).toBeInTheDocument()
      })
    })

    it("returned component accepts all ParticleShapeProps", () => {
      const ShapeComponent = getParticleShape("star")
      const { container } = render(
        <ShapeComponent size={50} color="#FFD700" className="test-class" />,
      )

      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("width", "50")
      expect(svg).toHaveStyle({ color: "#FFD700" })
      expect(svg).toHaveClass("test-class")
    })
  })
})
