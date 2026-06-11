---
date: 2026-06-11
topic: "Map Pin Reactive Image in EcosystemSection"
status: validated
---

# Map Pin Reactive Image — Design Document

## Problem Statement

The EcosystemSection map currently shows static marker pins with popup labels, but there's no visual feedback when a user clicks a location. We need an image in the content overlay panel that reacts to which map pin is selected, with a default state showing APU University.

## Constraints

- **No external state management** — keep it lightweight, vanilla JS inside Astro islands
- **Don't break existing map behavior** — route animation, popup labels, and hover effects must remain
- **Placeholder images only** — final assets will come later; use existing project patterns (`picsum.photos`)
- **Default to APU Main Campus** — on page load, the image should show APU before any interaction
- **Smooth transitions** — image swaps should feel polished, not jarring
- **Accessibility** — the image must have meaningful alt text that updates with the location name

## Chosen Approach

**CustomEvent bridge between LeafletMap and EcosystemSection.**

LeafletMap dispatches a `markerclick` CustomEvent from its container element whenever a marker is clicked. EcosystemSection listens for this event on the map container and swaps the image source based on the marker label in the event detail.

**Why this approach:**
- **Minimal coupling** — LeafletMap doesn't need to know about images; EcosystemSection doesn't need to know about Leaflet internals
- **No component API changes needed** — we don't need to add callback props or complex serialization
- **Standard web API** — CustomEvents are native, zero dependency
- **Astro-friendly** — works cleanly with Astro's island hydration model

**Rejected alternatives:**
- **Modify LeafletMap Props interface to accept callbacks** — Astro can't serialize functions across the server/client boundary cleanly
- **Global event bus or store** — overkill for a single section interaction
- **Query DOM markers from EcosystemSection** — fragile; depends on Leaflet's internal DOM structure which may change

## Architecture

```
EcosystemSection.astro
├── LeafletMap (dispatches markerclick events)
│   └── L.marker.on('click') → dispatchEvent('markerclick', { label })
└── Client script (listens for markerclick)
    └── Updates <img> src + alt based on location → image mapping
```

## Components

### 1. LeafletMap Event Dispatch

Inside `initMultiMarkerMap`, attach a click handler to each marker that dispatches a `markerclick` CustomEvent on the map container:

- Event name: `markerclick`
- Event detail: `{ label: marker.label }`
- Dispatched from: the map container element (`container`)

This requires a small addition in the `data.markers.forEach` loop where markers are created.

### 2. EcosystemSection Image Display

Add an image element in the overlay panel where the `<!-- insert image here -->` comment currently lives:

- **Container**: a wrapper div with fixed aspect ratio (16:10 or similar) to prevent layout shift
- **Image**: `<img>` with transition on opacity for smooth cross-fade
- **Caption** (optional): small text showing the current location name

### 3. Client-Side Mapping Script

A `<script>` block in EcosystemSection that:

1. Defines a mapping from location names to image URLs
2. Finds the map container via `data-map-instance`
3. Finds the image element
4. Listens for `markerclick` events
5. On event: cross-fade to the new image (fade out → swap src → fade in)
6. On init: sets default image to APU Main Campus

### 4. Placeholder Image Mapping

Following the existing project convention (`picsum.photos/seed/{name}/width/height`):

| Location | Placeholder URL |
|----------|----------------|
| APU Main Campus | `https://picsum.photos/seed/apu-campus/600/400` |
| SCCR | `https://picsum.photos/seed/sccr-building/600/400` |
| Karenina Resort | `https://picsum.photos/seed/karenina-resort/600/400` |
| Dermanina | `https://picsum.photos/seed/dermanina/600/400` |
| Agung Farm | `https://picsum.photos/seed/agung-farm/600/400` |
| Sains De Resto | `https://picsum.photos/seed/sains-resto/600/400` |

## Data Flow

1. **Page load**: EcosystemSection script initializes, sets default APU image
2. **User clicks a marker**: LeafletMap's internal click handler fires
3. **Event dispatch**: `markerclick` CustomEvent bubbles from the map container
4. **Event capture**: EcosystemSection script receives the event, reads `event.detail.label`
5. **Image lookup**: Script looks up the label in the URL mapping
6. **Transition**: Image opacity fades to 0, src swaps, opacity fades back to 1
7. **Alt update**: `alt` attribute updates to "[Location Name] — APU Ecosystem"

## Error Handling

- **Unknown marker label**: Fallback to APU Main Campus image (the default)
- **Image fails to load**: CSS `background-color` on the container shows a subtle placeholder color; no JS error
- **Map not initialized yet**: Event listener attaches after DOM ready; map initialization is synchronous in the script, so race conditions are unlikely
- **Missing event detail**: If `event.detail` is undefined, ignore and keep current image

## Visual Design Details

### Image Container
- Aspect ratio: `aspect-[16/10]` (or `aspect-video` if preferred)
- Rounded corners: match card radius (`--apu-radius-card`)
- Border: subtle `1px` border using `--apu-border`
- Overflow: hidden
- Background: subtle gradient or solid surface color while loading

### Transition
- Duration: `300ms`
- Easing: `ease-in-out`
- Property: `opacity`
- Technique: fade out → swap → fade in (using a small timeout or transitionend event)

### Active State Feedback (Optional Enhancement)
- When a marker is selected, its pin could scale up or gain a glow ring
- This would require LeafletMap to also toggle a CSS class on the clicked marker
- **Decision**: Skip for now to keep scope minimal; can be added later

## Testing Strategy

1. **Manual click test**: Click each of the 6 markers and verify the image changes correctly
2. **Default state test**: Refresh page, verify APU image shows before any clicks
3. **Rapid click test**: Click multiple markers quickly; transitions should not glitch or get stuck
4. **Mobile test**: Tap markers on touch devices; event should fire correctly
5. **Accessibility test**: Screen reader should announce the updated alt text when image changes

## Open Questions

None — design is complete and ready for implementation.

## Files to Modify

1. `src/components/LeafletMap.astro` — add marker click event dispatch
2. `src/sections/EcosystemSection.astro` — add image element, mapping script, and styles
