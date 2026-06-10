# In-Place Section Transition: Anchor Campus → Campus Locations

**Goal:** Implement a premium CSS-grid overlay transition where clicking "Lihat Ekosistem SCCR" in `AnchorCampusSectionAPU` smoothly crossfades to `EcosystemSection` at the exact same page position, with zero layout shift and full accessibility support.

**Architecture:** CSS grid single-area stacking with `opacity`/`visibility` transitions, guarded by a vanilla JS IIFE for state management, focus handling, and reduced-motion respect.

**Design:** [thoughts/shared/designs/2026-06-10-anchor-campus-to-locations-transition-design.md](thoughts/shared/designs/2026-06-10-anchor-campus-to-locations-transition-design.md)

---

## Dependency Graph

```
Batch 1 (parallel): 1.1, 1.2 [foundation — no deps]
  1.1  Add ecosystem transition CSS to global.css
  1.2  Add ecosystem-trigger class to AnchorCampusSectionAPU.astro

Batch 2 (sequential): 2.1 [integration — depends on 1.1, 1.2]
  2.1  Restructure index.astro with grid wrapper + transition script
```

---

## Batch 1: Foundation (parallel — 2 implementers)

All tasks in this batch have **no dependencies** and run simultaneously.

---

### Task 1.1: Add Ecosystem Stage CSS
**File:** `src/styles/global.css`
**Test:** Manual visual test (see Testing Steps below)
**Depends:** none

#### What
Append the ecosystem stage + panel transition styles to the end of `src/styles/global.css`, after the `@layer components` block.

#### Why here
These are page-specific transition styles, not generic reusable primitives, so they live outside the `@layer components` block. The `@media (prefers-reduced-motion: reduce)` rule is mandatory per the design's accessibility constraints.

#### Exact change
**Location:** End of file — after the final closing `}` of `@layer components` (after line 1277).

**Add the following block:**

```css
/* ============================================
   ECOSYSTEM STAGE — Anchor ↔ Locations transition
   ============================================ */

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

**Verify:** Open the page, confirm `.ecosystem-stage` applies `display: grid` via DevTools.

**Commit:** `feat(transition): add ecosystem stage CSS with reduced-motion support`

---

### Task 1.2: Add Trigger Class to Anchor Campus Button
**File:** `src/sections/AnchorCampusSectionAPU.astro`
**Test:** Manual DOM test (see Testing Steps below)
**Depends:** none

#### What
Add `class="ecosystem-trigger"` to the tertiary CtaButton so the JS selector can find it. Keep `href="#jalur-masuk"` as the no-JS fallback.

#### Exact change
**Location:** Lines 63–65 of `src/sections/AnchorCampusSectionAPU.astro`.

**Current:**
```astro
            <CtaButton href="#jalur-masuk" variant="tertiary">
                Lihat Ekosistem SCCR
            </CtaButton>
```

**Replace with:**
```astro
            <CtaButton href="#jalur-masuk" variant="tertiary" class="ecosystem-trigger">
                Lihat Ekosistem SCCR
            </CtaButton>
```

**Note:** `CtaButton` already accepts and merges a `class` prop (see `src/components/CtaButton.astro` line 19 & 33), so the `ecosystem-trigger` class will be appended to the existing `apu-btn apu-btn--tertiary` classes.

**Verify:** Build the project, inspect the rendered button, confirm the class list includes `ecosystem-trigger`.

**Commit:** `feat(transition): add ecosystem-trigger class to anchor campus CTA`

---

## Batch 2: Integration (depends on 1.1, 1.2)

This task restructures `src/pages/index.astro` to wrap both sections in the grid container, removes the standalone `EcosystemSection`, and adds the transition script. It depends on Batch 1 because the CSS classes (`ecosystem-stage`, `ecosystem-panel`, `ecosystem-panel--hidden`) and the JS selector (`.ecosystem-trigger`) must exist before this renders correctly.

---

### Task 2.1: Restructure index.astro with Grid Wrapper + Script
**File:** `src/pages/index.astro`
**Test:** Full manual QA (see Testing Steps below)
**Depends:** 1.1, 1.2

#### What
1. Wrap `<AnchorCampusSectionAPU />` and `<EcosystemSection />` inside `.ecosystem-stage` with panel wrappers.
2. Remove the standalone `<EcosystemSection />` from its current position after `<MessageFromLeadershipAstroComponent variant='light'/>`.
3. Add an inline `<script is:inline>` IIFE that handles the click, transition, accessibility attributes, and focus management.

#### Exact changes

**Step A — Replace the standalone `<AnchorCampusSectionAPU />` with the wrapped version**

**Location:** Lines 19–21 of `src/pages/index.astro`.

**Current:**
```astro
        <HeroSectionAPU />
        <AnchorCampusSectionAPU />
        <!-- <AnchorEcosystemSectionAPU /> -->
```

**Replace with:**
```astro
        <HeroSectionAPU />
        <div class="ecosystem-stage">
            <div id="ecosystem-anchor" class="ecosystem-panel">
                <AnchorCampusSectionAPU />
            </div>
            <div id="ecosystem-locations" class="ecosystem-panel ecosystem-panel--hidden" aria-hidden="true" inert>
                <EcosystemSection />
            </div>
        </div>
        <!-- <AnchorEcosystemSectionAPU /> -->
```

**Step B — Remove the standalone EcosystemSection**

**Location:** Lines 24–25 of `src/pages/index.astro`.

**Current:**
```astro
        <MessageFromLeadershipAstroComponent variant='light'/>
        <EcosystemSection />
        <!-- <RequirementsSection /> -->
```

**Replace with:**
```astro
        <MessageFromLeadershipAstroComponent variant='light'/>
        <!-- EcosystemSection moved into ecosystem stage above -->
        <!-- <RequirementsSection /> -->
```

**Step C — Add the transition script**

**Location:** After `</main>` and before `<Footer />` (insert between the current lines 28 and 29).

**Add this block:**
```astro
    <script is:inline>
    (function() {
        var isTransitioning = false;
        var anchorPanel = document.getElementById('ecosystem-anchor');
        var locationsPanel = document.getElementById('ecosystem-locations');
        var trigger = anchorPanel && anchorPanel.querySelector('.ecosystem-trigger');

        if (!trigger || !anchorPanel || !locationsPanel) return;

        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            if (isTransitioning) return;
            isTransitioning = true;

            var showingLocations = locationsPanel.classList.contains('ecosystem-panel--hidden');
            var panelToShow = showingLocations ? locationsPanel : anchorPanel;
            var panelToHide = showingLocations ? anchorPanel : locationsPanel;

            // Start CSS transition
            panelToShow.classList.remove('ecosystem-panel--hidden');
            panelToHide.classList.add('ecosystem-panel--hidden');

            // Wait for transition (600ms) then manage a11y + focus
            setTimeout(function() {
                if (showingLocations) {
                    anchorPanel.setAttribute('aria-hidden', 'true');
                    anchorPanel.setAttribute('inert', '');
                    locationsPanel.removeAttribute('aria-hidden');
                    locationsPanel.removeAttribute('inert');
                } else {
                    locationsPanel.setAttribute('aria-hidden', 'true');
                    locationsPanel.setAttribute('inert', '');
                    anchorPanel.removeAttribute('aria-hidden');
                    anchorPanel.removeAttribute('inert');
                }

                // Focus management: move focus to revealed panel's heading
                var heading = panelToShow.querySelector('h2');
                if (heading) {
                    var hadTabIndex = heading.hasAttribute('tabindex');
                    if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
                    heading.focus();
                    if (!hadTabIndex) heading.removeAttribute('tabindex');
                }

                isTransitioning = false;
            }, 600);
        });
    })();
    </script>
```

**Final expected structure of `src/pages/index.astro`:**
```astro
---
import MainLayout from "../layouts/MainLayout.astro";
import Footer from "../components/Footer.astro";
import NavigationAPU from "../components/NavigationAPU.astro";
import HeroSectionAPU from "../sections/HeroSectionAPU.astro";
import ProgramsSectionAPU from "../sections/ProgramsSectionAPU.astro";
import PathwaysSectionAPU from "../sections/PathwaysSectionAPU.astro";
import AnchorEcosystemSectionAPU from "../sections/AnchorEcosystemSectionAPU.astro";
import RequirementsSection from "../sections/RequirementsSection.astro";
import ContactSection from "../sections/ContactSection.astro";
import AnchorCampusSectionAPU from "../sections/AnchorCampusSectionAPU.astro";
import MessageFromLeadershipAstroComponent from "../sections/MessageFromLeadership.astro";
import EcosystemSection from "../sections/EcosystemSection.astro";
---

<MainLayout>
    <NavigationAPU />
    <main>
        <HeroSectionAPU />
        <div class="ecosystem-stage">
            <div id="ecosystem-anchor" class="ecosystem-panel">
                <AnchorCampusSectionAPU />
            </div>
            <div id="ecosystem-locations" class="ecosystem-panel ecosystem-panel--hidden" aria-hidden="true" inert>
                <EcosystemSection />
            </div>
        </div>
        <!-- <AnchorEcosystemSectionAPU /> -->
        <ProgramsSectionAPU />
        <PathwaysSectionAPU />
        <MessageFromLeadershipAstroComponent variant='light'/>
        <!-- EcosystemSection moved into ecosystem stage above -->
        <!-- <RequirementsSection /> -->
        <ContactSection />
    </main>
    <Footer />
    <script is:inline>
    (function() {
        var isTransitioning = false;
        var anchorPanel = document.getElementById('ecosystem-anchor');
        var locationsPanel = document.getElementById('ecosystem-locations');
        var trigger = anchorPanel && anchorPanel.querySelector('.ecosystem-trigger');

        if (!trigger || !anchorPanel || !locationsPanel) return;

        trigger.addEventListener('click', function(event) {
            event.preventDefault();
            if (isTransitioning) return;
            isTransitioning = true;

            var showingLocations = locationsPanel.classList.contains('ecosystem-panel--hidden');
            var panelToShow = showingLocations ? locationsPanel : anchorPanel;
            var panelToHide = showingLocations ? anchorPanel : locationsPanel;

            panelToShow.classList.remove('ecosystem-panel--hidden');
            panelToHide.classList.add('ecosystem-panel--hidden');

            setTimeout(function() {
                if (showingLocations) {
                    anchorPanel.setAttribute('aria-hidden', 'true');
                    anchorPanel.setAttribute('inert', '');
                    locationsPanel.removeAttribute('aria-hidden');
                    locationsPanel.removeAttribute('inert');
                } else {
                    locationsPanel.setAttribute('aria-hidden', 'true');
                    locationsPanel.setAttribute('inert', '');
                    anchorPanel.removeAttribute('aria-hidden');
                    anchorPanel.removeAttribute('inert');
                }

                var heading = panelToShow.querySelector('h2');
                if (heading) {
                    var hadTabIndex = heading.hasAttribute('tabindex');
                    if (!hadTabIndex) heading.setAttribute('tabindex', '-1');
                    heading.focus();
                    if (!hadTabIndex) heading.removeAttribute('tabindex');
                }

                isTransitioning = false;
            }, 600);
        });
    })();
    </script>
</MainLayout>
```

**Verify:** Build and serve the project. Click "Lihat Ekosistem SCCR" and confirm:
1. The anchor section fades out while the locations section fades in over 600ms.
2. No page scroll jump occurs.
3. The `#ecosystem-locations` panel is no longer `aria-hidden` after the transition.
4. Focus moves to the `<h2>` inside the revealed panel (visible focus ring).
5. Rapid double-clicking the button during transition does not cause glitches.

**Commit:** `feat(transition): wire up ecosystem stage wrapper and transition script`

---

## Testing Steps

### 1. Visual Regression
- [ ] Load the page. The anchor campus section is visible; locations section is hidden.
- [ ] Click "Lihat Ekosistem SCCR".
- [ ] Confirm a smooth 600ms crossfade. No flash, no jump.
- [ ] Confirm the locations section appears exactly where the anchor section was.

### 2. Layout Stability
- [ ] Open DevTools → Performance → enable "Screenshots".
- [ ] Record while clicking the button.
- [ ] Confirm zero layout shift (no CLS spike) during the transition.

### 3. Accessibility
- [ ] Tab through the page before clicking. Confirm all anchor section interactive elements are reachable.
- [ ] Click the button.
- [ ] Confirm focus lands on the newly revealed section's `<h2>` (check `document.activeElement`).
- [ ] Confirm `aria-hidden="true"` and `inert` are present on the hidden panel, and absent on the visible panel.
- [ ] Run axe-core (browser extension or `@axe-core/cli`) and confirm no violations.

### 4. Reduced Motion
- [ ] Enable OS-level "Reduce motion" (Windows: Settings → Accessibility → Visual Effects → Animation effects OFF).
- [ ] Reload the page and click the button.
- [ ] Confirm an instant swap with no transition.

### 5. No-JS Fallback
- [ ] Disable JavaScript in DevTools (Ctrl+Shift+P → "Disable JavaScript").
- [ ] Reload the page.
- [ ] Click "Lihat Ekosistem SCCR".
- [ ] Confirm the page scrolls to `#jalur-masuk` (pathways section) as a graceful fallback.

### 6. Mobile / Touch
- [ ] Open the page on a mobile device or emulate touch in DevTools.
- [ ] Tap the button.
- [ ] Confirm the same crossfade behavior.
- [ ] Confirm no horizontal scroll or zoom issues.

### 7. Double-click Guard
- [ ] Click the button rapidly 3 times in succession.
- [ ] Confirm the transition completes exactly once and ends in a stable state.

---

## Rollback Plan

If any critical issue is found:

1. Revert `src/pages/index.astro` to the original layout (remove wrapper, restore standalone `<EcosystemSection />`, remove script).
2. Revert `src/sections/AnchorCampusSectionAPU.astro` to remove `class="ecosystem-trigger"`.
3. Optionally revert `src/styles/global.css` to remove the ecosystem CSS block.

The sections will return to their original sequential layout with no transition.

---

## Notes for Implementers

- **No new dependencies.** This is vanilla JS + CSS only.
- **The `inert` attribute** is supported in all modern browsers. It removes the element and its descendants from the accessibility tree and prevents user interaction.
- **The 600ms timeout in JS** must match the CSS `transition` duration exactly. If you change one, change the other.
- **No changes are required** in `src/sections/EcosystemSection.astro` or `src/components/CtaButton.astro`. The design explicitly states these are untouched.
- **Z-index isolation:** Both panels occupy the same grid cell. Since the hidden panel uses `visibility: hidden`, it does not intercept pointer events. The visible panel's internal `z-[5]` content layers work normally.
