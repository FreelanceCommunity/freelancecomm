# Animation & Parallax Enhancements

## Overview
Enhanced the website with smooth transitions after preloader completion and parallax effects throughout all sections.

## Changes Made

### 1. **Page-Level Transitions (Index.tsx)**
- Added `AnimatePresence` wrapper around all content
- Content fades in smoothly after preloader completes
- 0.8s fade-in with 0.2s delay for elegant entrance
- Uses premium easing curve: `[0.16, 1, 0.3, 1]`

### 2. **Navbar Animations (Navbar.tsx)**
- Slides down from top after preloader
- Initial state: `y: -100, opacity: 0`
- Animates to visible when `ready` state is true
- 0.8s duration with 0.3s delay
- Smooth entrance coordinated with page content

### 3. **Hero Section (Hero.tsx)**
- Already had excellent parallax on dashboard image
- Existing animations:
  - Dashboard image parallax (moves -60px on scroll)
  - Semi-circle parallax with rotation
  - Opacity fade on scroll
  - Rotating wordmark carousel
  - Floating cards with 3D transforms

### 4. **About Section (About.tsx)**
- **Team Image Parallax**: Moves vertically based on scroll position (100px to -100px)
- **Text Content Parallax**: Moves at different speed (50px to -50px) for depth
- **Badge Parallax**: Floating badge moves independently (0 to -30px)
- **Stats Card Parallax**: Stats section has subtle movement (0 to -40px)
- Creates layered depth effect as user scrolls

### 5. **Services Section (Services.tsx)**
- **Vertical Wordmark Parallax**: "SERVICES" text moves and fades
  - Y-axis movement: 0 to -150px
  - Opacity: 0.3 → 1 → 0.3 (fades in and out)
- Existing expanding row animations preserved
- Explorer model animation maintained

### 6. **Projects Section (Projects.tsx)**
- **Individual Card Parallax**: Each project card has unique parallax
  - Staggered movement based on card index
  - Creates cascading effect: `50 + i*10` to `-50 - i*10`
- **Enhanced Hover**: Added scale effect (1.02) on hover
- Cards move at different speeds creating depth perception

### 7. **R&D/FAQ Section (RnD.tsx)**
- **Background Wordmark Parallax**: "ANSWERS" text moves and rotates
  - Y-axis: 0 to 120px
  - Rotation: 0 to 5 degrees
- Creates dynamic background element
- Existing accordion animations preserved

### 8. **Reviews Section (Reviews.tsx)**
- **Marquee Parallax**: Review cards track moves with scroll
  - X-axis movement: 0 to -200px
  - Creates interactive scrolling effect
- Enhances the existing marquee animation
- Adds depth to testimonial carousel

### 9. **CTA/Contact Section (CTA.tsx)**
- **Wordmark Parallax**: "CONTACT" text has multi-axis animation
  - Y-axis: -50px to 50px
  - Scale: 0.8 → 1 → 0.8 (breathes in/out)
- **Glow Effect Parallax**: Background glow scales dynamically
  - Scale: 0.8 → 1.2 → 0.8
- Creates pulsing, attention-grabbing effect

## Technical Implementation

### Parallax Technique
```typescript
const sectionRef = useRef<HTMLElement>(null);
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start end", "end start"],
});

const elementY = useTransform(scrollYProgress, [0, 1], [startValue, endValue]);
```

### Key Features
- **Scroll-based animations**: Using Framer Motion's `useScroll` and `useTransform`
- **Performance optimized**: GPU-accelerated transforms (translateY, scale, rotate)
- **Smooth easing**: Premium cubic-bezier curves throughout
- **Responsive**: All animations work across device sizes
- **Non-blocking**: Animations don't interfere with user interaction

## Animation Timing

1. **Preloader**: 0-3 seconds (loads to 100%)
2. **Preloader Exit**: 0.6s fade out
3. **Page Fade In**: 0.8s (starts at 0.2s after preloader)
4. **Navbar Slide In**: 0.8s (starts at 0.3s after preloader)
5. **Hero Animations**: Triggered by `ready` state
6. **Section Parallax**: Continuous during scroll

## Browser Compatibility
- Modern browsers with CSS transforms support
- Fallback: Static positioning if animations not supported
- Uses `will-change` for performance hints
- GPU acceleration via `transform` properties

## Performance Considerations
- Parallax uses `transform` (not `top`/`left`) for 60fps
- Scroll listeners use `passive: true` where possible
- Animations respect `prefers-reduced-motion`
- Lazy loading preserved for images

## Future Enhancements
- Add magnetic cursor effects on interactive elements
- Implement scroll-triggered micro-interactions
- Add page transition animations for route changes
- Consider adding GSAP for more complex timeline animations
