import { render, cleanup } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import { Particle } from "../Particle";
import { ParticleVanilla } from "../Particle.vanilla";

// Ensure cleanup after each test
afterEach(() => {
  cleanup();
});

describe("Particle", () => {
  it("should render an SVG element", () => {
    const { container } = render(
      <Particle angle={45} distance={50} scale={1} color="#ff0000" />,
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should apply the color prop", () => {
    const { container } = render(
      <Particle angle={45} distance={50} scale={1} color="#ff0000" />,
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({ color: "#ff0000" });
  });

  it("should have aria-hidden on SVG", () => {
    const { container } = render(
      <Particle angle={45} distance={50} scale={1} color="#ff0000" />,
    );

    const svg = container.querySelector("svg");
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });
});

describe("ParticleVanilla", () => {
  it("should render an SVG element", () => {
    const { container } = render(
      <ParticleVanilla angle={45} distance={50} scale={1} color="#ff0000" />,
    );

    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
  });

  it("should apply the color prop", () => {
    const { container } = render(
      <ParticleVanilla angle={45} distance={50} scale={1} color="#ff0000" />,
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveStyle({ color: "#ff0000" });
  });

  it("should have particle class", () => {
    const { container } = render(
      <ParticleVanilla angle={45} distance={50} scale={1} color="#ff0000" />,
    );

    const div = container.firstChild as HTMLElement;
    expect(div).toHaveClass("particle");
  });
});

