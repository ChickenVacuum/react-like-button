import { cleanup, render } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import { Particle } from "../Particle"
import { ParticleVanilla } from "../Particle.vanilla"

// Ensure cleanup after each test
afterEach(() => {
  cleanup()
})

// Default props for testing
const defaultProps = {
  angle: 45,
  distance: 50,
  scale: 1,
  color: "#ff0000",
  shape: "heart" as const,
  speed: 500,
  easing: "ease-out",
  fadeOut: true,
}

describe("Particle", () => {
  it("should render an SVG element", () => {
    const { container } = render(<Particle {...defaultProps} />)

    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
  })

  it("should apply the color prop", () => {
    const { container } = render(<Particle {...defaultProps} />)

    const div = container.firstChild as HTMLElement
    expect(div).toHaveStyle({ color: "#ff0000" })
  })

  it("should have aria-hidden on SVG", () => {
    const { container } = render(<Particle {...defaultProps} />)

    const svg = container.querySelector("svg")
    expect(svg).toHaveAttribute("aria-hidden", "true")
  })
})

describe("ParticleVanilla", () => {
  it("should render an SVG element", () => {
    const { container } = render(<ParticleVanilla {...defaultProps} />)

    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
  })

  it("should apply the color prop", () => {
    const { container } = render(<ParticleVanilla {...defaultProps} />)

    const div = container.firstChild as HTMLElement
    expect(div).toHaveStyle({ color: "#ff0000" })
  })

  it("should have particle class", () => {
    const { container } = render(<ParticleVanilla {...defaultProps} />)

    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass("particle")
  })
})
