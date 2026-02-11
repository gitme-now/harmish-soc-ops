# Soft Cloud Welcome - Usage Notes

## Overview
This implementation provides an enhanced hero variant for the StartScreen component with a soft pastel cloud aesthetic.

## Components

### StartScreenHero
Located at: `src/components/StartScreenHero.tsx`

**Purpose:** Enhanced landing screen with larger hero heading, tagline, and modal dialog.

**Features:**
- Large, gradient hero heading "Welcome to Soc Ops"
- Supporting tagline and description
- Compact "How to Play" card with 4 numbered steps
- "Learn more" button that opens a modal dialog
- Keyboard support: Escape key closes modal
- Full ARIA accessibility attributes

**Props:**
```typescript
interface StartScreenHeroProps {
  onStart: () => void; // Callback when "Start Playing" is clicked
}
```

**Usage:**
```tsx
import { StartScreenHero } from './components/StartScreenHero'

<StartScreenHero onStart={handleStartGame} />
```

### BackgroundHero
Located at: `src/components/BackgroundHero.tsx`

**Purpose:** Animated cloud background with hero and default variants.

**Features:**
- Two variants: `hero` (4 clouds for landing page) and `default` (3 clouds for game screen)
- Subtle floating animations using `floatY` keyframes
- Uses design tokens: `--soft-sky`, `--lavender-mist`, `--peach-cloud`, `--blush`
- Respects `prefers-reduced-motion` via CSS

**Props:**
```typescript
interface BackgroundHeroProps {
  variant?: 'default' | 'hero'; // Defaults to 'default'
}
```

**Usage:**
```tsx
import BackgroundHero from './components/BackgroundHero'

// For hero landing page
<BackgroundHero variant="hero" />

// For game screen
<BackgroundHero variant="default" />
```

## Integrating into App

The implementation is already integrated into `App.tsx`:

```tsx
import { StartScreenHero } from './components/StartScreenHero';
import BackgroundHero from './components/BackgroundHero';

// In the App component
if (gameState === 'start') {
  return (
    <>
      <BackgroundHero variant="hero" />
      <StartScreenHero onStart={startGame} />
    </>
  );
}

return (
  <>
    <BackgroundHero variant="default" />
    {/* Game screen components */}
  </>
);
```

## Design Tokens

All colors use existing `@theme` tokens from `src/index.css`:
- `--cloud-base`: #F7FBFF (background)
- `--soft-sky`: #CFE9FF (blue cloud)
- `--lavender-mist`: #E9E2FF (purple cloud)
- `--peach-cloud`: #FFE9D6 (peach cloud)
- `--blush`: #FFDDE6 (pink cloud)
- `--cloud-ink`: #24303F (text)
- `--color-accent`: #CFE9FF (button background)

## Animations

Clouds use `floatY` keyframes animation defined in `index.css`:
- `animate-cloud-slow`: 18s duration
- `animate-cloud-medium`: 12s duration
- `animate-cloud-slower`: 24s duration

**Reduced Motion:**
All animations are disabled when `prefers-reduced-motion: reduce` is set via CSS media query.

## Accessibility Features

1. **Semantic HTML:** Proper heading hierarchy (h1, h2, h3, h4)
2. **ARIA Attributes:**
   - `role="dialog"` on modal
   - `aria-modal="true"` on modal
   - `aria-labelledby` connecting modal to heading
   - `aria-haspopup="dialog"` on "Learn more" button
3. **Keyboard Support:**
   - Escape key closes modal
   - Tab navigation through all interactive elements
4. **Focus Styles:** `.card-focus` class provides visible focus indicators
5. **Reduced Motion:** Respects user preferences

## Testing

Tests are located in:
- `src/components/StartScreenHero.test.tsx` (15 tests)
- `src/components/BackgroundHero.test.tsx` (8 tests)

**Run tests:**
```bash
npm test
```

**Test coverage includes:**
- Hero rendering
- Modal open/close functionality
- Keyboard navigation (Escape key)
- ARIA attributes
- Reduced motion support
- Cloud variants
- CSS variable usage

## Development

**Lint:**
```bash
npm run lint
```

**Build:**
```bash
npm run build
```

**Dev Server:**
```bash
npm run dev
```

## Browser Support

- Modern browsers supporting:
  - CSS Grid and Flexbox
  - CSS custom properties (variables)
  - CSS animations and keyframes
  - CSS media queries (prefers-reduced-motion)
  - SVG rendering

## Future Enhancements

Potential improvements:
1. Add animation variants (e.g., slower, faster)
2. Add more cloud shapes and colors
3. Make cloud count configurable
4. Add dark mode support for clouds
5. Add transition animations when switching between variants

## Troubleshooting

**Animations not working:**
- Check if user has `prefers-reduced-motion: reduce` enabled
- Verify CSS is properly loaded

**Modal not closing with Escape:**
- Ensure JavaScript is enabled
- Check browser console for errors

**Colors look wrong:**
- Verify Tailwind CSS v4 is properly configured
- Check that design tokens are loaded in `index.css`
