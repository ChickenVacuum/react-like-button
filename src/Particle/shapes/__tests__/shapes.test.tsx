import { render } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { HeartShape } from "../HeartShape"
import { StarShape } from "../StarShape"
import { CircleShape } from "../CircleShape"
import { SquareShape } from "../SquareShape"
import { SparkleShape } from "../SparkleShape"

describe("Particle Shape Components", () => {
  describe("HeartShape", () => {
    it("renders with correct size", () => {
      const { container } = render(<HeartShape size={40} color="#FF0000" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("width", "40")
      expect(svg).toHaveAttribute("height", "40")
    })

    it("renders with correct color", () => {
      const { container } = render(<HeartShape size={40} color="#FF0000" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveStyle({ color: "#FF0000" })
    })

    it("renders with custom className", () => {
      const { container } = render(
        <HeartShape size={40} color="#FF0000" className="custom-class" />,
      )
      const svg = container.querySelector("svg")
      expect(svg).toHaveClass("custom-class")
    })

    it("renders SVG with correct viewBox", () => {
      const { container } = render(<HeartShape size={40} color="#FF0000" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("viewBox", "0 0 24 24")
    })

    it("has aria-hidden attribute", () => {
      const { container } = render(<HeartShape size={40} color="#FF0000" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("aria-hidden", "true")
    })
  })

  describe("StarShape", () => {
    it("renders with correct size", () => {
      const { container } = render(<StarShape size={50} color="#FFD700" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("width", "50")
      expect(svg).toHaveAttribute("height", "50")
    })

    it("renders with correct color", () => {
      const { container } = render(<StarShape size={50} color="#FFD700" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveStyle({ color: "#FFD700" })
    })

    it("renders with custom className", () => {
      const { container } = render(
        <StarShape size={50} color="#FFD700" className="star-custom" />,
      )
      const svg = container.querySelector("svg")
      expect(svg).toHaveClass("star-custom")
    })
  })

  describe("CircleShape", () => {
    it("renders with correct size", () => {
      const { container } = render(<CircleShape size={30} color="#3B82F6" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("width", "30")
      expect(svg).toHaveAttribute("height", "30")
    })

    it("renders with correct color", () => {
      const { container } = render(<CircleShape size={30} color="#3B82F6" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveStyle({ color: "#3B82F6" })
    })

    it("renders circle element", () => {
      const { container } = render(<CircleShape size={30} color="#3B82F6" />)
      const circle = container.querySelector("circle")
      expect(circle).toBeInTheDocument()
      expect(circle).toHaveAttribute("cx", "12")
      expect(circle).toHaveAttribute("cy", "12")
      expect(circle).toHaveAttribute("r", "10")
    })
  })

  describe("SquareShape", () => {
    it("renders with correct size", () => {
      const { container } = render(<SquareShape size={45} color="#10B981" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("width", "45")
      expect(svg).toHaveAttribute("height", "45")
    })

    it("renders with correct color", () => {
      const { container } = render(<SquareShape size={45} color="#10B981" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveStyle({ color: "#10B981" })
    })

    it("renders rect element with rounded corners", () => {
      const { container } = render(<SquareShape size={45} color="#10B981" />)
      const rect = container.querySelector("rect")
      expect(rect).toBeInTheDocument()
      expect(rect).toHaveAttribute("rx", "3")
    })
  })

  describe("SparkleShape", () => {
    it("renders with correct size", () => {
      const { container } = render(<SparkleShape size={35} color="#F59E0B" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveAttribute("width", "35")
      expect(svg).toHaveAttribute("height", "35")
    })

    it("renders with correct color", () => {
      const { container } = render(<SparkleShape size={35} color="#F59E0B" />)
      const svg = container.querySelector("svg")
      expect(svg).toHaveStyle({ color: "#F59E0B" })
    })

    it("renders with custom className", () => {
      const { container } = render(
        <SparkleShape size={35} color="#F59E0B" className="sparkle-custom" />,
      )
      const svg = container.querySelector("svg")
      expect(svg).toHaveClass("sparkle-custom")
    })
  })

  describe("All shapes", () => {
    it("all shapes accept ParticleShapeProps", () => {
      const props = { size: 40, color: "#000000", className: "test" }

      // Should not throw
      expect(() => render(<HeartShape {...props} />)).not.toThrow()
      expect(() => render(<StarShape {...props} />)).not.toThrow()
      expect(() => render(<CircleShape {...props} />)).not.toThrow()
      expect(() => render(<SquareShape {...props} />)).not.toThrow()
      expect(() => render(<SparkleShape {...props} />)).not.toThrow()
    })
  })
})

