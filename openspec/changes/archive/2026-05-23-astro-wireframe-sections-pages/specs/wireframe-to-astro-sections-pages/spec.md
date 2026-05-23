## ADDED Requirements

### Requirement: Wireframe sections SHALL be implemented as reusable Astro sections
The system SHALL implement each approved wireframe block as reusable Astro section components under `src/sections/**`, preserving section boundaries and content hierarchy from the wireframe.

#### Scenario: Section components are available for composition
- **WHEN** developers inspect the implementation for the wireframe scope
- **THEN** each mapped wireframe block SHALL exist as a dedicated Astro section component that can be composed by pages

### Requirement: Wireframe page flows SHALL render as navigable Astro pages
The system SHALL provide Astro pages under `src/pages/**` that compose the implemented sections into complete, renderable page flows aligned with the researched wireframe.

#### Scenario: Full page flow renders from sections
- **WHEN** a user opens the implemented route for the wireframe flow
- **THEN** the page SHALL render the expected sequence of sections without runtime rendering failures

### Requirement: Section implementation SHALL follow APU design primitives and accessibility baseline
The system SHALL implement new sections using existing APU design primitives and tokens first (`apu-*`, SectionHeader, CtaButton, typography/layout utilities), and SHALL preserve keyboard focus visibility plus readable contrast.

#### Scenario: New section uses approved primitives
- **WHEN** a new wireframe-based section is reviewed in code
- **THEN** the section SHALL prefer existing APU primitives/tokens and SHALL include accessible focus/interaction states for keyboard users

### Requirement: Incomplete wireframe content SHALL use non-breaking placeholder states
The system SHALL represent unresolved content blocks with explicit placeholder states (for example “Segera Hadir”) that do not break layout, routing, or user interaction flow.

#### Scenario: Placeholder block is displayed safely
- **WHEN** a user reaches a section whose final content is not yet ready
- **THEN** the UI SHALL show a clear placeholder state and SHALL continue functioning without errors
