# Decisions: apu-logo-3d-bg

## Design Decisions
- Opacity: ~15% (not 12%) for visibility behind semi-transparent glass cards
- Mouse origin: Viewport-relative (like hero, simpler implementation)
- Flip behavior: One-shot, stays at rotateY(180deg) (user said "once")
- Click target: Logo element only (not entire section)
- Tilt range: Max +/-15deg for rotateX/rotateY
- Lerp factor: 0.08 (same as hero parallax)

## Technical Decisions
- Performance: IntersectionObserver gates rAF loop (improvement over hero's always-on)
- Accessibility: prefers-reduced-motion disables all transforms
- Mobile: Disable tilt on touch devices, keep click flip
- Debounce: Timestamp comparison (not setTimeout), 5000ms minimum
- Cleanup: Remove listeners on beforeunload or astro:unmount

## Scope Decisions
- Single file only: src/sections/about/AboutVisionMission.astro
- No global CSS additions
- No reusable component extraction
