/**
 * Particle Presets Example
 * 
 * This example demonstrates all built-in particle presets.
 */

import { LikeButton } from '@jepepa/like-button';

export function ParticlePresetsExample() {
  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-3xl font-bold">Particle Presets</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Burst Preset */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Burst</h2>
          <p className="text-sm text-gray-600 text-center">
            Quick explosion of hearts in all directions (12 particles)
          </p>
          <LikeButton 
            particlePreset="burst"
            onClick={(clicks) => console.log('Burst clicks:', clicks)}
          />
        </div>

        {/* Fountain Preset */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Fountain</h2>
          <p className="text-sm text-gray-600 text-center">
            Upward spray effect (10 particles)
          </p>
          <LikeButton 
            particlePreset="fountain"
            onClick={(clicks) => console.log('Fountain clicks:', clicks)}
          />
        </div>

        {/* Confetti Preset */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Confetti</h2>
          <p className="text-sm text-gray-600 text-center">
            Colorful celebration with mixed shapes (15 particles)
          </p>
          <LikeButton 
            particlePreset="confetti"
            onClick={(clicks) => console.log('Confetti clicks:', clicks)}
          />
        </div>

        {/* Gentle Preset */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Gentle</h2>
          <p className="text-sm text-gray-600 text-center">
            Subtle floating effect (6 particles)
          </p>
          <LikeButton 
            particlePreset="gentle"
            onClick={(clicks) => console.log('Gentle clicks:', clicks)}
          />
        </div>

        {/* Fireworks Preset */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">Fireworks</h2>
          <p className="text-sm text-gray-600 text-center">
            Explosive sparkle effect (16 particles)
          </p>
          <LikeButton 
            particlePreset="fireworks"
            onClick={(clicks) => console.log('Fireworks clicks:', clicks)}
          />
        </div>

        {/* No Particles */}
        <div className="flex flex-col items-center gap-4 p-6 border rounded-lg">
          <h2 className="text-xl font-semibold">No Particles</h2>
          <p className="text-sm text-gray-600 text-center">
            Just the liquid fill effect
          </p>
          <LikeButton 
            onClick={(clicks) => console.log('No particles clicks:', clicks)}
          />
        </div>
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Usage</h3>
        <pre className="bg-white p-4 rounded overflow-x-auto">
          <code>{`<LikeButton particlePreset="burst" />
<LikeButton particlePreset="fountain" />
<LikeButton particlePreset="confetti" />
<LikeButton particlePreset="gentle" />
<LikeButton particlePreset="fireworks" />`}</code>
        </pre>
      </div>
    </div>
  );
}

