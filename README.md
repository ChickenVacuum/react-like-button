# React Multi Like Button

| Custom hearth with on complete state | Classic button | Like shaped cursor | Gold stars particle |
|--------|--------|--------|--------|
| ![Full hearth SVG](docs/header_demos/multi_like_button_hearth_svg.gif) | ![Round with sparks](docs/header_demos/multi_like_button_round_sparks.gif) | ![Square with emeralds](docs/header_demos/multi_like_button_square_emerald.gif) | ![Square with stars](docs/header_demos/multi_like_button_square_star.gif) |


An animated like button component with liquid fill effect and customizable particle animations. Available in both Tailwind CSS and vanilla CSS versions.

## Features

- 🎨 **Liquid Fill Animation** - Smooth wave effect that fills the button (that's why it's called "multi like")
- ✨ **Particle Effects** - 5 built-in presets + full customization when you click
- 🎯 **Multiple Clicks** - Track multiple likes with configurable max. You can configure 1 click to fill the like, or multiple ones.
- 🎭 **Custom Shapes** - Circle, rounded, or custom
- 🖱️ **Custom Cursors** - Built-in presets (heart, star, thumbs-up) or custom
- 🎨 **Fully Customizable** - Colors, sizes, styles, and more
- 📦 **Two Versions** - Tailwind CSS or vanilla CSS
- ♿ **Accessible** - ARIA labels and keyboard support
- 📱 **Responsive** - Works on all screen sizes
- 🔒 **TypeScript** - Full type safety

## Installation

```bash
npm install @jepepa/like-button
# or
yarn add @jepepa/like-button
# or
pnpm add @jepepa/like-button
```

## Quick Start

### Tailwind CSS Version

```tsx
import { LikeButton } from '@jepepa/like-button';

function App() {
  return (
    <LikeButton 
      onClick={(clicks) => console.log('Total clicks:', clicks)}
      particlePreset="burst"
    />
  );
}
```

### Vanilla CSS Version

```tsx
import { LikeButtonVanilla } from '@jepepa/like-button';
import '@jepepa/like-button/styles.css';

function App() {
  return (
    <LikeButtonVanilla 
      onClick={(clicks) => console.log('Total clicks:', clicks)}
      particlePreset="confetti"
    />
  );
}
```

## Particle Effects

### Built-in Presets

Choose from 5 professionally designed particle effects:

```tsx
// Quick explosion of hearts (12 particles)
<LikeButton particlePreset="burst" />

// Upward spray effect (10 particles)
<LikeButton particlePreset="fountain" />

// Colorful celebration (15 particles)
<LikeButton particlePreset="confetti" />

// Subtle floating effect (6 particles)
<LikeButton particlePreset="gentle" />

// Explosive sparkles (16 particles)
<LikeButton particlePreset="fireworks" />
```

### Custom Particle Configuration

Fully customize particle behavior:

```tsx
<LikeButton particleConfig={{
  shape: 'star',                        // 'heart' | 'star' | 'circle' | 'square' | 'sparkle'
  colors: ['#FFD700', '#FFA500'],       // Array of colors
  count: 15,                            // Number of particles
  speed: 600,                           // Animation duration (ms)
  distance: { min: 80, max: 120 },      // Travel distance (px)
  spread: 180,                          // Spread angle (degrees)
  spreadOffset: -90,                    // Starting angle (0=right, 90=down, 180=left, 270=up)
  size: { min: 1.2, max: 2.0 },         // Size range (scale multiplier)
  easing: 'cubic-bezier(0.22, 1, 0.36, 1)',  // CSS easing function
  fadeOut: true                         // Fade out during animation
}} />
```

### Combine Preset with Custom Config

Start with a preset and override specific properties:

```tsx
<LikeButton 
  particlePreset="burst" 
  particleConfig={{ 
    count: 20,
    colors: ['#ff0000', '#00ff00', '#0000ff']
  }} 
/>
```

## Basic Usage

### Click Tracking

```tsx
<LikeButton 
  maxClicks={10}
  onClick={(clicks) => console.log('Clicks:', clicks)}
  onRightClick={(clicks) => console.log('Right click at:', clicks)}
/>
```

### Controlled Mode

```tsx
const [clicks, setClicks] = useState(0);

<LikeButton 
  localClicks={clicks}
  onClick={(newClicks) => setClicks(newClicks)}
  maxClicks={5}
/>
```

### Custom Colors

```tsx
<LikeButton 
  fillColor="#ff0000"
  waveColor="#ff6666"
  size={120}
/>
```

### Custom Shapes

```tsx
// Built-in shapes
<LikeButton shape="circle" />
<LikeButton shape="rounded" />

// Custom clip-path
<LikeButton shape={{ 
  clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" 
}} />
```

### Custom Cursors

```tsx
// Built-in cursor presets
<LikeButton cursor="heart" />
<LikeButton cursor="star" />
<LikeButton cursor="thumbs-up" />
<LikeButton cursor="pointer" />

// Custom cursor
<LikeButton cursor={{
  url: "data:image/svg+xml;...",
  hotspotX: 16,
  hotspotY: 16,
  fallback: "pointer"
}} />
```

## Advanced Examples

### Celebration Button

Perfect for achievements and milestones:

```tsx
<LikeButton
  particlePreset="confetti"
  particleConfig={{
    count: 25,
    speed: 1000,
    distance: { min: 100, max: 150 }
  }}
  fillColor="#FFD700"
  size={100}
/>
```

### Upvote Button

Reddit-style upvote with fountain effect:

```tsx
<LikeButton
  particlePreset="fountain"
  particleConfig={{
    colors: ['#FF4500'],
    shape: 'star'
  }}
  fillColor="#FF4500"
  shape="rounded"
/>
```

### Subtle Favorite

Gentle effect for favorites:

```tsx
<LikeButton
  particlePreset="gentle"
  particleConfig={{
    colors: ['#FFB6C1', '#FFC0CB'],
    fadeOut: true
  }}
  fillColor="#FFB6C1"
/>
```

### Custom Shape Particles

Create custom particle shapes:

```tsx
import type { CustomParticleShape } from '@jepepa/like-button';

const customDiamond: CustomParticleShape = {
  render: ({ size, color, className }) => (
    <svg width={size} height={size} className={className} viewBox="0 0 24 24">
      <path d="M12 2 L22 12 L12 22 L2 12 Z" fill={color} />
    </svg>
  )
};

<LikeButton particleConfig={{ shape: customDiamond }} />
```

## API Reference

### LikeButton Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `number` | `80` | Button size in pixels |
| `fillColor` | `string` | `"#EF4444"` | Fill color (hex or CSS color) |
| `waveColor` | `string` | `fillColor` | Wave color (defaults to fillColor) |
| `maxClicks` | `number` | `Infinity` | Maximum number of clicks allowed |
| `localClicks` | `number` | - | Controlled mode: current click count |
| `onClick` | `(clicks: number) => void` | - | Click handler |
| `onRightClick` | `(clicks: number) => void` | - | Right-click handler |
| `shape` | `ShapePreset \| CustomShape` | `"heart"` | Button shape |
| `cursor` | `CursorPreset \| CustomCursor` | `"heart"` | Cursor style |
| `styles` | `StyleOverrides` | - | Custom style overrides |
| `renderIcon` | `(props) => ReactNode` | - | Custom icon renderer |
| `minFillPercent` | `number` | `5` | Minimum fill percentage |
| `particlePreset` | `ParticlePreset` | - | Particle effect preset |
| `particleConfig` | `ParticleConfig` | - | Custom particle configuration |

### ParticleConfig

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shape` | `ParticleShape` | `'heart'` | Particle shape |
| `colors` | `string[]` | `['#EF4444', '#B9FF14', '#3B82F6']` | Particle colors |
| `count` | `number` | `8` | Number of particles |
| `size` | `number \| Range` | `{ min: 1.0, max: 1.5 }` | Size multiplier |
| `speed` | `number` | `500` | Animation duration (ms) |
| `distance` | `number \| Range` | `{ min: 60, max: 100 }` | Travel distance (px) |
| `spread` | `number` | `360` | Spread angle (degrees) |
| `spreadOffset` | `number` | `0` | Starting angle offset |
| `easing` | `string` | `'cubic-bezier(0.22, 1, 0.36, 1)'` | CSS easing |
| `fadeOut` | `boolean` | `true` | Fade out animation |

### ParticlePreset

- `'burst'` - Quick explosion of hearts (12 particles)
- `'fountain'` - Upward spray effect (10 particles)
- `'confetti'` - Colorful celebration (15 particles)
- `'gentle'` - Subtle floating effect (6 particles)
- `'fireworks'` - Explosive sparkles (16 particles)

### ParticleShape

- `'heart'` - Heart shape ❤️
- `'star'` - Star shape ⭐
- `'circle'` - Circle shape ⚫
- `'square'` - Square shape ◼️
- `'sparkle'` - Sparkle shape ✨
- `CustomParticleShape` - Custom shape object

## Examples

Check out the [examples](./examples) directory for more usage examples.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The particle system is optimized for performance:
- Particles are removed from DOM after animation
- CSS transforms for smooth 60fps animations
- Configurable particle count for performance tuning

**Recommendations:**
- Use 5-20 particles for frequent interactions
- Use 20-50 particles for special moments
- Use 50+ particles sparingly (may impact performance on slower devices)

## Accessibility

- ARIA labels for screen readers
- Keyboard support (Enter/Space to click)
- Particles marked as decorative (`aria-hidden="true"`)
- Respects `prefers-reduced-motion` (particles disabled)

## TypeScript

Full TypeScript support with comprehensive type definitions:

```tsx
import type {
  LikeButtonProps,
  ParticleConfig,
  ParticlePreset,
  ParticleShape,
  CustomParticleShape,
  ParticleShapeProps
} from '@jepepa/like-button';
```

## Contributing

Contributions are welcome! Please open an issue or pull request on GitHub.

## License

MIT © [jepepa](https://jepepa.com)

## Credits

Created by [jepepa](https://github.com/ChickenVacuum)

## Support

- 🐛 [Report a bug](https://github.com/ChickenVacuum/react-multi-like-button/issues)
- 💡 [Request a feature](https://github.com/ChickenVacuum/react-multi-like-button/issues)
- ⭐ [Star on GitHub](https://github.com/ChickenVacuum/react-multi-like-button)


