## Why

Wireframe riset sudah selesai, tetapi belum ada implementasi nyata di Astro sehingga belum bisa ditampilkan di website. Perlu translasi cepat dan konsisten dari wireframe ke section/page production-ready agar tim bisa review visual, konten, dan alur navigasi langsung di environment situs.

## What Changes

- Implementasi section Astro nyata berdasarkan wireframe yang sudah disepakati.
- Menyusun atau memperbarui halaman Astro agar seluruh section wireframe tampil end-to-end.
- Integrasi komponen reusable desain APU (SectionHeader, CtaButton, primitive `apu-*`) untuk konsistensi UI.
- Menambahkan state placeholder non-breaking untuk bagian yang kontennya belum final (mis. “Segera Hadir”).

## Capabilities

### New Capabilities
- `wireframe-to-astro-sections-pages`: Mewajibkan konversi wireframe riset menjadi section dan halaman Astro yang dapat dirender, dinavigasi, dan direview di website.

### Modified Capabilities
- (none)

## Impact

- Affected code: `src/pages/**`, `src/sections/**`, `src/components/**`, dan kemungkinan `src/styles/global.css` (hanya jika primitive tambahan benar-benar dibutuhkan).
- Affected system: rendering halaman Astro dan pengalaman pengguna mobile/desktop.
- Dependencies: tetap pada stack Astro + Tailwind v4 yang sudah ada, tanpa dependency besar baru kecuali benar-benar dibutuhkan untuk pola interaksi.
