# Map Pin Reactive Image Implementation Plan

**Goal:** Add a reactive image to the EcosystemSection overlay panel that changes smoothly when map markers are clicked, using a CustomEvent bridge from LeafletMap.

**Architecture:** LeafletMap dispatches `markerclick` CustomEvents from its container element whenever a marker is clicked. EcosystemSection listens for this event on the map container and cross-fades the image src/alt based on a location-to-URL mapping. Default image is APU Main Campus.

**Design:** [thoughts/shared/designs/2026-06-11-map-pin-reactive-image-design.md](thoughts/shared/designs/2026-06-11-map-pin-reactive-image-design.md)

---

## Dependency Graph

```
Batch 1 (parallel): 1.1, 1.2 [no file-level dependencies - can run simultaneously]
```

Both tasks modify independent files. The runtime coupling is via the `markerclick` CustomEvent, which will be verified together after both tasks are complete.

---

## Batch 1: Core Changes (parallel - 2 implementers)

All tasks in this batch have NO file import dependencies and run simultaneously.

---

### Task 1.1: LeafletMap — Add `markerclick` CustomEvent Dispatch

**File:** `src/components/LeafletMap.astro`
**Test:** Manual verification (see below)
**Depends:** none

**Change:** Inside `initMultiMarkerMap`, in the `data.markers.forEach` loop, add a `click` event handler to each Leaflet marker that dispatches a `markerclick` CustomEvent on the map container element.

**Exact edit location:** Lines 220–233 in `src/components/LeafletMap.astro` (the `data.markers.forEach` loop).

**What to add:** After the popup is bound (`m.bindPopup(...)`), add:

```typescript
m.on("click", () => {
  container.dispatchEvent(
    new CustomEvent("markerclick", {
      detail: { label: marker.label },
      bubbles: true,
    })
  );
});
```

**Why `bubbles: true`:** The EcosystemSection script will listen on a parent element (or the document) so the event can propagate up from the map container.

**Important:** Do NOT remove or modify any existing popup behavior, route animation, icon creation, or `fitBounds` logic. Only add the click handler.

**Verification:**
1. Open the page in a browser.
2. Open DevTools Console.
3. Run this snippet in the console:
   ```js
   document.addEventListener('markerclick', (e) => console.log('markerclick:', e.detail));
   ```
4. Click each of the 6 map pins.
5. Expected: console logs `markerclick: {label: "APU Main Campus"}` (and similar for the other 5 locations).

**Commit:** `feat(map): dispatch markerclick CustomEvent on pin click`

---

### Task 1.2: EcosystemSection — Add Reactive Image + Listener Script

**File:** `src/sections/EcosystemSection.astro`
**Test:** Manual verification (see below)
**Depends:** none

**Changes:** Three edits in this file:

#### Edit A: Replace the `<!-- insert image here -->` comment with a reactive image wrapper (around line 87)

Replace:
```astro
          <!-- insert image here -->
```

With:
```astro
          <!-- Reactive location image -->
          <div
            class="ecosystem-image-wrapper aspect-[16/10] w-full overflow-hidden rounded-[var(--apu-radius-card)] border border-[var(--apu-border)] bg-[var(--apu-surface-soft)] relative isolate"
          >
            <img
              id="ecosystem-location-image"
              src="https://picsum.photos/seed/apu-campus/600/400"
              alt="APU Main Campus — APU Ecosystem"
              class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-in-out"
              loading="eager"
              decoding="async"
            />
            <span
              id="ecosystem-location-caption"
              class="absolute bottom-0 left-0 right-0 px-4 py-2 text-caption font-medium text-white bg-gradient-to-t from-black/60 to-transparent"
            >
              APU Main Campus
            </span>
          </div>
```

**Design decisions made here:**
- Aspect ratio `16/10` as specified in the design document.
- Border radius uses the existing design token `--apu-radius-card`.
- Border color uses `--apu-border` token.
- Background color uses `--apu-surface-soft` to show a subtle placeholder while the image loads.
- Caption is optional but included per design section 2 (shows current location name).
- Image uses `absolute inset-0` + `object-cover` to fill the aspect-ratio container without layout shift.
- `loading="eager"` because this image is above the fold inside the hero-like overlay.

#### Edit B: Add a `<script>` block at the bottom of the file (after the existing `<style>` block, around line 132)

Append this client-side script:

```astro
<script>
  (function () {
    const IMAGE_MAP: Record<string, { url: string; name: string }> = {
      "APU Main Campus": {
        url: "https://picsum.photos/seed/apu-campus/600/400",
        name: "APU Main Campus",
      },
      SCCR: {
        url: "https://picsum.photos/seed/sccr-building/600/400",
        name: "SCCR",
      },
      "Karenina Resort": {
        url: "https://picsum.photos/seed/karenina-resort/600/400",
        name: "Karenina Resort",
      },
      Dermanina: {
        url: "https://picsum.photos/seed/dermanina/600/400",
        name: "Dermanina",
      },
      "Agung Farm": {
        url: "https://picsum.photos/seed/agung-farm/600/400",
        name: "Agung Farm",
      },
      "Sains De Resto": {
        url: "https://picsum.photos/seed/sains-resto/600/400",
        name: "Sains De Resto",
      },
    };

    const DEFAULT_KEY = "APU Main Campus";
    const TRANSITION_DURATION = 300; // matches CSS transition-duration

    function initReactiveImage() {
      const mapContainer = document.querySelector<HTMLElement>("[data-map-instance]");
      const img = document.getElementById("ecosystem-location-image") as HTMLImageElement | null;
      const caption = document.getElementById("ecosystem-location-caption") as HTMLSpanElement | null;

      if (!mapContainer || !img) return;

      function setImage(label: string) {
        const entry = IMAGE_MAP[label] || IMAGE_MAP[DEFAULT_KEY];
        if (!entry) return;

        // Cross-fade: fade out → swap src/alt → fade in
        img.style.opacity = "0";

        setTimeout(() => {
          img.src = entry.url;
          img.alt = `${entry.name} — APU Ecosystem`;
          if (caption) {
            caption.textContent = entry.name;
          }
          img.style.opacity = "1";
        }, TRANSITION_DURATION);
      }

      mapContainer.addEventListener("markerclick", (event: Event) => {
        const customEvent = event as CustomEvent<{ label?: string }>;
        const label = customEvent.detail?.label;
        if (!label) return;
        setImage(label);
      });

      // Set default on init (already in markup, but this guards against dynamic re-init)
      setImage(DEFAULT_KEY);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initReactiveImage);
    } else {
      initReactiveImage();
    }
  })();
</script>
```

**Key implementation details:**
- The IIFE keeps variables out of global scope.
- `TRANSITION_DURATION` (300ms) must match the CSS `duration-300` class on the image.
- Unknown labels fall back to `DEFAULT_KEY` (APU Main Campus).
- If `event.detail` is missing/undefined, the handler returns early and keeps the current image.
- The listener attaches to `mapContainer` (the element with `[data-map-instance]`), which is the same element that dispatches the event. Since `bubbles: true` is set, this works. Alternatively, if the map is deeply nested, the event will bubble up to any ancestor listener; but listening on the map container itself is simplest and most reliable.

**Verification:**
1. Open the page in a browser.
2. Verify on load: the image shows a `picsum.photos` image with seed `apu-campus`, caption reads "APU Main Campus", and alt reads "APU Main Campus — APU Ecosystem".
3. Click the "SCCR" pin on the map.
4. Expected: the image fades out over 300ms, then the new image (seed `sccr-building`) fades in, caption changes to "SCCR", and alt changes to "SCCR — APU Ecosystem".
5. Repeat for all 6 pins. Each should show the correct seed and caption.
6. Rapid-click test: click two pins in quick succession (<300ms apart). The transition should complete for the last-clicked pin without getting stuck at opacity 0.
7. Mobile test: open in mobile viewport or device emulation, tap pins, verify the same behavior.
8. Accessibility check: use a screen reader (or inspect the DOM) to confirm the `alt` attribute updates after each click.

**Commit:** `feat(ecosystem): add reactive image that responds to map pin clicks`

---

## Placeholder Image URLs (Summary)

| Location | Placeholder URL |
|----------|----------------|
| APU Main Campus | `https://picsum.photos/seed/apu-campus/600/400` |
| SCCR | `https://picsum.photos/seed/sccr-building/600/400` |
| Karenina Resort | `https://picsum.photos/seed/karenina-resort/600/400` |
| Dermanina | `https://picsum.photos/seed/dermanina/600/400` |
| Agung Farm | `https://picsum.photos/seed/agung-farm/600/400` |
| Sains De Resto | `https://picsum.photos/seed/sains-resto/600/400` |

---

## CSS Transition Details

- **Property:** `opacity`
- **Duration:** `300ms`
- **Easing:** `ease-in-out`
- **Technique:** JavaScript sets `opacity: 0`, waits 300ms, swaps `src`/`alt`, then sets `opacity: 1`. The browser interpolates both fades via CSS.
- **Fallback:** The wrapper has `bg-[var(--apu-surface-soft)]` so if an image fails to load, a subtle surface color is visible instead of a broken-image look.

---

## Event Handling Specifics

- **Event name:** `markerclick`
- **Event detail:** `{ label: marker.label }`
- **Dispatched from:** the map container element (`container` in `initMultiMarkerMap`)
- **Bubbles:** `true`
- **Listened on:** `document.querySelector("[data-map-instance]")` in EcosystemSection
- **Race condition safety:** The EcosystemSection script runs on `DOMContentLoaded` (or immediately if DOM is already ready), and the LeafletMap script also initializes on `DOMContentLoaded`. Since both are in the same document and Leaflet marker clicks are user-initiated (always after initialization), there is no race.

---

## Rollback / Safety Notes

- If the reactive image needs to be disabled quickly, comment out or remove the `<script>` block in `EcosystemSection.astro` and the image wrapper markup. The map and existing popup behavior will continue working.
- The `markerclick` event dispatch in `LeafletMap.astro` is harmless if no listener is present; it is a no-op overhead of one event dispatch per click.
- No props or component APIs were changed, so all existing usages of `<LeafletMap>` remain unaffected.
