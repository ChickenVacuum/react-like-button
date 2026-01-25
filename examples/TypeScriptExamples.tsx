/**
 * TypeScript Usage Examples
 *
 * This file demonstrates TypeScript usage with the LikeButton component,
 * including type inference, custom shapes, and advanced configurations.
 */

import React from 'react';
import { LikeButton } from '@fmarlats/react-like-button';
import type {
  LikeButtonProps,
  ParticleConfig,
  ParticlePreset,
  ParticleShape,
  CustomParticleShape,
  ParticleShapeProps,
  Range,
} from '@fmarlats/react-like-button';

// ============================================================================
// Example 1: Basic Type-Safe Usage
// ============================================================================

export function BasicTypeSafeExample() {
  // Type inference works automatically
  const handleClick = (clicks: number) => {
    console.log('Clicks:', clicks);
  };

  return (
    <LikeButton 
      onClick={handleClick}
      particlePreset="burst"
    />
  );
}

// ============================================================================
// Example 2: Typed Particle Configuration
// ============================================================================

export function TypedParticleConfigExample() {
  // Explicitly typed configuration object
  const particleConfig: ParticleConfig = {
    shape: 'star',
    colors: ['#FFD700', '#FFA500', '#FF6347'],
    count: 15,
    speed: 600,
    distance: { min: 80, max: 120 },
    spread: 180,
    spreadOffset: -90,
    size: { min: 1.2, max: 2.0 },
    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
    fadeOut: true,
  };

  return <LikeButton particleConfig={particleConfig} />;
}

// ============================================================================
// Example 3: Partial Configuration with Type Safety
// ============================================================================

export function PartialConfigExample() {
  // Partial configuration - all fields are optional
  const config: ParticleConfig = {
    count: 20,
    colors: ['#ff0000'],
    // Other fields will use defaults
  };

  return <LikeButton particleConfig={config} />;
}

// ============================================================================
// Example 4: Custom Particle Shape with Types
// ============================================================================

// Define a custom diamond shape with full type safety
const diamondShape: CustomParticleShape = {
  render: ({ size, color, className }: ParticleShapeProps) => (
    <svg 
      width={size} 
      height={size} 
      className={className} 
      viewBox="0 0 24 24"
    >
      <path d="M12 2 L22 12 L12 22 L2 12 Z" fill={color} />
    </svg>
  ),
};

export function CustomShapeExample() {
  return (
    <LikeButton 
      particleConfig={{
        shape: diamondShape,
        colors: ['#00CED1', '#1E90FF'],
      }}
    />
  );
}

// ============================================================================
// Example 5: Reusable Shape Components
// ============================================================================

// Create a reusable shape component
const TriangleShape: React.FC<ParticleShapeProps> = ({ size, color, className }) => (
  <svg width={size} height={size} className={className} viewBox="0 0 24 24">
    <path d="M12 2 L22 22 L2 22 Z" fill={color} />
  </svg>
);

// Use it in a CustomParticleShape
const triangleShape: CustomParticleShape = {
  render: (props) => <TriangleShape {...props} />,
};

export function ReusableShapeExample() {
  return <LikeButton particleConfig={{ shape: triangleShape }} />;
}

// ============================================================================
// Example 6: Type-Safe Preset Selection
// ============================================================================

export function PresetSelectionExample() {
  // Type-safe preset selection
  const presets: ParticlePreset[] = [
    'burst',
    'fountain',
    'confetti',
    'gentle',
    'fireworks',
  ];

  const [selectedPreset, setSelectedPreset] = React.useState<ParticlePreset>('burst');

  return (
    <div>
      <select 
        value={selectedPreset} 
        onChange={(e) => setSelectedPreset(e.target.value as ParticlePreset)}
      >
        {presets.map((preset) => (
          <option key={preset} value={preset}>
            {preset}
          </option>
        ))}
      </select>
      <LikeButton particlePreset={selectedPreset} />
    </div>
  );
}

// ============================================================================
// Example 7: Type-Safe Range Configuration
// ============================================================================

export function RangeConfigExample() {
  // Explicitly typed ranges
  const distanceRange: Range = { min: 100, max: 150 };
  const sizeRange: Range = { min: 1.5, max: 2.5 };

  const config: ParticleConfig = {
    distance: distanceRange,
    size: sizeRange,
  };

  return <LikeButton particleConfig={config} />;
}

// ============================================================================
// Example 8: Complete Props Interface
// ============================================================================

export function CompletePropsExample() {
  // Use the full LikeButtonProps interface
  const props: LikeButtonProps = {
    size: 100,
    fillColor: '#EF4444',
    waveColor: '#DC2626',
    maxClicks: 10,
    onClick: (clicks) => console.log('Clicks:', clicks),
    shape: 'rounded',
    cursor: 'heart',
    particlePreset: 'burst',
    particleConfig: {
      count: 15,
      colors: ['#FFD700'],
    },
  };

  return <LikeButton {...props} />;
}

// ============================================================================
// Example 9: Factory Function for Configurations
// ============================================================================

// Create a factory function for particle configurations
function createParticleConfig(
  shape: ParticleShape,
  colors: string[],
  count: number = 12
): ParticleConfig {
  return {
    shape,
    colors,
    count,
    speed: 600,
    distance: { min: 80, max: 120 },
    fadeOut: true,
  };
}

export function FactoryFunctionExample() {
  const config = createParticleConfig('star', ['#FFD700', '#FFA500'], 20);
  
  return <LikeButton particleConfig={config} />;
}

// ============================================================================
// Example 10: Conditional Configuration
// ============================================================================

export function ConditionalConfigExample() {
  const [isSpecial, setIsSpecial] = React.useState(false);

  // Type-safe conditional configuration
  const config: ParticleConfig = isSpecial
    ? {
        shape: 'sparkle',
        count: 30,
        colors: ['#FFD700', '#FFA500'],
        speed: 500,
      }
    : {
        shape: 'heart',
        count: 12,
        colors: ['#EF4444'],
        speed: 600,
      };

  return (
    <div>
      <button onClick={() => setIsSpecial(!isSpecial)}>
        Toggle Special Mode
      </button>
      <LikeButton particleConfig={config} />
    </div>
  );
}

// ============================================================================
// Example 11: Type Guards
// ============================================================================

// Type guard for checking if a shape is a preset
function isPresetShape(shape: ParticleShape): shape is string {
  return typeof shape === 'string';
}

// Type guard for checking if a shape is custom
function isCustomShape(shape: ParticleShape): shape is CustomParticleShape {
  return typeof shape === 'object' && 'render' in shape;
}

export function TypeGuardExample() {
  const shape: ParticleShape = 'star';

  if (isPresetShape(shape)) {
    console.log('Using preset shape:', shape);
  } else if (isCustomShape(shape)) {
    console.log('Using custom shape');
  }

  return <LikeButton particleConfig={{ shape }} />;
}

// ============================================================================
// Example 12: Generic Configuration Builder
// ============================================================================

class ParticleConfigBuilder {
  private config: ParticleConfig = {};

  setShape(shape: ParticleShape): this {
    this.config.shape = shape;
    return this;
  }

  setColors(...colors: string[]): this {
    this.config.colors = colors;
    return this;
  }

  setCount(count: number): this {
    this.config.count = count;
    return this;
  }

  setSpeed(speed: number): this {
    this.config.speed = speed;
    return this;
  }

  setDistance(min: number, max: number): this {
    this.config.distance = { min, max };
    return this;
  }

  build(): ParticleConfig {
    return this.config;
  }
}

export function BuilderPatternExample() {
  const config = new ParticleConfigBuilder()
    .setShape('star')
    .setColors('#FFD700', '#FFA500')
    .setCount(20)
    .setSpeed(600)
    .setDistance(80, 120)
    .build();

  return <LikeButton particleConfig={config} />;
}

// ============================================================================
// Export all examples
// ============================================================================

export default {
  BasicTypeSafeExample,
  TypedParticleConfigExample,
  PartialConfigExample,
  CustomShapeExample,
  ReusableShapeExample,
  PresetSelectionExample,
  RangeConfigExample,
  CompletePropsExample,
  FactoryFunctionExample,
  ConditionalConfigExample,
  TypeGuardExample,
  BuilderPatternExample,
};

