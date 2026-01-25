/**
 * Custom Particle Configuration Example
 * 
 * This example demonstrates custom particle configurations.
 */

import { LikeButton } from '@fmarlats/react-like-button';

export function CustomParticlesExample() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">Custom Particle Configurations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Custom Colors */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Custom Colors</h2>
          <p className="text-sm text-gray-600 text-center">
            Gold and orange particles
          </p>
          <LikeButton 
            particleConfig={{
              colors: ['#FFD700', '#FFA500', '#FF6347']
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particleConfig={{
  colors: ['#FFD700', '#FFA500', '#FF6347']
}}`}</code>
          </pre>
        </div>

        {/* Custom Shape */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Custom Shape</h2>
          <p className="text-sm text-gray-600 text-center">
            Star-shaped particles
          </p>
          <LikeButton 
            particleConfig={{
              shape: 'star',
              colors: ['#FFD700']
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particleConfig={{
  shape: 'star',
  colors: ['#FFD700']
}}`}</code>
          </pre>
        </div>

        {/* High Count */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">High Particle Count</h2>
          <p className="text-sm text-gray-600 text-center">
            30 particles for dramatic effect
          </p>
          <LikeButton 
            particleConfig={{
              count: 30,
              speed: 600
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particleConfig={{
  count: 30,
  speed: 600
}}`}</code>
          </pre>
        </div>

        {/* Slow Animation */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Slow Animation</h2>
          <p className="text-sm text-gray-600 text-center">
            Slow, graceful particles
          </p>
          <LikeButton 
            particleConfig={{
              speed: 1500,
              fadeOut: true
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particleConfig={{
  speed: 1500,
  fadeOut: true
}}`}</code>
          </pre>
        </div>

        {/* Upward Spray */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Upward Spray</h2>
          <p className="text-sm text-gray-600 text-center">
            Particles spray upward
          </p>
          <LikeButton 
            particleConfig={{
              spread: 120,
              spreadOffset: -90,
              distance: { min: 100, max: 150 }
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particleConfig={{
  spread: 120,
  spreadOffset: -90,
  distance: { min: 100, max: 150 }
}}`}</code>
          </pre>
        </div>

        {/* Large Particles */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Large Particles</h2>
          <p className="text-sm text-gray-600 text-center">
            Big, bold particles
          </p>
          <LikeButton 
            particleConfig={{
              size: { min: 2.0, max: 3.0 },
              count: 10
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particleConfig={{
  size: { min: 2.0, max: 3.0 },
  count: 10
}}`}</code>
          </pre>
        </div>

        {/* Sparkle Effect */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Sparkle Effect</h2>
          <p className="text-sm text-gray-600 text-center">
            Sparkles with custom colors
          </p>
          <LikeButton 
            particleConfig={{
              shape: 'sparkle',
              colors: ['#FFD700', '#FFA500', '#FF1493'],
              count: 20,
              speed: 500
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particleConfig={{
  shape: 'sparkle',
  colors: ['#FFD700', '#FFA500', '#FF1493'],
  count: 20,
  speed: 500
}}`}</code>
          </pre>
        </div>

        {/* Combined Preset + Custom */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Preset + Custom</h2>
          <p className="text-sm text-gray-600 text-center">
            Burst preset with custom count
          </p>
          <LikeButton 
            particlePreset="burst"
            particleConfig={{
              count: 25,
              colors: ['#ff0000', '#00ff00', '#0000ff']
            }}
          />
          <pre className="text-xs bg-gray-100 p-2 rounded w-full overflow-x-auto">
            <code>{`particlePreset="burst"
particleConfig={{
  count: 25,
  colors: ['#ff0000', '#00ff00', '#0000ff']
}}`}</code>
          </pre>
        </div>
      </div>
    </div>
  );
}

