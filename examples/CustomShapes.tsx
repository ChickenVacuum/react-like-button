/**
 * Custom Particle Shapes Example
 * 
 * This example demonstrates how to create custom particle shapes.
 */

import { LikeButton } from '@fmarlats/react-like-button';
import type { CustomParticleShape } from '@fmarlats/react-like-button';

// Custom diamond shape
const diamondShape: CustomParticleShape = {
  render: ({ size, color, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <path d="M12 2 L22 12 L12 22 L2 12 Z" fill={color} />
    </svg>
  )
};

// Custom triangle shape
const triangleShape: CustomParticleShape = {
  render: ({ size, color, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <path d="M12 2 L22 22 L2 22 Z" fill={color} />
    </svg>
  )
};

// Custom plus sign
const plusShape: CustomParticleShape = {
  render: ({ size, color, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <path d="M11 2 H13 V11 H22 V13 H13 V22 H11 V13 H2 V11 H11 Z" fill={color} />
    </svg>
  )
};

// Custom hexagon
const hexagonShape: CustomParticleShape = {
  render: ({ size, color, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <path d="M12 2 L21 7 L21 17 L12 22 L3 17 L3 7 Z" fill={color} />
    </svg>
  )
};

// Emoji shape
const emojiShape: CustomParticleShape = {
  render: ({ size, className }) => (
    <div className={className} style={{ fontSize: size, lineHeight: 1 }}>
      🎉
    </div>
  )
};

export function CustomShapesExample() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">Custom Particle Shapes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Diamond */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Diamond</h2>
          <LikeButton 
            particleConfig={{
              shape: diamondShape,
              colors: ['#00CED1', '#1E90FF']
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`const diamond: CustomParticleShape = {
  render: ({ size, color }) => (
    <svg width={size} height={size}>
      <path d="M12 2 L22 12 L12 22 L2 12 Z" 
            fill={color} />
    </svg>
  )
};`}</code>
          </pre>
        </div>

        {/* Triangle */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Triangle</h2>
          <LikeButton 
            particleConfig={{
              shape: triangleShape,
              colors: ['#FF6347', '#FF4500']
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`const triangle: CustomParticleShape = {
  render: ({ size, color }) => (
    <svg width={size} height={size}>
      <path d="M12 2 L22 22 L2 22 Z" 
            fill={color} />
    </svg>
  )
};`}</code>
          </pre>
        </div>

        {/* Plus */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Plus Sign</h2>
          <LikeButton 
            particleConfig={{
              shape: plusShape,
              colors: ['#32CD32', '#00FF00']
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`const plus: CustomParticleShape = {
  render: ({ size, color }) => (
    <svg width={size} height={size}>
      <path d="M11 2 H13 V11 H22 V13 
               H13 V22 H11 V13 H2 V11 
               H11 Z" fill={color} />
    </svg>
  )
};`}</code>
          </pre>
        </div>

        {/* Hexagon */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Hexagon</h2>
          <LikeButton 
            particleConfig={{
              shape: hexagonShape,
              colors: ['#9370DB', '#8A2BE2']
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`const hexagon: CustomParticleShape = {
  render: ({ size, color }) => (
    <svg width={size} height={size}>
      <path d="M12 2 L21 7 L21 17 
               L12 22 L3 17 L3 7 Z" 
            fill={color} />
    </svg>
  )
};`}</code>
          </pre>
        </div>

        {/* Emoji */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Emoji</h2>
          <LikeButton 
            particleConfig={{
              shape: emojiShape,
              count: 15
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`const emoji: CustomParticleShape = {
  render: ({ size }) => (
    <div style={{ fontSize: size }}>
      🎉
    </div>
  )
};`}</code>
          </pre>
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Creating Custom Shapes</h3>
        <p className="mb-4">
          Custom shapes must implement the <code>CustomParticleShape</code> interface:
        </p>
        <pre className="bg-white p-4 rounded overflow-x-auto">
          <code>{`interface CustomParticleShape {
  render: (props: ParticleShapeProps) => React.ReactNode;
}

interface ParticleShapeProps {
  size: number;      // Size in pixels
  color: string;     // Hex or CSS color
  className?: string; // Optional CSS class
}`}</code>
        </pre>
      </div>
    </div>
  );
}

