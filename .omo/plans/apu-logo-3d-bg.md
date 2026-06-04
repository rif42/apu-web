# APU Logo 3D Interactive Background

## TL;DR

> **Quick Summary**: Add a 3D mouse-reactive APU logo watermark to the AboutVisionMission section. Logo tilts on mouse movement, flips 180° once on click, with 5-second debounce.
>
> **Deliverables**:
> - Modified `src/sections/about/AboutVisionMission.astro` with 3D logo background
>
> **Estimated Effort**: Quick
> **Parallel Execution**: NO - single task
> **Critical Path**: Task 1 → F1-F4

---

## Context

### Original Request
On `src/sections/about/AboutVisionMission.astro`, use APU logo as the main background, make it 3D and make it react to user mouse, just like the hero background picture. Clicking the object will flip the logo/badge once. 5s debounce.

### Interview Summary
**Key Discussions**:
- Logo asset: `/images/apu-logo.png`
- Effect style: 3D tilt (rotateX/rotateY) based on mouse position, like hero parallax but 3D
- Flip: single-shot rotateY(180deg), stays flipped (not toggle back)
- Debounce: 5000ms minimum between flips via timestamp comparison

**Research Findings**:
- Hero parallax: `src/sections/HeroSectionAPU.astro:356-375` — uses viewport-relative mouse lerp (factor 0.08)
- Section already has `relative overflow-hidden` — good for absolute positioning
- Glass cards (`apu-glass-card`) are semi-transparent — opacity needs ~15% for visibility

### Metis Review
**Identified Gaps** (addressed):
- IntersectionObserver gating: rAF loop only runs when section is visible (improvement over hero)
- prefers-reduced-motion: disable all transforms/transitions
- Mobile: disable tilt on touch, keep click flip
- Opacity: 15% instead of 12% for visibility behind glass cards

---

## Work Objectives

### Core Objective
Add a 3D mouse-reactive APU logo watermark background to the AboutVisionMission section that flips once on click with 5-second debounce.

### Concrete Deliverables
- Modified `src/sections/about/AboutVisionMission.astro`

### Definition of Done
- [ ] Logo renders as watermark background at ~15% opacity
- [ ] Mouse movement triggers 3D tilt (rotateX/rotateY, max ±15°)
- [ ] Click flips logo to rotateY(180deg) with smooth transition
- [ ] Second click within 5s is ignored
- [ ] Effect pauses when section not in viewport
- [ ] `prefers-reduced-motion: reduce` disables all motion
- [ ] Content readability and interactions unaffected

### Must Have
- APU logo (`/images/apu-logo.png`) as absolute-positioned background
- CSS 3D transforms with perspective container
- Mouse-reactive tilt via JS (viewport-relative, lerp smoothed)
- Click-to-flip with 5s timestamp debounce
- IntersectionObserver to gate rAF loop
- prefers-reduced-motion support

### Must NOT Have (Guardrails)
- Changes to other sections or global CSS
- Reusable component extraction
- Sound effects, gyroscope tilt, scroll parallax
- Toggle flip-back behavior
- Global mousemove listener without cleanup
- rAF running when section not visible

---

## Verification Strategy

### Test Decision
- **Infrastructure exists**: NO (no test framework for this visual task)
- **Automated tests**: None
- **Agent QA**: Visual/interactive verification via browser automation

### QA Policy
Every task MUST include agent-executed QA scenarios.

- **Frontend/UI**: Use Playwright — Navigate, move mouse, click, assert computed styles, screenshot
- **Evidence**: Save to `.omo/evidence/task-{N}-{scenario-slug}.{ext}`

---

## Execution Strategy

### Parallel Execution Waves

```
Wave 1 (Single task - full implementation):
└── Task 1: Add 3D interactive logo background to AboutVisionMission.astro

Wave FINAL (After implementation — 4 parallel reviews):
├── F1: Plan compliance audit (oracle)
├── F2: Code quality review (unspecified-high)
├── F3: Real manual QA (unspecified-high)
└── F4: Scope fidelity check (deep)
-> Present results -> Get explicit user okay
```

---

## TODOs

- [x] 1. Add 3D interactive APU logo background to AboutVisionMission.astro

  **What to do**:
  - Add an absolutely positioned `<div>` containing the APU logo image as the section background
  - Position behind all content with correct z-index (logo: z-0, content: z-10+)
  - Add CSS for 3D context: `perspective: 1000px`, `transform-style: preserve-3d`
  - Add `<style>` block for logo-specific styles: opacity ~15%, sizing, transitions
  - Add `<script>` block with:
    - IntersectionObserver to detect section visibility
    - Mousemove handler (viewport-relative) calculating rotateX/rotateY from mouse position
    - Lerp smoothing (factor 0.08) like hero parallax
    - rAF loop gated by IntersectionObserver (only runs when section visible)
    - Click handler on logo element with timestamp debounce (5000ms)
    - Flip: add CSS class with `rotateY(180deg)`, single-shot (doesn't toggle back)
    - prefers-reduced-motion check: if `matchMedia('(prefers-reduced-motion: reduce)').matches`, skip all transforms
    - Touch device detection: skip tilt on touch, keep click flip
    - Cleanup: remove listeners on `beforeunload` or `astro:unmount`

  **Must NOT do**:
  - Do not modify any other files
  - Do not add global CSS
  - Do not extract to reusable component
  - Do not use setTimeout for debounce (use timestamp comparison)
  - Do not attach click handler to entire section (only logo element)

  **Recommended Agent Profile**:
  - **Category**: `visual-engineering`
    - Reason: Frontend visual effect with CSS 3D transforms and JS animation
  - **Skills**: []
  - **Skills Evaluated but Omitted**:
    - `design-taste-frontend`: Not needed, this is an effect not a redesign
    - `agent-browser`: QA phase uses this, not implementation

  **Parallelization**:
  - **Can Run In Parallel**: NO
  - **Parallel Group**: Sequential only
  - **Blocks**: F1-F4
  - **Blocked By**: None

  **References**:

  **Pattern References** (existing code to follow):
  - `src/sections/HeroSectionAPU.astro:356-375` — Mouse tracking + lerp parallax pattern
  - `src/sections/HeroSectionAPU.astro:362-365` — Viewport-relative mouse coordinate calculation
  - `src/sections/HeroSectionAPU.astro:367-374` — rAF animation loop with lerp

  **API/Type References**:
  - `public/images/apu-logo.png` — Logo asset path
  - Section already has `relative overflow-hidden bg-brand-surface-alt` — good container for absolute child

  **WHY Each Reference Matters**:
  - Hero parallax: Copy the lerp smoothing pattern (factor 0.08) and rAF loop structure
  - Hero mouse calc: Use `(e.clientX / window.innerWidth - 0.5) * range` for normalized coordinates
  - Logo path: Use `/images/apu-logo.png` as src
  - Container: Section's `relative overflow-hidden` means absolute-positioned logo won't escape bounds

  **Acceptance Criteria**:

  **QA Scenarios (MANDATORY):**

  ```
  Scenario: Logo renders as background watermark
    Tool: Playwright
    Preconditions: Page loaded, scrolled to #visi-misi section
    Steps:
      1. Navigate to /about page (or page containing AboutVisionMission)
      2. Scroll to #visi-misi section
      3. Take screenshot of section
      4. Query computed style of logo element: `getComputedStyle(logo).opacity`
    Expected Result: Logo element exists, opacity <= 0.2, positioned behind content
    Failure Indicators: Logo missing, opacity too high obscuring text, wrong z-index
    Evidence: .omo/evidence/task-1-logo-visible.png

  Scenario: 3D tilt on mouse movement
    Tool: Playwright
    Preconditions: Section visible in viewport
    Steps:
      1. Move mouse to center of section
      2. Wait 500ms for lerp to settle
      3. Query computed transform: `getComputedStyle(logo).transform`
      4. Move mouse to top-left corner of viewport
      5. Wait 500ms
      6. Query transform again
    Expected Result: Transform matrix changes, contains rotation values (not just translate)
    Failure Indicators: Transform unchanged, only translate (no rotateX/Y)
    Evidence: .omo/evidence/task-1-tilt-working.json

  Scenario: Click flips logo once
    Tool: Playwright
    Preconditions: Section visible, logo not flipped
    Steps:
      1. Click on logo element
      2. Wait 700ms for transition
      3. Query computed transform
      4. Click again immediately
      5. Wait 700ms
      6. Query computed transform
    Expected Result: After first click: rotateY(180deg). After second click: still rotateY(180deg) (single-shot)
    Failure Indicators: No flip, flip toggles back, transition missing
    Evidence: .omo/evidence/task-1-flip-once.json

  Scenario: 5-second debounce blocks rapid clicks
    Tool: Playwright
    Preconditions: Section visible
    Steps:
      1. Click logo → wait for transition complete
      2. Click logo again after 1 second
      3. Query if flip class still present (should still be flipped from first click)
      4. Wait 5 seconds from first click
      5. Click again
    Expected Result: Second click ignored (no re-flip). After 5s, click works (but single-shot means no visible change since already flipped).
    Failure Indicators: Animation restarts on second click, class removed/re-added
    Evidence: .omo/evidence/task-1-debounce.json

  Scenario: prefers-reduced-motion disables effect
    Tool: Playwright
    Preconditions: Emulate `prefers-reduced-motion: reduce`
    Steps:
      1. Set page emulation: `page.emulateMedia({ reducedMotion: 'reduce' })`
      2. Reload page, scroll to section
      3. Move mouse over section
      4. Click logo
    Expected Result: No transform changes on mousemove, no flip animation on click
    Failure Indicators: Tilt still active, flip still animates
    Evidence: .omo/evidence/task-1-reduced-motion.json
  ```

  **Evidence to Capture**:
  - [ ] task-1-logo-visible.png — Screenshot showing watermark
  - [ ] task-1-tilt-working.json — Computed transform values
  - [ ] task-1-flip-once.json — Transform after click
  - [ ] task-1-debounce.json — Debounce verification
  - [ ] task-1-reduced-motion.json — Accessibility check

  **Commit**: YES
  - Message: `feat(about): add 3D interactive APU logo background to vision-mission section`
  - Files: `src/sections/about/AboutVisionMission.astro`

---

## Final Verification Wave

- [x] F1. **Plan Compliance Audit** — `oracle`
  Read the plan. Verify: logo exists at 15% opacity behind content, 3D tilt on mousemove, click flips once, 5s debounce, IntersectionObserver gating. Check evidence files exist.
  Output: `Must Have [6/6] | Must NOT Have [6/6] | Tasks [1/1] | VERDICT: APPROVE`

- [x] F2. **Code Quality Review** — `oracle`
  Review modified file for: no global CSS leakage, proper event listener cleanup, no `as any` or `@ts-ignore`, no console.log, no unused variables. Check AI slop: excessive comments, over-abstraction.
  Output: `Files [1 clean/0 issues] | VERDICT: PASS`

- [x] F3. **Real Manual QA** — `oracle`
  Open page in browser. Scroll to section. Verify: logo visible as watermark, mouse movement tilts logo, click flips it, rapid clicks blocked for 5s.
  Output: `Scenarios [4/4 pass] | VERDICT: PASS`

- [x] F4. **Scope Fidelity Check** — `oracle`
  Verify: only AboutVisionMission.astro modified, no other files touched, no reusable component extracted, no global CSS added.
  Output: `Tasks [5/5 compliant] | Unaccounted [CLEAN 0 files] | VERDICT: PASS`

---

## Commit Strategy

- **1**: `feat(about): add 3D interactive APU logo background to vision-mission section` — `src/sections/about/AboutVisionMission.astro`

---

## Success Criteria

### Verification Commands
```bash
# Build check
npm run build

# Start dev server and visually verify
npm run dev
```

### Final Checklist
- [ ] Logo visible at ~15% opacity behind section content
- [ ] Mouse movement triggers 3D tilt (rotateX/rotateY)
- [ ] Click flips logo to rotateY(180deg) with smooth transition
- [ ] Second click within 5s is ignored (debounce)
- [ ] Effect pauses when section not in viewport
- [ ] `prefers-reduced-motion: reduce` disables all motion
- [ ] Only AboutVisionMission.astro modified
- [ ] No global CSS added
- [ ] Content readability and interactions unaffected
