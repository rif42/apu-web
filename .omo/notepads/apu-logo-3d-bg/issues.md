# Issues: apu-logo-3d-bg

## Resolved Issues

### F1: rAF running when section not visible
- Status: FIXED
- File: src/sections/about/AboutVisionMission.astro
- Fix: requestAnimationFrame only schedules next frame when isVisible=true. IntersectionObserver restarts loop when section becomes visible.

### F2: Event listener cleanup incomplete
- Status: FIXED
- File: src/sections/about/AboutVisionMission.astro
- Fix 1: astro:unmount listener attached to section element instead of document
- Fix 2: cleanup() now removes beforeunload and astro:unmount listeners

## Design Change

### prefers-reduced-motion removed
- User explicitly requested: force the animation to load, ignore prefers-reduced-motion
- All prefers-reduced-motion checks removed from mousemove, rAF loop, and click handler
- Accessibility note: This goes against WCAG guidelines but was explicitly requested by user
