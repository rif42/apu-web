## Verifikasi Implementasi

### 1) Cakupan mapping halaman/section
- Route baru dibuat di `src/pages/apu/`:
  - `admissions.astro`
  - `scholarships.astro`
  - `academics.astro`
  - `research.astro`
  - `about.astro`
  - `leadership.astro`
  - `student-life-services.astro`
  - `international.astro`
  - `news-stories.astro`
  - `contact.astro`
- Semua halaman memakai komposisi: `MainLayout + NavigationAPU + WireframePageHeroAPU + 3x WireframePageSectionAPU + Footer`.

### 2) Placeholder non-breaking
- `WireframePageSectionAPU` menampilkan daftar bullet jika `bullets` tersedia.
- Jika `bullets` kosong/tidak ada, komponen menampilkan badge `Segera Hadir` (`apu-pill-badge`) + teks placeholder aman.
- Setiap halaman memuat minimal satu section placeholder untuk konten yang belum final.

### 3) Konsistensi design system
- Primitive utama terpakai konsisten: `.apu-section-shell`, `.apu-glass-card`, `.apu-interactive-card`.
- Header section memakai `SectionHeader.astro`.
- CTA memakai `CtaButton.astro` (variant primary/secondary bawaan, fokus keyboard mengikuti primitive existing).
- Copy seluruh halaman ditulis dalam Bahasa Indonesia dengan ajakan tindakan.
