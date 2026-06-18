# Background Blobs Component — Design Spec

## Goal

Replace the existing CSS-only `motion-aurora-shell` background system with a reusable Astro component that renders navy and orange blurred blobs. Every page refresh must produce different blob positions. Each section instance on the same page must look different. A dark variant (navy surface as the main color) must be available via a code-level parameter.

## Decision Log

| Decision | Value | Rationale |
|---|---|---|
| Approach | **A — Reusable SVG Blob Component** | Clean migration, no new deps, SSR-friendly, easy per-section seed prop. |
| Blob behavior | Static random positions on load | Requested by user; lighter than drift/morph. |
| Blobs per section | 8 | Requested by user. |
| Theme toggle | Code-level parameter, **not user-facing** | Requested by user. |
| Reduced motion | Ignore `prefers-reduced-motion` | Project AGENTS.md explicitly requires animation everywhere. |

## Component API

```astro
---
export interface Props {
  /** Per-section seed so each instance randomizes differently. */
  seed?: string;
  /** Number of blobs rendered. Default 8. */
  blobCount?: number;
  /** Backdrop blur amount in px. Default 40. */
  blur?: number;
  /** Base blob layer opacity. Default 0.5. */
  opacity?: number;
  /** Theme variant. `auto` follows parent, `dark` forces navy surface. */
  theme?: "light" | "dark" | "auto";
}
const { seed = "default", blobCount = 8, blur = 40, opacity = 0.5, theme = "auto" } = Astro.props;
---
```

## Color System

### Light (default)

- Surface: `--apu-surface` (`#f7faf3`)
- Blob colors: `--apu-navy` (`#132842`) and `--apu-accent` (`#fcbc55`)
- Text on top uses existing `--apu-text` tokens.

### Dark (code-level `theme="dark"`)

- Surface: `--apu-navy` (`#132842`)
- Blob colors: a lighter navy (`#1e3a5f`) and `--apu-accent` (`#fcbc55`) to keep contrast against the dark surface.
- Text on top uses `--apu-surface` / `--apu-surface-alt`.

Dark mode is **not** a global user toggle. It is selected per section or per page via the component prop / a data attribute. Global CSS variables are overridden inside `.apu-blobs[data-theme="dark"]`.

When `theme="dark"` is used, the consuming section should also set light text colors (e.g., `text-[rgb(var(--apu-surface))]`) because the background surface becomes navy. The `BackgroundBlobs` component intentionally only controls the background layer; it does not force text colors, since sections may use glass cards, images, or other elements that need their own color treatment.

## Randomization Strategy

1. The component renders an SVG with a fixed number of `<circle>`/`<ellipse>` elements in the markup.
2. A small inline script runs on the client after DOM ready.
3. The script reads `data-seed`, hashes it into a deterministic numeric seed, then uses a simple LCG to generate pseudo-random values for each blob:
   - `cx`, `cy` as percentage of the SVG viewBox (with padding so blobs extend past edges)
   - `r` radius between two configured bounds
   - `fill` alternating navy and orange
   - optional `opacity` jitter
4. Because each section passes a different `seed`, the same page load produces different layouts per section. Because the LCG also incorporates `performance.now()` or `Math.random()` on the client, refreshing the page changes positions.

## Accessibility / Readability

- A large blur (`blur(40px)` or higher) is applied to the SVG container so text remains readable.
- Blobs stay behind content via `z-index: -1` and `position: absolute; inset: 0`.
- No random colors outside navy/orange; contrast is handled by the blur and the limited palette.
- Reduced-motion is intentionally ignored per project AGENTS.md.

## Migration Plan

1. Add blob base styles and dark variant to `src/styles/global.css`.
2. Create `src/components/BackgroundBlobs.astro`.
3. Update each section that currently uses `motion-aurora-shell` to use `apu-section-shell` + `<BackgroundBlobs seed="section-name" />`.
4. Remove `motion-aurora-shell`, `motion-aurora-shell--*`, and related aurora/grid keyframes from `global.css`.
5. Verify pages still build and text remains readable over all sections.

## Files Changed

- `src/styles/global.css` — add `.apu-blobs` styles and dark variant; remove old aurora styles.
- `src/components/BackgroundBlobs.astro` — new component.
- `src/sections/**/*.astro` — replace `motion-aurora-shell` usage.

## Testing Notes

- Refresh the page several times; confirm blob positions change.
- Scroll through a page with multiple sections; confirm each section has a distinct blob layout.
- Set `theme="dark"` on one section; confirm surface turns navy and blobs use the dark palette.
- Check that all section text is readable over the blurred blobs.
- Run `astro build` and `astro check` to verify no broken imports or styles.
