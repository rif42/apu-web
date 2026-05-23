## Context

Wireframe multi-halaman sudah tersedia dari fase riset, tetapi belum diterjemahkan menjadi komponen section dan halaman Astro yang hidup. Proyek sudah memiliki kontrak desain APU berbasis token/primitive (`apu-*`), komponen reusable (`SectionHeader.astro`, `CtaButton.astro`), serta pola motion/reveal yang wajib dipertahankan agar implementasi baru konsisten secara visual, aksesibilitas, dan maintainability.

## Goals / Non-Goals

**Goals:**
- Mengubah wireframe yang sudah ditetapkan menjadi section Astro nyata di `src/sections/**`.
- Menyusun/merapikan halaman Astro di `src/pages/**` agar seluruh section wireframe dapat dirender sebagai alur halaman yang utuh.
- Menjaga konsistensi dengan sistem desain APU: token-first, primitive-first, focus-visible, dan copy publik berbahasa Indonesia.
- Menyediakan state non-breaking untuk blok yang kontennya belum final tanpa merusak rendering.

**Non-Goals:**
- Redesain ulang IA/navigation global yang sudah selesai.
- Migrasi framework atau penggantian arsitektur Astro/Tailwind yang ada.
- Integrasi backend/API baru di luar kebutuhan render konten statis/semi-statis section.

## Decisions

1. **Section-first composition**
   - Halaman akan dibangun dari section modular (`src/sections/*SectionAPU.astro`) agar iterasi desain cepat dan reuse tinggi.
   - **Alternatif:** menulis halaman monolitik per route. Ditolak karena memperbesar coupling dan mempersulit update per blok.

2. **Design-system enforcement**
   - Implementasi wajib memakai primitive yang sudah ada (`.apu-section-shell`, `.apu-glass-card`, `.apu-btn`, dsb.) sebelum membuat kelas one-off.
   - **Alternatif:** utility ad-hoc langsung di tiap section. Ditolak karena berisiko drift visual dan technical debt.

3. **Wireframe parity dengan progressive enhancement**
   - Struktur dan hierarchy konten mengikuti wireframe sebagai baseline, lalu interaksi (hover/toggle/reveal) ditambahkan tanpa mengubah kontrak inti konten.
   - **Alternatif:** langsung improvisasi layout besar saat implementasi. Ditolak agar review stakeholder tetap mudah dipetakan ke wireframe awal.

4. **Placeholder-safe incomplete blocks**
   - Bagian yang belum final memakai state “Segera Hadir”/setara, tetap accessible, dan tidak memutus flow halaman.
   - **Alternatif:** menunda render blok sampai final. Ditolak karena menghambat review end-to-end.

## Risks / Trade-offs

- **[Risk] Drift antara wireframe dan hasil Astro** → **Mitigation:** mapping section-per-section dan checklist parity sebelum merge.
- **[Risk] Inkonstistensi style antar section** → **Mitigation:** audit wajib terhadap pemakaian token/primitive `apu-*` di tiap section baru.
- **[Risk] Interaksi mobile kurang stabil pada komponen kompleks** → **Mitigation:** fallback perilaku sederhana (stack/scroll native) bila pola interaktif tidak robust.
- **[Trade-off] Kecepatan implementasi vs polish detail** → **Mitigation:** prioritas tahap awal pada parity + aksesibilitas; polish lanjutan sebagai task terpisah bila perlu.
