# Centralize ProgramMsgFromHead Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert `ProgramMsgFromHead.astro` into a data-prop-driven component and remove the six per-program wrapper sections.

**Architecture:** One shared Astro section receives a `LeadershipMessage` object. Each academic page imports its own message from the existing per-program data file and passes it. The base biomedical data remains as a fallback so the biomedical page needs no change.

**Tech Stack:** Astro, TypeScript, Bun

---

## File Structure

| File | Responsibility |
|------|----------------|
| `src/sections/academic/program/ProgramMsgFromHead.astro` | Shared, reusable section. Renders from `data` prop with optional fallback. |
| `src/pages/academic/biomedical.astro` | Uses fallback (no change required). |
| `src/pages/academic/biotechnology.astro` | Imports biotechnology message and passes it to shared section. |
| `src/pages/academic/communication.astro` | Imports communication message and passes it to shared section. |
| `src/pages/academic/law.astro` | Imports law message and passes it to shared section. |
| `src/pages/academic/management.astro` | Imports management message and passes it to shared section. |
| `src/pages/academic/midwifery-associate.astro` | Imports midwifery-associate message and passes it to shared section. |
| `src/pages/academic/midwifery-bachelor.astro` | Imports midwifery-bachelor message and passes it to shared section. |
| `src/sections/academic/program/*ProgramMsgFromHead.astro` (6 files) | To be deleted. |

---

### Task 1: Make `ProgramMsgFromHead.astro` accept a `data` prop

**Files:**
- Modify: `src/sections/academic/program/ProgramMsgFromHead.astro`

- [ ] **Step 1: Update the frontmatter to accept and fall back to the biomedical message**

Replace the current prop/interface destructuring block (lines 7-14) with:

```astro
---
import ScrollReveal from "@components/ScrollReveal.astro";
import CtaButton from "@components/CtaButton.astro";
import BackgroundBlobs from "@components/BackgroundBlobs.astro";
import { leadershipMessage } from "@data/academic-programs";
import type { LeadershipMessage } from "@data/leadership";

interface Props {
  variant?: "dark" | "light";
  data?: LeadershipMessage;
}

const { variant = "dark", data = leadershipMessage } = Astro.props;

const { kicker, title, quote, leaderName, leaderTitle, leaderTitle2, leaderImage, cta } = data;
---
```

- [ ] **Step 2: Confirm no other references to `leadershipMessage` remain in markup**

Search the file for `leadershipMessage` outside the import/fallback line. There should be none. All markup already uses destructured fields (`kicker`, `title`, `quote`, etc.), so no further changes are needed.

- [ ] **Step 3: Commit**

```bash
git add src/sections/academic/program/ProgramMsgFromHead.astro
git commit -m "feat: accept LeadershipMessage data prop in ProgramMsgFromHead"
```

---

### Task 2: Migrate non-biomedical academic pages

**Files:**
- Modify: `src/pages/academic/biotechnology.astro`
- Modify: `src/pages/academic/communication.astro`
- Modify: `src/pages/academic/law.astro`
- Modify: `src/pages/academic/management.astro`
- Modify: `src/pages/academic/midwifery-associate.astro`
- Modify: `src/pages/academic/midwifery-bachelor.astro`

For each page, perform the same two changes. Example for biotechnology:

- [ ] **Step 1: Replace the section import and add the data import**

In `src/pages/academic/biotechnology.astro`:

```astro
---
import MainLayout from "@layouts/MainLayout.astro";
import NavigationAPU from "@components/NavigationAPU.astro";
import ProgramStrengthsSection from "@sections/academic/program/ProgramStrengthsSection.astro";
import BiotechnologyProgramVisionMissionSection from "@sections/academic/program/BiotechnologyProgramVisionMissionSection.astro";
import ProgramValuesSection from "@sections/academic/program/ProgramValuesSection.astro";
import BiotechnologyProgramCareersSection from "@sections/academic/program/BiotechnologyProgramCareersSection.astro";
import BiotechnologyProgramFacultySection from "@sections/academic/program/BiotechnologyProgramFacultySection.astro";
import ContactSection from "@sections/ContactSection.astro";
import Footer from "@components/Footer.astro";
import ProgramMsgFromHead from "@sections/academic/program/ProgramMsgFromHead.astro";
import BiotechnologyProgramStrengthsBentoSection from "@sections/academic/program/BiotechnologyProgramStrengthsBentoSection.astro";
import BiomedicalGamePreviewSection from "@sections/academic/program/BiomedicalGamePreviewSection.astro";
import BiotechnologyProgramHeroSection from "@/sections/academic/program/BiotechnologyProgramHeroSection.astro";
import { leadershipMessage } from "@data/biotechnology-academic-programs";
---
```

- [ ] **Step 2: Pass the message to the shared component**

Replace:

```astro
<BiotechnologyProgramMsgFromHead variant="light" />
```

with:

```astro
<ProgramMsgFromHead variant="light" data={leadershipMessage} />
```

- [ ] **Step 3: Repeat for the remaining five pages**

Use the matching program data file and page name:

| Page | Data import | Old component |
|------|-------------|---------------|
| `src/pages/academic/communication.astro` | `@data/communication-academic-programs` | `CommunicationProgramMsgFromHead` |
| `src/pages/academic/law.astro` | `@data/law-academic-programs` | `LawProgramMsgFromHead` |
| `src/pages/academic/management.astro` | `@data/management-academic-programs` | `ManagementProgramMsgFromHead` |
| `src/pages/academic/midwifery-associate.astro` | `@data/midwifery-associate-academic-programs` | `MidwiferyAssociateProgramMsgFromHead` |
| `src/pages/academic/midwifery-bachelor.astro` | `@data/midwifery-bachelor-academic-programs` | `MidwiferyBachelorProgramMsgFromHead` |

- [ ] **Step 4: Commit**

```bash
git add src/pages/academic/biotechnology.astro \
        src/pages/academic/communication.astro \
        src/pages/academic/law.astro \
        src/pages/academic/management.astro \
        src/pages/academic/midwifery-associate.astro \
        src/pages/academic/midwifery-bachelor.astro
git commit -m "refactor: use shared ProgramMsgFromHead on academic pages"
```

---

### Task 3: Delete per-program wrapper sections

**Files:**
- Delete: `src/sections/academic/program/BiotechnologyProgramMsgFromHead.astro`
- Delete: `src/sections/academic/program/CommunicationProgramMsgFromHead.astro`
- Delete: `src/sections/academic/program/LawProgramMsgFromHead.astro`
- Delete: `src/sections/academic/program/ManagementProgramMsgFromHead.astro`
- Delete: `src/sections/academic/program/MidwiferyAssociateProgramMsgFromHead.astro`
- Delete: `src/sections/academic/program/MidwiferyBachelorProgramMsgFromHead.astro`

- [ ] **Step 1: Verify no remaining imports**

Run:

```bash
grep -R "ProgramMsgFromHead" src/ --include="*.astro"
```

Expected: only `src/sections/academic/program/ProgramMsgFromHead.astro` itself and the academic pages that import it. No references to the per-program wrappers.

- [ ] **Step 2: Delete the wrapper files**

```bash
git rm \
  src/sections/academic/program/BiotechnologyProgramMsgFromHead.astro \
  src/sections/academic/program/CommunicationProgramMsgFromHead.astro \
  src/sections/academic/program/LawProgramMsgFromHead.astro \
  src/sections/academic/program/ManagementProgramMsgFromHead.astro \
  src/sections/academic/program/MidwiferyAssociateProgramMsgFromHead.astro \
  src/sections/academic/program/MidwiferyBachelorProgramMsgFromHead.astro
```

- [ ] **Step 3: Commit**

```bash
git commit -m "chore: remove per-program ProgramMsgFromHead wrappers"
```

---

### Task 4: Build verification

**Files:** none (verification only)

- [ ] **Step 1: Run the build**

```bash
bun run build
```

- [ ] **Step 2: Confirm no TypeScript or import errors**

Expected: build completes successfully with no errors referencing `ProgramMsgFromHead`, `LeadershipMessage`, or the deleted wrapper files.

- [ ] **Step 3: (Optional) Spot-check rendered output**

Open the generated pages under `dist/academic/` (e.g., `dist/academic/biotechnology/index.html`) and confirm the leader name, title, quote, and image URL match the data file.

- [ ] **Step 4: Commit if any fixes were required**

If the build passes with no changes, no additional commit is needed.
