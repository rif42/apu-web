# Centralize ProgramMsgFromHead Astro Component

## Summary
Convert `src/sections/academic/program/ProgramMsgFromHead.astro` into a reusable component that receives its content via a `data` prop. Remove the per-program wrapper sections (`BiotechnologyProgramMsgFromHead.astro`, `CommunicationProgramMsgFromHead.astro`, etc.) and update each academic page to pass its own leadership message.

## Current State
- `ProgramMsgFromHead.astro` hardcodes `import { leadershipMessage } from "@data/academic-programs"` (biomedical data).
- Every other program has an identical copy: `BiotechnologyProgramMsgFromHead.astro`, `CommunicationProgramMsgFromHead.astro`, `LawProgramMsgFromHead.astro`, `ManagementProgramMsgFromHead.astro`, `MidwiferyAssociateProgramMsgFromHead.astro`, `MidwiferyBachelorProgramMsgFromHead.astro`.
- Each wrapper only changes the imported data file.

## Chosen Approach: Data Prop
Pages import their program-specific `LeadershipMessage` and pass it to the shared component.

### Why
- Explicit: the page owns its data.
- No coupling: the section component does not know about every program.
- Minimal migration: existing per-program data files remain unchanged.

### Alternatives Considered
- **Slug lookup**: pages pass `program="biotechnology"` and the component selects data from a central map. Rejected because it forces the component to import all program data files.
- **Content collection**: store messages as Astro content entries. Rejected as overkill for 7 static messages.

## Design Details

### Component Props
```ts
import { leadershipMessage } from "@data/academic-programs";
import type { LeadershipMessage } from "@data/leadership";

interface Props {
  variant?: "dark" | "light";
  data?: LeadershipMessage;
}

const { variant = "dark", data = leadershipMessage } = Astro.props;
```

- `data` is optional.
- Fallback to the existing biomedical `leadershipMessage` keeps `src/pages/academic/biomedical.astro` working without changes.
- All markup references change from `leadershipMessage.*` to `data.*`.

### Page Migration Example
`src/pages/academic/biotechnology.astro`:
```astro
---
import { leadershipMessage } from "@data/biotechnology-academic-programs";
import ProgramMsgFromHead from "@sections/academic/program/ProgramMsgFromHead.astro";
---

<ProgramMsgFromHead variant="light" data={leadershipMessage} />
```

### Files to Delete
- `src/sections/academic/program/BiotechnologyProgramMsgFromHead.astro`
- `src/sections/academic/program/CommunicationProgramMsgFromHead.astro`
- `src/sections/academic/program/LawProgramMsgFromHead.astro`
- `src/sections/academic/program/ManagementProgramMsgFromHead.astro`
- `src/sections/academic/program/MidwiferyAssociateProgramMsgFromHead.astro`
- `src/sections/academic/program/MidwiferyBachelorProgramMsgFromHead.astro`

## Risks & Mitigations
- **Duplicate DOM IDs**: the component uses `id="leadership-particles"`. Only one instance exists per academic page today, so this is safe. If multiple instances are ever needed, generate the ID from a slug prop.
- **Type import path**: `LeadershipMessage` is exported from `@data/leadership`. Keep importing the type from there or move it to `src/types/` if preferred later.

## Verification
- Run `bun run build` (or project build command) to confirm no import/type errors.
- Visually check each academic page renders the correct leader name, title, quote, and image.
