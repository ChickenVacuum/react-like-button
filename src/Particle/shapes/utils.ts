import type { ParticleShape, ParticleShapeProps } from "../types"
import { HeartShape } from "./HeartShape"
import { StarShape } from "./StarShape"
import { CircleShape } from "./CircleShape"
import { SquareShape } from "./SquareShape"
import { SparkleShape } from "./SparkleShape"

/**
 * Get the appropriate shape component based on shape configuration.
 * 
 * @param shape - Either a preset shape name or custom shape config
 * @returns React component that renders the shape
 * 
 * @example
 * ```tsx
 * const ShapeComponent = getParticleShape('star');
 * return <ShapeComponent size={40} color="#FFD700" />;
 * ```
 * 
 * @example
 * ```tsx
 * const ShapeComponent = getParticleShape({
 *   render: ({ size, color }) => <div style={{ width: size, height: size, background: color }} />
 * });
 * return <ShapeComponent size={40} color="#FFD700" />;
 * ```
 */
export function getParticleShape(
  shape: ParticleShape,
): React.ComponentType<ParticleShapeProps> {
  // Handle custom shape
  if (typeof shape === "object" && "render" in shape) {
    // Return a wrapper component that calls the custom render function
    return ({ size, color, className }: ParticleShapeProps) =>
      shape.render({ size, color, className }) as React.ReactElement
  }

  // Handle preset shapes
  switch (shape) {
    case "heart":
      return HeartShape
    case "star":
      return StarShape
    case "circle":
      return CircleShape
    case "square":
      return SquareShape
    case "sparkle":
      return SparkleShape
    default:
      // TypeScript should prevent this, but fallback to heart for safety
      return HeartShape
  }
}

