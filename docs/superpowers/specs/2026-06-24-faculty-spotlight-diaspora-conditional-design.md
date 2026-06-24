# Faculty Spotlight — Conditional Diaspora Featured Card

## Goal

When a user selects a lecturer in `ProgramFacultySpotlightSection.astro`, if that lecturer's `id` exists in `src/data/diaspora.ts`, replace the **featured-card area** at the top of the section with the diaspora researcher layout from `DiasporaDetailsSection.astro`. The bottom lecturers-list carousel must stay unchanged. Selecting a non-diaspora lecturer reverts the featured card to the standard layout.

## Clarified behavior

- Keep the original section header (`Meet Our Expert Lecturers`) visible at all times.
- Only the featured-card area swaps between the standard lecturer card and the diaspora researcher card.
- Initial page load uses the diaspora layout if `members[0]` is a diaspora ID.
- Selecting a non-diaspora lecturer reverts to the standard layout.
- Carousel, keyboard navigation, hash routing, and scroll controls remain unchanged.

## Architecture

### New component: `src/components/DiasporaFeaturedCard.astro`

- **Props**
  - `person: DiasporaPerson` — the diaspora person to render.
  - `class?: string` — optional extra classes for the wrapper.
- **Responsibilities**
  - Render only the featured-researcher glass card markup:
    - background image
    - country flag
    - name, role, university
    - Past Experience list
    - Notable Research text
    - Google Scholar profile link
    - portrait image with object-position
  - No client script; the parent section owns dynamic updates.

### Updated: `src/sections/DiasporaDetailsSection.astro`

- Import and render `<DiasporaFeaturedCard person={featuredLecturer} />` in place of the existing inline featured-researcher block.
- Keep its own lecturers carousel and inline script untouched.

### Updated: `src/sections/academic/program/ProgramFacultySpotlightSection.astro`

- Imports
  - `DiasporaFeaturedCard` from `@components/DiasporaFeaturedCard.astro`
  - `people` from `@data/diaspora`
- Build a client-side diaspora ID lookup (e.g. `Set<string>`) from the imported data.
- Server-render both featured variants inside `.lecturers-featured-card`:
  - Standard featured card (existing markup) — visible by default when `members[0]` is not a diaspora ID.
  - Diaspora featured card (`<DiasporaFeaturedCard person={initialDiasporaPerson} />`) — visible by default when `members[0]` is a diaspora ID.
- The existing `SectionHeader` remains before the featured card.
- The existing carousel markup and script are unchanged.

### Client script update

- Extend the existing inline script inside `ProgramFacultySpotlightSection.astro`.
- On carousel card click/keyboard selection:
  1. Look up the selected member ID in the diaspora set.
  2. If diaspora:
     - Hide the standard featured-card inner wrapper.
     - Show the diaspora featured-card inner wrapper.
     - Update diaspora DOM fields (`data-featured-name`, `data-featured-role`, `data-featured-univ`, `data-featured-past-experience`, `data-featured-notable-research`, `data-featured-image`, `data-featured-flag`, `data-featured-background`, `data-featured-profile`) from the matched diaspora person.
  3. If not diaspora:
     - Show the standard featured-card inner wrapper.
     - Hide the diaspora featured-card inner wrapper.
     - Run the existing `updateFeatured` logic.
- Hash routing (`#dosen-spotlight-<id>`) follows the same branch.

## Data contracts

- `src/data/diaspora.ts` and `src/data/program-faculty.ts` share lecturer IDs for diaspora members.
- No changes to either data file.
- No new data file needed.

## Error handling

- If a selected ID is not found in either dataset, do nothing (defensive guard).
- If a diaspora person lacks `background_image`, fall back to the default diaspora background image already used in `DiasporaDetailsSection.astro`.

## Testing / verification

1. Build the project successfully (`bun run build` or equivalent).
2. Open a program page that contains diaspora lecturers (e.g., biomedical).
3. Click a diaspora lecturer → diaspora featured card appears, standard card hides.
4. Click a non-diaspora lecturer → standard featured card returns, diaspora card hides.
5. Use keyboard (Enter/Space) on carousel items → same behavior.
6. Visit `#dosen-spotlight-<diaspora-id>` → diaspora layout renders for that ID.
7. Confirm carousel scroll buttons and drag still work.
8. Confirm no console errors.

## Scope

- Only `src/components/DiasporaFeaturedCard.astro` (new), `src/sections/DiasporaDetailsSection.astro`, and `src/sections/academic/program/ProgramFacultySpotlightSection.astro` are modified.
- No visual changes to the diaspora layout itself.
- No changes to program data or diaspora data.
