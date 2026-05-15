# Animation Flow Diagram

## Timeline of User Experience

```
┌─────────────────────────────────────────────────────────────────┐
│                     PRELOADER PHASE (0-3s)                      │
├─────────────────────────────────────────────────────────────────┤
│  Progress: 10% → 30% → 50% → 70% → 100%                        │
│  Loading: Images, fonts, assets                                 │
│  Visual: Gold progress bar, percentage counter                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  PRELOADER EXIT (3.0-3.6s)                      │
├─────────────────────────────────────────────────────────────────┤
│  Animation: Fade out (opacity: 1 → 0)                          │
│  Duration: 0.6s                                                 │
│  Easing: [0.16, 1, 0.3, 1] (premium cubic-bezier)             │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   PAGE ENTRANCE (3.2-4.0s)                      │
├─────────────────────────────────────────────────────────────────┤
│  Delay: 0.2s after preloader starts exit                       │
│  Animation: Fade in (opacity: 0 → 1)                           │
│  Duration: 0.8s                                                 │
│  Affects: All page content                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   NAVBAR ENTRANCE (3.3-4.1s)                    │
├─────────────────────────────────────────────────────────────────┤
│  Delay: 0.3s after preloader starts exit                       │
│  Animation: Slide down + fade in                               │
│  Initial: y: -100px, opacity: 0                                │
│  Final: y: 0, opacity: 1                                       │
│  Duration: 0.8s                                                 │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  HERO ANIMATIONS (3.2-5.0s)                     │
├─────────────────────────────────────────────────────────────────┤
│  Triggered by: ready state = true                              │
│  Staggered children animations:                                │
│    - Eyebrow + rule                                            │
│    - Headline                                                   │
│    - Subcopy                                                    │
│    - CTA buttons                                               │
│    - Stats cards                                               │
│    - Dashboard image (with 3D transform)                       │
│    - Floating cards (delayed)                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│              SCROLL-BASED PARALLAX (Continuous)                 │
└─────────────────────────────────────────────────────────────────┘
```

## Parallax Layers by Section

### 🏠 Hero Section
```
Layer 1 (Fastest):  Semi-circle decoration
                    ↓ -90px, rotate -4deg
                    
Layer 2 (Medium):   Dashboard image
                    ↓ -60px, opacity fade
                    
Layer 3 (Slowest):  Background elements
                    Static/minimal movement
```

### 👥 About Section
```
Layer 1 (Fastest):  Team image
                    ↓ 100px → -100px
                    
Layer 2 (Medium):   Text content
                    ↓ 50px → -50px
                    
Layer 3 (Slow):     Stats card
                    ↓ 0 → -40px
                    
Layer 4 (Slowest):  Badge
                    ↓ 0 → -30px
```

### 🛠️ Services Section
```
Background:         "SERVICES" wordmark
                    ↓ 0 → -150px
                    opacity: 0.3 → 1 → 0.3
                    
Foreground:         Service rows (static)
                    Expand on hover
```

### 📁 Projects Section
```
Card 1:            ↓ 50px → -50px
Card 2:            ↓ 60px → -60px
Card 3:            ↓ 70px → -70px
Card 4:            ↓ 80px → -80px
Card 5:            ↓ 90px → -90px

(Staggered cascade effect)
```

### ❓ FAQ Section
```
Background:         "ANSWERS" wordmark
                    ↓ 0 → 120px
                    rotate: 0 → 5deg
                    
Foreground:         FAQ accordion (static)
                    Expand/collapse on click
```

### ⭐ Reviews Section
```
Marquee Track:      Horizontal parallax
                    ← 0 → -200px
                    (Follows scroll direction)
```

### 📧 Contact Section
```
Layer 1:            Background glow
                    scale: 0.8 → 1.2 → 0.8
                    
Layer 2:            "CONTACT" wordmark
                    ↓ -50px → 50px
                    scale: 0.8 → 1 → 0.8
                    
Layer 3:            Form content (static)
```

## Interaction States

### Hover Effects
```
Buttons:           scale: 1 → 1.05
                   shadow: increase
                   
Project Cards:     y: 0 → -6px
                   scale: 1 → 1.02
                   
Service Rows:      scaleX: 0 → 1 (dark fill)
                   color: dark → cream
                   
Links:             color transition
                   underline animation
```

### Click/Tap Effects
```
Accordion:         height: 0 → auto
                   opacity: 0 → 1
                   rotate icon: 0 → 45deg
                   
Profile Slider:    x: 40 → 0 → -40
                   opacity: 0 → 1 → 0
                   
Navigation:        smooth scroll to section
                   active indicator slide
```

## Performance Metrics

### Target Performance
```
Frame Rate:        60 FPS
First Paint:       < 1s
Interactive:       < 3.5s (after preloader)
Smooth Scroll:     No jank
Memory:            Stable (no leaks)
```

### Optimization Techniques
```
✓ GPU Acceleration:    transform, opacity only
✓ Will-Change:         Applied to animated elements
✓ Passive Listeners:   Scroll events
✓ RequestAnimFrame:    Framer Motion handles
✓ Debouncing:          Not needed (Framer optimized)
```

## Accessibility

### Motion Preferences
```
@media (prefers-reduced-motion: reduce) {
  - Disable parallax
  - Instant transitions
  - Static elements
}
```

### Keyboard Navigation
```
✓ Tab order preserved
✓ Focus indicators visible
✓ Skip links available
✓ ARIA labels present
```

## Browser Support

### Full Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Graceful Degradation
- Older browsers: Static layout
- No JS: Content visible
- Slow connections: Progressive enhancement

## Debug Mode

### Enable Verbose Logging
```typescript
// In any section component
useEffect(() => {
  console.log('Scroll Progress:', scrollYProgress.get());
}, [scrollYProgress]);
```

### Visualize Scroll Triggers
```typescript
// Add to section
<div className="fixed top-0 right-0 bg-black text-white p-4 z-50">
  Scroll: {Math.round(scrollYProgress.get() * 100)}%
</div>
```

### Performance Monitoring
```javascript
// In browser console
performance.mark('animation-start');
// ... after animations
performance.mark('animation-end');
performance.measure('animation-duration', 'animation-start', 'animation-end');
```

## Common Issues & Solutions

### Issue: Animations Choppy
**Solution:** Reduce parallax ranges, check CPU usage

### Issue: Preloader Doesn't Finish
**Solution:** Check image loading, network tab

### Issue: Parallax Not Working
**Solution:** Verify ref is attached, check scroll offset

### Issue: Content Flashes
**Solution:** Ensure initial states match, check AnimatePresence

### Issue: Mobile Performance
**Solution:** Reduce parallax on mobile, use media queries
