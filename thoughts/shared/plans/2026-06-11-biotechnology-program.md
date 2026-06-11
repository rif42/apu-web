# Biotechnology Program Detail Page Implementation Plan

**Goal:** Build a dedicated `/bioteknologi` page that brings the Biotechnology program content in-house, replacing the external KMB microsite link, using APU's established design system and reusable components.

**Architecture:** Single Astro page composing 6 new section components, fed by a typed data file (`src/data/program-details.ts`). Follows the exact same page composition pattern as `about-apu.astro` and `pendaftaran.astro`.

**Design:** [thoughts/shared/designs/2026-06-11-biotechnology-program-design.md](thoughts/shared/designs/2026-06-11-biotechnology-program-design.md)

---

## Dependency Graph

```
Batch 1 (parallel): 1.1 [foundation - data layer, no deps]
Batch 2 (parallel): 2.1, 2.2, 2.3, 2.4, 2.5, 2.6 [sections - all depend on 1.1]
Batch 3 (parallel): 3.1, 3.2 [page composition + link update - depends on batch 2]
```

---

## Batch 1: Foundation (1 implementer)

### Task 1.1: Program Details Data Layer
**File:** `src/data/program-details.ts`
**Test:** None (pure data export; verify by TypeScript check `bunx astro check`)
**Depends:** none

This file contains the complete content schema for the Biotechnology program. When a second program is added, this becomes a record/map keyed by `programId`.

```typescript
export interface ProgramHead {
  name: string;
  title: string;
  photo?: string;
  message: string;
}

export interface ProgramStrength {
  title: string;
  description: string;
  icon: string; // SVG path data or identifier
}

export interface GraduateAttribute {
  letter: string;
  word: string;
  meaning: string;
  description: string;
}

export interface CareerPath {
  title: string;
  description: string;
}

export interface FacultyMember {
  name: string;
  title: string;
  photo?: string;
  nidn: string;
  link?: string;
}

export interface ProgramDetail {
  programId: string;
  name: string;
  degree: string;
  faculty: string;
  head: ProgramHead;
  strengths: ProgramStrength[];
  vision: string;
  mission: string[];
  graduateAttributes: GraduateAttribute[];
  objectives: string[];
  careerPaths: CareerPath[];
  facultyMembers: FacultyMember[];
  focusAreas: string[];
}

export const biotechnologyProgram: ProgramDetail = {
  programId: 'biotechnology',
  name: 'Biotechnology',
  degree: 'S1',
  faculty: 'Fakultas Sains dan Teknologi',
  head: {
    name: 'Fauziah Novita Putri Rifai, S.Si, M.Biotech',
    title: 'Kepala Program Studi',
    message: `Selamat datang di Program Studi Biotechnology APU. Kami membangun kurikulum yang menggabungkan kekuatan biologi molekuler, teknologi informasi, dan rekayasa industri berkelanjutan. Mahasiswa kami tidak hanya belajar di laboratorium standar GLP/GMP, tetapi juga terlibat langsung dalam proyek riset dan magang industri sejak semester awal.

Lulusan Biotechnology APU siap menghadapi tantangan global di bidang medis, digital, dan industri hijau. Bergabunglah dengan kami untuk menjadi bagian dari generasi yang mengubah dunia melalui sains dan inovasi.`,
  },
  strengths: [
    {
      title: 'Interdisipliner',
      description: 'Medical biotech + informatics + industrial biotech dengan green technology',
      icon: 'dna',
    },
    {
      title: 'Sarana Modern',
      description: 'Laboratorium standar GLP/GMP (SCCR) dengan peralatan lengkap dan mutakhir',
      icon: 'flask',
    },
    {
      title: 'Pendidik Internasional',
      description: 'Dosen berkualifikasi global yang aktif dalam penelitian dan publikasi',
      icon: 'globe',
    },
    {
      title: 'Orientasi Industri',
      description: 'Magang, proyek terapan, dan kolaborasi dengan mitra industri bioteknologi',
      icon: 'factory',
    },
    {
      title: 'Biotech Digital & AI',
      description: 'Pemodelan komputasional, analisis data biologis, dan penerapan AI dalam bioteknologi',
      icon: 'cpu',
    },
    {
      title: 'Entrepreneurship',
      description: 'Pembentukan mindset entrepreneur dan pengembangan kepemimpinan di bidang sains',
      icon: 'trending-up',
    },
    {
      title: 'Jaringan Global',
      description: 'Kemitraan nasional dan internasional untuk peluang karir dan riset',
      icon: 'network',
    },
  ],
  vision:
    'Menjadi program studi bioteknologi unggul bertaraf internasional, melalui inovasi green technology dan pengembangan rekayasa sel.',
  mission: [
    'Menyelenggarakan pendidikan bioteknologi berkualitas dunia yang berbasis riset dan teknologi terkini.',
    'Mengembangkan penelitian inovatif di bidang medical biotechnology, bioinformatics, dan industrial biotechnology.',
    'Membangun kerja sama strategis dengan industri dan institusi akademik dalam dan luar negeri.',
    'Menghasilkan lulusan yang adaptif, kreatif, dan bertanggung jawab sosial.',
    'Mendorong kewirausahaan berbasis sains untuk solusi permasalahan global.',
  ],
  graduateAttributes: [
    {
      letter: 'A',
      word: 'Adaptable',
      meaning: 'Adaptif',
      description: 'Mampu merespons perubahan dunia yang cepat dengan pembelajaran berkelanjutan.',
    },
    {
      letter: 'P',
      word: 'Persistence',
      meaning: 'Tangguh',
      description: 'Pantang menyerah dalam menghadapi tantangan akademik dan profesional.',
    },
    {
      letter: 'U',
      word: 'Universal',
      meaning: 'Universal',
      description: 'Berwawasan global dan menghargai nilai kebaikan universal.',
    },
    {
      letter: 'S',
      word: 'Smart',
      meaning: 'Cerdas',
      description: 'Cerdas dan maju secara intelektual dengan dasar sains yang kuat.',
    },
    {
      letter: 'S',
      word: 'Creative',
      meaning: 'Kreatif',
      description: 'Selalu berinovasi dan mencari peluang baru di bidang bioteknologi.',
    },
    {
      letter: 'C',
      word: 'Collaborative',
      meaning: 'Kolaboratif',
      description: 'Bekerja sama dalam tim sebagai pemimpin efektif dan anggota yang berkontribusi.',
    },
    {
      letter: 'R',
      word: 'Responsible',
      meaning: 'Bertanggung Jawab',
      description: 'Tanggung jawab sosial kepada masyarakat, bangsa, dan Tuhan.',
    },
  ],
  objectives: [
    'Menghasilkan lulusan yang menguasai konsep fundamental dan aplikasi bioteknologi.',
    'Membekali mahasiswa dengan keterampilan riset laboratorium dan analisis data.',
    'Mengintegrasikan teknologi informasi dan kecerdasan buatan dalam proses bioteknologi.',
    'Membangun jiwa entrepreneur dan kemampuan manajemen proyek sains.',
  ],
  careerPaths: [
    {
      title: 'Research Scientist',
      description: 'Riset dan pengembangan di laboratorium bioteknologi farmasi, pangan, dan kesehatan.',
    },
    {
      title: 'Clinical Regulator',
      description: 'Regulasi dan pengawasan produk biomedis untuk memastikan keamanan dan kualitas.',
    },
    {
      title: 'Bioinformatics Expert',
      description: 'Analisis data biologis, pemodelan komputasional, dan pengembangan algoritma genomik.',
    },
    {
      title: 'Data Security Specialist',
      description: 'Keamanan data riset dan informasi kesehatan dalam ekosistem digital bioteknologi.',
    },
    {
      title: 'Quality Assurance Professional',
      description: 'Jaminan mutu produk bioteknologi sesuai standar GLP, GMP, dan internasional.',
    },
    {
      title: 'Industrial Biotech Developer',
      description: 'Pengembangan produk dan proses di industri bioteknologi hijau dan berkelanjutan.',
    },
  ],
  facultyMembers: [
    {
      name: 'Fauziah Novita Putri Rifai, S.Si, M.Biotech',
      title: 'Kepala Program Studi',
      nidn: '-',
    },
    {
      name: 'Iffan Alif, M.Biotech',
      title: 'Dosen',
      nidn: '-',
    },
    {
      name: 'Nurul Hidayah, S.Si, M.Biotech',
      title: 'Dosen',
      nidn: '-',
    },
    {
      name: 'Salindri Prawitasari, S.Si, M.Si',
      title: 'Dosen',
      nidn: '-',
    },
    {
      name: 'Dini Cahyani, S.Si, M.Biotech',
      title: 'Dosen',
      nidn: '-',
    },
  ],
  focusAreas: [
    'Medical Biotechnology',
    'Biotechnology Informatics',
    'Biotechnology Industry',
  ],
};
```

**Verify:** `bunx astro check` (TypeScript validation)
**Commit:** `feat(data): add biotechnology program details`

---

## Batch 2: Section Components (6 implementers in parallel)

All tasks in this batch import from `src/data/program-details.ts` (Task 1.1). They are independent of each other and can run simultaneously.

---

### Task 2.1: Program Hero Section
**File:** `src/sections/program/ProgramHeroSection.astro`
**Test:** None (visual verification via `bun run dev`)
**Depends:** 1.1

```astro
---
import ScrollReveal from "../../components/ScrollReveal.astro";
import { biotechnologyProgram as program } from "../../data/program-details";

const initials = program.head.name
  .split(" ")
  .map((n) => n[0])
  .slice(0, 2)
  .join("");
---

<section
  id="hero-program"
  class="apu-section-shell relative overflow-hidden"
  style="background: linear-gradient(180deg, rgb(var(--color-apu-navy)) 0%, rgb(28 58 38) 100%); --apu-surface: 247 250 243;"
>
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[rgb(var(--color-apu-accent)_/_0.12)] blur-3xl"></div>
    <div class="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[rgb(var(--color-apu-accent)_/_0.08)] blur-3xl"></div>
  </div>

  <div class="content-max relative z-10 py-20 md:py-28">
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
      <!-- Left: Head Photo + Message -->
      <div>
        <ScrollReveal>
          <span class="apu-section-kicker mb-5 block text-[rgb(var(--color-apu-accent))]">PROGRAM STUDI</span>
          <h1 class="text-h1 text-white mb-3">{program.name}</h1>
          <p class="text-body text-white/70 mb-10">
            {program.degree} — {program.faculty}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <div class="flex items-start gap-5 mb-8">
            <!-- Photo fallback: gradient avatar -->
            <div class="w-20 h-20 rounded-2xl bg-gradient-to-br from-[rgb(var(--color-apu-accent))] to-[rgb(var(--color-apu-navy))] flex items-center justify-center flex-shrink-0 border-2 border-white/20">
              {program.head.photo ? (
                <img
                  src={program.head.photo}
                  alt={program.head.name}
                  class="w-full h-full object-cover rounded-2xl"
                  loading="eager"
                />
              ) : (
                <span class="text-white text-xl font-bold">{initials}</span>
              )}
            </div>
            <div>
              <p class="text-body font-medium text-white">{program.head.name}</p>
              <p class="text-caption text-white/60">{program.head.title}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={250}>
          <div class="apu-glass-card bg-white/5 border-white/10 p-6 md:p-8">
            <p class="text-body-s text-white/80 leading-relaxed whitespace-pre-line">
              {program.head.message}
            </p>
          </div>
        </ScrollReveal>
      </div>

      <!-- Right: Program Identity Card -->
      <ScrollReveal delay={200} direction="right">
        <div class="apu-glass-card bg-white/8 border-white/10 p-8 md:p-10">
          <h2 class="text-h3 text-white mb-6">Area Fokus</h2>
          <div class="flex flex-wrap gap-3 mb-8">
            {program.focusAreas.map((area, index) => (
              <span
                class="apu-pill-badge bg-[rgb(var(--color-apu-accent)_/_0.15)] text-[rgb(var(--color-apu-accent))] border-[rgb(var(--color-apu-accent)_/_0.3)]"
                style={`transition-delay: ${index * 80}ms`}
              >
                {area}
              </span>
            ))}
          </div>

          <div class="space-y-4">
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[rgb(var(--color-apu-accent))]"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.66 2.24 3 5 3s5-1.34 5-3v-5"/></svg>
              </div>
              <div>
                <p class="text-caption text-white/60">Jenjang</p>
                <p class="text-body text-white">{program.degree} — Sarjana</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-[rgb(var(--color-apu-accent))]"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div>
                <p class="text-caption text-white/60">Lokasi</p>
                <p class="text-body text-white">Kampus SCCR Semarang</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  </div>
</section>
```

**Verify:** Visual check at `http://localhost:4322/bioteknologi` — hero renders, head message visible, focus badges present.
**Commit:** `feat(sections): add program hero section`

---

### Task 2.2: Program Strengths Section
**File:** `src/sections/program/ProgramStrengthsSection.astro`
**Test:** None (visual verification)
**Depends:** 1.1

```astro
---
import ScrollReveal from "../../components/ScrollReveal.astro";
import SectionHeader from "../../components/SectionHeader.astro";
import { biotechnologyProgram as program } from "../../data/program-details";

const iconMap: Record<string, string> = {
  dna: '<path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.5-2.5 3.5-2.5 5 0"/><path d="M15 2c-1.5 2.5-3.5 2.5-5 0"/><path d="M22 9c-6.667 6-13.333 0-20 6"/>',
  flask: '<path d="M10 2v7.31"/><path d="M14 2v7.31"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  factory: '<path d="M2 20a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8l-7 5V8l-7 5V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/><path d="M17 18h1"/><path d="M12 18h1"/><path d="M7 18h1"/>',
  cpu: '<rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  'trending-up': '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>',
  network: '<circle cx="5" cy="6" r="3"/><circle cx="19" cy="6" r="3"/><circle cx="12" cy="18" r="3"/><path d="M8.5 8.5 10 14.5"/><path d="M15.5 8.5 14 14.5"/>',
};
---

<section id="keunggulan" class="apu-section-shell motion-aurora-shell relative isolate overflow-hidden py-24 md:py-32 bg-gradient-to-b from-brand-surface via-brand-surface-alt to-brand-surface-soft">
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute -left-24 top-16 h-72 w-72 rounded-full bg-[rgb(var(--color-apu-accent)_/_0.12)] blur-3xl"></div>
    <div class="absolute -right-24 bottom-8 h-80 w-80 rounded-full bg-[rgb(var(--color-apu-navy)_/_0.10)] blur-3xl"></div>
  </div>

  <div class="content-max relative z-10">
    <ScrollReveal>
      <SectionHeader
        kicker="KEUNGGULAN"
        title="Mengapa Bioteknologi APU?"
        class="text-center mb-16"
        titleClass="text-h2 text-[rgb(var(--color-apu-navy))] mb-4"
      />
    </ScrollReveal>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {program.strengths.map((strength, index) => (
        <ScrollReveal delay={index * 120}>
          <div class="apu-glass-card apu-interactive-card p-6 md:p-8 h-full">
            <div class="apu-icon-chip h-12 w-12 rounded-xl flex-shrink-0 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                set:html={iconMap[strength.icon] || iconMap['dna']}
              />
            </div>
            <h3 class="text-h3 text-brand-primary-deep text-lg md:text-xl mb-3">
              {strength.title}
            </h3>
            <p class="text-body-s text-brand-text-muted leading-relaxed">
              {strength.description}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </div>
</section>
```

**Verify:** Visual check — 7 cards in grid, icons render, stagger animation works on scroll.
**Commit:** `feat(sections): add program strengths section`

---

### Task 2.3: Program Vision & Mission Section
**File:** `src/sections/program/ProgramVisionMissionSection.astro`
**Test:** None (visual verification)
**Depends:** 1.1

```astro
---
import ScrollReveal from "../../components/ScrollReveal.astro";
import SectionHeader from "../../components/SectionHeader.astro";
import { biotechnologyProgram as program } from "../../data/program-details";
---

<section id="visi-misi" class="apu-section-shell relative overflow-hidden bg-brand-surface-alt">
  <div class="content-max py-24 md:py-32">
    <ScrollReveal>
      <SectionHeader
        kicker="VISI & MISI"
        title="Arah dan Tujuan"
        class="text-center mb-16"
        titleClass="text-h2 text-brand-primary-deep mb-4"
      />
    </ScrollReveal>

    <!-- Vision Block -->
    <ScrollReveal class="mb-16 md:mb-20">
      <div class="apu-glass-card border-l-4 border-[rgb(var(--color-apu-accent))] bg-gradient-to-r from-[rgb(var(--color-apu-navy)_/_0.06)] to-white/60 p-8 md:p-12 max-w-4xl mx-auto">
        <p class="text-mono text-brand-text-muted mb-4">VISION 2043</p>
        <blockquote class="text-h3 md:text-h2 text-brand-primary-deep font-normal leading-tight">
          "{program.vision}"
        </blockquote>
      </div>
    </ScrollReveal>

    <!-- Mission List -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-5xl mx-auto">
      {program.mission.map((item, index) => (
        <ScrollReveal delay={index * 100} direction={index % 2 === 0 ? 'left' : 'right'}>
          <div class="apu-glass-card apu-interactive-card p-6 md:p-8 flex gap-5 items-start">
            <span class="text-mono text-2xl text-[rgb(var(--color-apu-accent))] font-bold flex-shrink-0 mt-0.5">
              {String(index + 1).padStart(2, '0')}
            </span>
            <p class="text-body text-brand-text leading-relaxed">
              {item}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </div>
</section>
```

**Verify:** Visual check — vision block prominent with accent border, 5 mission items in 2-col grid with alternating slide direction.
**Commit:** `feat(sections): add program vision mission section`

---

### Task 2.4: Program Values Section (Graduate Attributes)
**File:** `src/sections/program/ProgramValuesSection.astro`
**Test:** None (visual verification)
**Depends:** 1.1

```astro
---
import ScrollReveal from "../../components/ScrollReveal.astro";
import SectionHeader from "../../components/SectionHeader.astro";
import { biotechnologyProgram as program } from "../../data/program-details";

const gradientClasses = [
  'from-[rgb(var(--color-apu-accent))] to-[rgb(var(--color-apu-navy))]',
  'from-[rgb(var(--color-brand-primary))] to-[rgb(var(--color-apu-navy))]',
  'from-[rgb(var(--color-apu-accent))] to-[rgb(var(--color-brand-primary-deep))]',
  'from-[rgb(var(--color-brand-primary-soft))] to-[rgb(var(--color-apu-navy))]',
  'from-[rgb(var(--color-apu-accent))] to-[rgb(98_6_112)]',
  'from-[rgb(var(--color-brand-primary))] to-[rgb(var(--color-brand-primary-deep))]',
  'from-[rgb(var(--color-apu-accent))] to-[rgb(var(--color-brand-primary))]',
];
---

<section id="graduate-attributes" class="apu-section-shell motion-aurora-shell relative isolate overflow-hidden py-24 md:py-32 bg-gradient-to-b from-brand-surface-soft via-brand-surface-alt to-brand-surface">
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[rgb(var(--color-apu-accent)_/_0.06)] blur-3xl"></div>
  </div>

  <div class="content-max relative z-10">
    <ScrollReveal>
      <SectionHeader
        kicker="GRADUATE ATTRIBUTES"
        title="Nilai-Nilai Lulusan"
        description="APUSSCR — Kualitas yang dibentuk di setiap mahasiswa Biotechnology APU"
        class="text-center mb-16"
        titleClass="text-h2 text-[rgb(var(--color-apu-navy))] mb-4"
      />
    </ScrollReveal>

    <!-- Desktop: 7 cards row / Mobile: 2-col grid -->
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-5">
      {program.graduateAttributes.map((attr, index) => (
        <ScrollReveal delay={index * 80}>
          <div class="apu-glass-card apu-interactive-card p-5 md:p-6 text-center h-full flex flex-col items-center">
            <div class={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradientClasses[index % gradientClasses.length]} flex items-center justify-center mb-4 shadow-lg`}>
              <span class="text-white text-2xl font-bold">{attr.letter}</span>
            </div>
            <h3 class="text-body font-semibold text-brand-primary-deep mb-1">
              {attr.word}
            </h3>
            <p class="text-caption text-brand-text-muted mb-3">
              {attr.meaning}
            </p>
            <p class="text-caption text-brand-text-muted leading-relaxed">
              {attr.description}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </div>
</section>
```

**Verify:** Visual check — 7 cards with letter chips, gradient variations, responsive grid (2-col mobile, 4-col tablet, 7-col desktop).
**Commit:** `feat(sections): add program values section`

---

### Task 2.5: Program Careers Section
**File:** `src/sections/program/ProgramCareersSection.astro`
**Test:** None (visual verification)
**Depends:** 1.1

```astro
---
import ScrollReveal from "../../components/ScrollReveal.astro";
import SectionHeader from "../../components/SectionHeader.astro";
import { biotechnologyProgram as program } from "../../data/program-details";

const careerIcons = [
  '<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>',
  '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>',
  '<rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>',
  '<path d="M12 2v20"/><path d="M2 12h20"/><path d="m4.93 4.93 14.14 14.14"/><path d="m19.07 4.93-14.14 14.14"/>',
];
---

<section id="karier" class="apu-section-shell motion-aurora-shell relative isolate overflow-hidden py-24 md:py-32 bg-gradient-to-b from-brand-surface via-brand-surface-alt to-brand-surface-soft">
  <div class="pointer-events-none absolute inset-0 overflow-hidden">
    <div class="absolute -right-24 top-16 h-72 w-72 rounded-full bg-[rgb(var(--color-apu-accent)_/_0.12)] blur-3xl"></div>
    <div class="absolute -left-24 bottom-8 h-80 w-80 rounded-full bg-[rgb(var(--color-apu-navy)_/_0.10)] blur-3xl"></div>
  </div>

  <div class="content-max relative z-10">
    <ScrollReveal>
      <SectionHeader
        kicker="KARIER"
        title="Peluang Profesi"
        description="Lulusan Biotechnology APU siap berkarir di berbagai sektor industri dan riset"
        class="text-center mb-16"
        titleClass="text-h2 text-[rgb(var(--color-apu-navy))] mb-4"
      />
    </ScrollReveal>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {program.careerPaths.map((career, index) => (
        <ScrollReveal delay={index * 100}>
          <div class="apu-glass-card apu-interactive-card p-6 md:p-8 h-full">
            <div class="apu-icon-chip h-12 w-12 rounded-xl flex-shrink-0 mb-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                set:html={careerIcons[index % careerIcons.length]}
              />
            </div>
            <h3 class="text-h3 text-brand-primary-deep text-lg md:text-xl mb-3">
              {career.title}
            </h3>
            <p class="text-body-s text-brand-text-muted leading-relaxed">
              {career.description}
            </p>
          </div>
        </ScrollReveal>
      ))}
    </div>
  </div>
</section>
```

**Verify:** Visual check — 6 career cards in 3-col grid, icons render, descriptions scannable.
**Commit:** `feat(sections): add program careers section`

---

### Task 2.6: Program Faculty Section
**File:** `src/sections/program/ProgramFacultySection.astro`
**Test:** None (visual verification)
**Depends:** 1.1

```astro
---
import ScrollReveal from "../../components/ScrollReveal.astro";
import SectionHeader from "../../components/SectionHeader.astro";
import { biotechnologyProgram as program } from "../../data/program-details";

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter((c) => c === c.toUpperCase())
    .slice(0, 2)
    .join("");
}

const avatarGradients = [
  'from-[rgb(var(--color-apu-accent))] to-[rgb(var(--color-apu-navy))]',
  'from-[rgb(var(--color-brand-primary))] to-[rgb(var(--color-brand-primary-deep))]',
  'from-[rgb(var(--color-apu-navy))] to-[rgb(var(--color-brand-primary))]',
  'from-[rgb(var(--color-brand-primary-soft))] to-[rgb(var(--color-apu-accent))]',
  'from-[rgb(var(--color-apu-accent))] to-[rgb(98_6_112)]',
];
---

<section id="dosen" class="apu-section-shell relative overflow-hidden bg-brand-surface-alt py-24 md:py-32">
  <div class="content-max">
    <ScrollReveal>
      <SectionHeader
        kicker="DOSEN"
        title="Tim Pengajar"
        description="Dosen berkualifikasi internasional yang membimbing mahasiswa dalam riset dan inovasi"
        class="text-center mb-16"
        titleClass="text-h2 text-brand-primary-deep mb-4"
      />
    </ScrollReveal>

    <!-- Desktop: horizontal row / Mobile: 2-col grid -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6">
      {program.facultyMembers.map((member, index) => {
        const initials = getInitials(member.name);
        return (
          <ScrollReveal delay={index * 100}>
            <div class="apu-glass-card p-5 md:p-6 text-center h-full flex flex-col items-center transition-transform duration-300 hover:scale-[1.03]">
              <!-- Avatar: photo or gradient fallback -->
              <div class={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${avatarGradients[index % avatarGradients.length]} flex items-center justify-center mb-4 flex-shrink-0`}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    class="w-full h-full object-cover rounded-2xl"
                    loading="lazy"
                  />
                ) : (
                  <span class="text-white text-xl md:text-2xl font-bold">{initials}</span>
                )}
              </div>

              <h3 class="text-body font-semibold text-brand-text leading-snug mb-1">
                {member.name}
              </h3>
              <p class="text-caption text-brand-text-muted mb-2">
                {member.title}
              </p>
              {member.nidn && member.nidn !== '-' && (
                <p class="text-mono text-[10px] text-brand-text-muted/70">
                  NIDN {member.nidn}
                </p>
              )}

              {member.link && (
                <a
                  href={member.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  class="mt-3 text-caption text-brand-primary-deep hover:text-[rgb(var(--color-apu-accent))] transition-colors duration-220"
                >
                  Lihat Profil →
                </a>
              )}
            </div>
          </ScrollReveal>
        );
      })}
    </div>

    <!-- TODO note for photo integration -->
    <!--
      TODO: Replace gradient avatars with actual faculty photos when available.
      Add photo paths to src/data/program-details.ts facultyMembers[].photo
    -->
  </div>
</section>
```

**Verify:** Visual check — 5 faculty cards with gradient avatars + initials, names and titles correct, responsive grid.
**Commit:** `feat(sections): add program faculty section`

---

## Batch 3: Page Composition + Link Update (2 implementers in parallel)

Both tasks are independent of each other but depend on Batch 2 completing.

---

### Task 3.1: Biotechnology Page
**File:** `src/pages/bioteknologi.astro`
**Test:** None (verify page renders at `/bioteknologi`)
**Depends:** 2.1, 2.2, 2.3, 2.4, 2.5, 2.6

```astro
---
import MainLayout from "../layouts/MainLayout.astro";
import NavigationAPU from "../components/NavigationAPU.astro";
import ProgramHeroSection from "../sections/program/ProgramHeroSection.astro";
import ProgramStrengthsSection from "../sections/program/ProgramStrengthsSection.astro";
import ProgramVisionMissionSection from "../sections/program/ProgramVisionMissionSection.astro";
import ProgramValuesSection from "../sections/program/ProgramValuesSection.astro";
import ProgramCareersSection from "../sections/program/ProgramCareersSection.astro";
import ProgramFacultySection from "../sections/program/ProgramFacultySection.astro";
import ContactSection from "../sections/ContactSection.astro";
import Footer from "../components/Footer.astro";
---

<MainLayout
  title="Program Studi Biotechnology | Agung Putra University"
  description="Program Studi Biotechnology S1 APU — Medical Biotechnology, Bioinformatics, dan Industrial Biotechnology dengan fasilitas laboratorium modern dan dosen berkualifikasi internasional."
>
  <NavigationAPU />

  <ProgramHeroSection />
  <ProgramStrengthsSection />
  <ProgramVisionMissionSection />
  <ProgramValuesSection />
  <ProgramCareersSection />
  <ProgramFacultySection />
  <ContactSection />
  <Footer />
</MainLayout>
```

**Verify:** `bun run dev` → navigate to `http://localhost:4322/bioteknologi` → full page renders, all sections visible, no console errors.
**Commit:** `feat(pages): add biotechnology program detail page`

---

### Task 3.2: Update Programs Link (External → Internal)
**File:** `src/data/programs.ts`
**Test:** None (verify link change)
**Depends:** 3.1 (page must exist before link goes live)

Change the biotechnology entry's `link` field from external KMB URL to internal path:

```typescript
  {
    id: 'biotechnology',
    name: 'Biotechnology',
    degree: 'S1',
    subPrograms: [
      'Medical Biotechnology',
      'Biotechnology Informatics',
      'Biotechnology Industry',
    ],
    image: '/images/programs/biotech.jpg',
    link: '/bioteknologi'
  },
```

**Implementation note:** The `ProgramsSectionAPU.astro` component reads `program.link` directly from the data file and uses it for both desktop grid links and mobile swiper links. No changes needed in the section component — the data update propagates automatically.

**Verify:** On homepage (`/`), click the Biotechnology card → navigates to `/bioteknologi` (no external redirect).
**Commit:** `fix(data): update biotechnology link to internal page`

---

## Assets & Image Strategy

### Required Images

| Asset | Path | Status | Fallback Strategy |
|-------|------|--------|-------------------|
| Program head photo | (none yet) | Missing | Gradient avatar with initials (implemented) |
| Faculty photos (5) | (none yet) | Missing | Gradient avatar with initials (implemented) |
| Program card bg | `/images/programs/biotech.jpg` | Exists | Already used in ProgramsSectionAPU |

### Fallback Implementation

Both `ProgramHeroSection.astro` and `ProgramFacultySection.astro` implement the fallback pattern:

```astro
{photo ? (
  <img src={photo} alt={name} class="..." />
) : (
  <span class="text-white text-xl font-bold">{initials}</span>
)}
```

When photos become available:
1. Add images to `public/images/faculty/`
2. Update `src/data/program-details.ts` — add `photo: '/images/faculty/filename.jpg'` to each member
3. No component code changes needed

---

## Verification Checklist (Per-Task + Full Page)

### Per Task
- `bunx astro check` passes with zero TypeScript errors
- `bun run build` succeeds
- No lint errors

### Full Page Verification
1. **Visual regression:** Sections consistent with existing design (compare to PathwaysSectionAPU, AboutVisionMission)
2. **Responsive:** Verify at 320px, 768px, 1024px, 1440px
3. **Accessibility:**
   - Keyboard navigation through all cards
   - `focus-visible` states visible on interactive elements
   - All decorative icons have `aria-hidden` (handled by SVG implementation)
   - Section IDs present for anchor navigation
4. **Performance:** Images use `loading="lazy"` except hero head photo (`loading="eager"`)
5. **Content accuracy:** Cross-check vision/mission/strengths against reference site
6. **Link integrity:** Homepage biotechnology card → `/bioteknologi`

---

## Rollback Plan

If issues are found:
1. Revert `src/data/programs.ts` link back to `https://biotechnology.kmb.ac.id/`
2. Remove or unpublish `src/pages/bioteknologi.astro`
3. No other pages are affected — the new section components are only referenced by the biotechnology page

---

## Future Extensibility (Documented for Next Program)

When adding Biomedical, Law, etc.:

1. **Data layer:** Convert `program-details.ts` from single export to a record:
   ```typescript
   export const programDetails: Record<string, ProgramDetail> = {
     biotechnology: { ... },
     biomedical: { ... },
     // etc
   };
   ```

2. **Dynamic route (optional):** Create `src/pages/[program].astro` that looks up `programDetails[Astro.params.program]`.

3. **Sections are reusable:** All 6 section components accept the same `ProgramDetail` shape — they can be imported by any program page.

4. **No section component changes needed** — they're already data-driven.

---

## Summary of All Files

### New Files (8)
| File | Batch | Purpose |
|------|-------|---------|
| `src/data/program-details.ts` | 1 | Typed data source for biotechnology content |
| `src/sections/program/ProgramHeroSection.astro` | 2 | Hero with head message + focus areas |
| `src/sections/program/ProgramStrengthsSection.astro` | 2 | 7 strength cards in grid |
| `src/sections/program/ProgramVisionMissionSection.astro` | 2 | Vision quote + 5 mission items |
| `src/sections/program/ProgramValuesSection.astro` | 2 | 7 graduate attribute cards (APUSSCR) |
| `src/sections/program/ProgramCareersSection.astro` | 2 | 6 career path cards |
| `src/sections/program/ProgramFacultySection.astro` | 2 | 5 faculty member cards with avatars |
| `src/pages/bioteknologi.astro` | 3 | Page composition layout |

### Modified Files (1)
| File | Batch | Change |
|------|-------|--------|
| `src/data/programs.ts` | 3 | `link: 'https://biotechnology.kmb.ac.id/'` → `link: '/bioteknologi'` |

### Unchanged Files (auto-propagated)
- `src/sections/ProgramsSectionAPU.astro` — reads `program.link` dynamically, no code change needed
