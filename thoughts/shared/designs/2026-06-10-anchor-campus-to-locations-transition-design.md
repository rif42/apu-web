---
date: 2026-06-10
topic: "In-Place Section Transition: Anchor Campus → Campus Locations"
status: validated
---

# In-Place Section Transition: Anchor Campus → Campus Locations

## Problem Statement

When visitors click the **"Lihat Ekosistem SCCR"** button in `AnchorCampusSectionAPU`, the section should gracefully disappear and be replaced by `EcosystemSection` at the exact same position on the page. The transition must feel premium and intentional — no scroll jumps, no abrupt swaps.

## Constraints

- **Vanilla JS chosen for zero-dependency simplicity** — Alpine.js or Astro client directives are available if scope expands, but a small inline script is sufficient and keeps the bundle lean.
- **Graceful degradation** — if JS fails, the button must still function as a navigational anchor.
- **Accessibility** — focus management, `aria-hidden`, and `prefers-reduced-motion` are non-negotiable.
- **No layout shift** — the replacement must not cause visible page reflow during or after the transition.

## Approach

We use a **CSS grid overlay wrapper** to stack both sections in a single named grid cell. Only one panel is visible at a time. CSS transitions handle the crossfade; a small vanilla JS script toggles visibility on button click.

### Why this approach

Both sections contain an `aspect-video` map frame with an overlaid text panel, so their intrinsic heights are naturally similar. A single-grid-area layout lets them share the same bounding box without absolute positioning, height syncing, or resize observers. This is the simplest robust solution that respects the project's existing patterns.

### Alternatives considered

- **Absolute positioning + JS height sync**: Rejected — requires resize observers and is brittle on viewport changes.
- **Lazy-fetch replacement HTML**: Rejected — breaks Astro's SSR model and adds unnecessary complexity.

## Architecture

```
index.astro
└── .ecosystem-stage           [grid container, single area "stage"]
    ├── #ecosystem-anchor      [visible initially]
    │   └── AnchorCampusSectionAPU
    │       └── .ecosystem-trigger  [button with data attribute]
    └── #ecosystem-locations   [hidden initially, aria-hidden="true", inert]
        └── EcosystemSection
```

Both panels occupy `grid-area: stage`. The hidden panel uses `opacity: 0` + `visibility: hidden` + `pointer-events: none`. The transition duration is **600ms** with an `ease` timing function.

## Components & Responsibilities

### `src/pages/index.astro`

- Wraps `AnchorCampusSectionAPU` and `EcosystemSection` inside `.ecosystem-stage`.
- Removes the standalone `<EcosystemSection />` from its former position further down the page.
- Includes a `<script>` block that:
  1. Finds `.ecosystem-trigger` inside `#ecosystem-anchor`.
  2. Adds a `click` listener that calls `event.preventDefault()`.
  3. Toggles `.ecosystem-panel--hidden` on both panels.
  4. Toggles `aria-hidden="true"` and `inert` on the newly hidden panel.
  5. Moves focus to the heading of the newly visible panel.
  6. Guards against double-clicks during an active transition.

### `src/sections/AnchorCampusSectionAPU.astro`

- Adds `class="ecosystem-trigger"` to the tertiary CtaButton.
- Keeps `href="#jalur-masuk"` as a no-JS fallback.

### `src/sections/EcosystemSection.astro`

- No changes required.
- The wrapper in `index.astro` handles visibility and accessibility attributes.

## Data Flow

1. **Initial state**
   - `#ecosystem-anchor` is visible and interactive.
   - `#ecosystem-locations` has `.ecosystem-panel--hidden`, `aria-hidden="true"`, and `inert`.

2. **Click event**
   - Script intercepts click on `.ecosystem-trigger`.
   - `preventDefault()` stops the `#jalur-masuk` hash jump.

3. **Transition start**
   - `.ecosystem-panel--hidden` is removed from `#ecosystem-locations`.
   - `.ecosystem-panel--hidden` is added to `#ecosystem-anchor`.
   - Both panels animate via CSS (`opacity` + `visibility`).

4. **Transition end (~600ms)**
   - `aria-hidden="true"` and `inert` are applied to `#ecosystem-anchor`.
   - Focus moves to the `<h2>` inside `#ecosystem-locations`.

## CSS Design

```css
.ecosystem-stage {
  display: grid;
  grid-template-areas: "stage";
}

.ecosystem-stage > .ecosystem-panel {
  grid-area: stage;
  transition: opacity 600ms ease, visibility 600ms ease;
}

.ecosystem-panel--hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

@media (prefers-reduced-motion: reduce) {
  .ecosystem-stage > .ecosystem-panel {
    transition: none;
  }
}
```

## Error Handling

- **JS failure:** The `href="#jalur-masuk"` on the anchor acts as a fallback. The page scrolls to the pathways section instead of replacing content.
- **Double-click:** The script checks an `isTransitioning` flag to ignore clicks while the 600ms animation is active.
- **Reduced motion:** The `@media (prefers-reduced-motion: reduce)` rule removes the transition, causing an instant swap.
- **Focus loss:** After the swap, `focus()` is called on the revealed section's heading. If the heading lacks `tabindex="-1"`, the script temporarily adds it, focuses, then removes it.

## Testing Strategy

1. **Visual regression:** Click the button and verify a smooth 600ms crossfade with no flash.
2. **Layout stability:** Confirm the page does not jump or reflow during the transition.
3. **Accessibility:**
   - Tab through the page before and after the swap.
   - Verify focus lands on the new section heading.
   - Run axe-core to confirm no duplicate-landmark or focus-trap violations.
4. **Reduced motion:** Enable OS-level reduced motion and confirm an instant swap.
5. **No-JS fallback:** Disable JavaScript and verify the button navigates to `#jalur-masuk`.
6. **Mobile:** Test on a touch device to confirm tap behavior matches desktop.

## Open Questions

None. Design is ready for implementation.
