# Examples

This directory contains example implementations of the LikeButton component demonstrating various features and configurations.

## Available Examples

### 1. Particle Presets (`ParticlePresets.tsx`)

Demonstrates all built-in particle effect presets:
- **Burst** - Quick explosion of hearts
- **Fountain** - Upward spray effect
- **Confetti** - Colorful celebration
- **Gentle** - Subtle floating effect
- **Fireworks** - Explosive sparkles

### 2. Custom Particles (`CustomParticles.tsx`)

Shows how to customize particle configurations:
- Custom colors
- Custom shapes (star, circle, square, sparkle)
- Custom particle count
- Custom animation speed
- Directional effects (upward spray, etc.)
- Size variations
- Combining presets with custom configs

### 3. Custom Shapes (`CustomShapes.tsx`)

Demonstrates creating custom particle shapes:
- Diamond shape
- Triangle shape
- Plus sign shape
- Hexagon shape
- Emoji particles

## Running the Examples

To run these examples in your project:

1. Install the package:
```bash
npm install @jepepa/like-button
```

2. Import and use the example components:
```tsx
import { ParticlePresetsExample } from './examples/ParticlePresets';
import { CustomParticlesExample } from './examples/CustomParticles';
import { CustomShapesExample } from './examples/CustomShapes';

function App() {
  return (
    <div>
      <ParticlePresetsExample />
      <CustomParticlesExample />
      <CustomShapesExample />
    </div>
  );
}
```

## Quick Examples

### Basic Usage

```tsx
import { LikeButton } from '@jepepa/like-button';

<LikeButton 
  onClick={(clicks) => console.log('Clicks:', clicks)}
  particlePreset="burst"
/>
```

### Custom Configuration

```tsx
<LikeButton 
  particleConfig={{
    shape: 'star',
    colors: ['#FFD700', '#FFA500'],
    count: 15,
    speed: 600,
    distance: { min: 80, max: 120 }
  }}
/>
```

### Combining Preset with Custom Config

```tsx
<LikeButton 
  particlePreset="burst"
  particleConfig={{
    count: 20,
    colors: ['#ff0000', '#00ff00', '#0000ff']
  }}
/>
```

### Custom Shape

```tsx
import type { CustomParticleShape } from '@jepepa/like-button';

const customShape: CustomParticleShape = {
  render: ({ size, color }) => (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <path d="M12 2 L22 12 L12 22 L2 12 Z" fill={color} />
    </svg>
  )
};

<LikeButton particleConfig={{ shape: customShape }} />
```

## Contributing

Feel free to add more examples! Please follow the existing structure and include:
- Clear component name and description
- Code examples with comments
- Visual demonstrations
- Usage instructions

