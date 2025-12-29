# React Like Button

[![npm version](https://img.shields.io/npm/v/@jepepa/react-like-button.svg)](https://www.npmjs.com/package/@jepepa/react-like-button)
[![bundle size](https://img.shields.io/bundlephobia/minzip/@jepepa/react-like-button)](https://bundlephobia.com/package/@jepepa/react-like-button)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

| Custom hearth with on complete state | Classic button | Like shaped cursor | Gold stars particle |
|--------|--------|--------|--------|
| ![Full hearth SVG](docs/header_demos/like_button_hearth_svg.gif) | ![Round with sparks](docs/header_demos/like_button_round_sparks.gif) | ![Square with emeralds](docs/header_demos/like_button_square_emerald.gif) | ![Square with stars](docs/header_demos/like_button_square_star.gif) |

_(The gifs are accelerated and chopped, the effects would render better in real life)_

Test it yourself: [StackBlitz Playground](https://stackblitz.com/edit/react-like-button-component?file=src%2FApp.tsx)

An animated like button component with liquid fill effect and customizable particle animations. Available in both Tailwind CSS and vanilla CSS versions.

## Features

- 🎯 **Multi like Fill Animation** - You can click and like multiple times until full (configurable) 
- ✨ **Particle Effects** - 5 built-in presets + full customization when you click
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
import '@jepepa/like-button/like-button.css'; // Required for animations

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

Choose from 5 designed particle effects:

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

Or fully customize particle behavior:

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

### Uncontrolled with Initial Value

```tsx
// Start with 3 clicks already filled
<LikeButton defaultClicks={3} maxClicks={10} />
```

### Controlled Mode

```tsx
const [clicks, setClicks] = useState(0);

// Using onChange (simpler, ideal for state setters)
<LikeButton
  clicks={clicks}
  onChange={setClicks}
  maxClicks={5}
/>

// Using onClick (when you need the event)
<LikeButton
  clicks={clicks}
  onClick={(newClicks, event) => {
    setClicks(newClicks);
    event.stopPropagation();
  }}
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
| `clicks` | `number` | - | Controlled mode: current click count |
| `defaultClicks` | `number` | `0` | Initial clicks for uncontrolled mode |
| `onChange` | `(clicks: number) => void` | - | Called with new count (ideal for `setClicks`) |
| `onClick` | `(clicks: number, event) => void` | - | Click handler with event access |
| `onRightClick` | `(clicks: number, event) => void` | - | Right-click handler |
| `shape` | `ShapePreset \| CustomShape` | `"heart"` | Button shape |
| `cursor` | `CursorPreset \| CustomCursor` | `"heart"` | Cursor style |
| `styles` | `StyleOverrides` | - | Custom style overrides |
| `renderIcon` | `(props) => ReactNode` | - | Custom icon renderer |
| `minFillPercent` | `number` | `5` | Minimum fill percentage |
| `showParticles` | `boolean` | `true` | Enable/disable particle effects |
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

| Preset | Shape | Count | Description |
|--------|-------|-------|-------------|
| `'burst'` | ❤️ heart | 12 | Quick explosion in all directions |
| `'fountain'` | ⚫ circle | 10 | Upward spray effect |
| `'confetti'` | ◼️ square | 15 | Colorful celebration |
| `'gentle'` | ❤️ heart | 6 | Subtle floating effect |
| `'fireworks'` | ✨ sparkle | 16 | Explosive sparkles |

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

## Changelog

### v0.9.3 (Breaking Change)

**⚠️ Breaking Change: Renamed `localClicks` to `clicks`**

The `localClicks` prop has been renamed to `clicks` for clarity:

```tsx
// Before
<LikeButton localClicks={clicks} onClick={(n) => setClicks(n)} />

// After
<LikeButton clicks={clicks} onClick={(n) => setClicks(n)} />
```

This also affects the `useLikeButton` hook:
- Option: `localClicks` → `clicks`
- Return value: `localClicks` → `clicks`
- `AriaLabelState.localClicks` → `AriaLabelState.clicks`

### v0.9.0 (Breaking Change)

**⚠️ Breaking Change for Tailwind Users**

The Tailwind CSS version now requires importing a CSS file for animations and hover effects to work:

```tsx
import { LikeButton } from '@jepepa/like-button';
import '@jepepa/like-button/like-button.css'; // NEW - Required
```

**What changed:**
- Removed inline `<style>` tag injection for better performance and CSP compliance
- Wave animations and hover/active states are now defined in an external CSS file
- CSS custom properties are used for dynamic styling

**Vanilla CSS users** are not affected - continue importing `@jepepa/like-button/styles.css` as before.

## Contributing

Contributions are welcome! Please open an issue or pull request on GitHub.

## License

MIT © [jepepa](https://jepepa.com)

## Credits

Created by [jepepa](https://github.com/ChickenVacuum)

## Support

- 🐛 [Report a bug](https://github.com/ChickenVacuum/react-like-button/issues)
- 💡 [Request a feature](https://github.com/ChickenVacuum/react-like-button/issues)
- ⭐ [Star on GitHub](https://github.com/ChickenVacuum/react-like-button)


