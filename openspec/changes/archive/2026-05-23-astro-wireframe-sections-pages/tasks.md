## 1. Mapping Wireframe ke Struktur Astro

- [x] 1.1 Inventaris semua blok wireframe final dan petakan ke daftar section target di `src/sections/**`
- [x] 1.2 Tentukan route/halaman target di `src/pages/**` untuk setiap alur wireframe yang harus ditampilkan
- [x] 1.3 Definisikan status tiap blok: siap implementasi penuh vs placeholder “Segera Hadir”

## 2. Implementasi Section Astro

- [x] 2.1 Buat/perbarui section Astro per blok wireframe dengan pola komponen reusable
- [x] 2.2 Terapkan primitive dan token APU (`apu-*`, SectionHeader, CtaButton, typography/layout utilities) pada semua section baru
- [x] 2.3 Tambahkan state interaksi dan aksesibilitas minimum (focus-visible, keyboard reachability, kontras) pada elemen interaktif section

## 3. Komposisi Halaman dan Routing

- [x] 3.1 Susun halaman Astro yang mengomposisikan section menjadi alur wireframe end-to-end
- [x] 3.2 Pastikan halaman merender urutan section sesuai wireframe tanpa runtime error
- [x] 3.3 Terapkan placeholder non-breaking untuk bagian yang kontennya belum final

## 4. Verifikasi dan Penyelarasan

- [x] 4.1 Lakukan parity check section-by-section antara wireframe dan implementasi Astro
- [x] 4.2 Uji responsif dasar desktop/mobile untuk alur halaman baru
- [x] 4.3 Validasi konsistensi desain terhadap kontrak `src/styles/global.css` dan aturan di `AGENTS.md`
