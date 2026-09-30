# PRD — Website Pricelist Anez Creative

## Problem Statement (asli)
"buatkan saya website pricelist anez creative sesuai dengan isi dan tamplate di atas buat website yang menarik dan keren dan buat transisinya 3d yang keren" — berdasarkan PDF "PRICELIST WEDDING Anez Creative" yang diunggah user. User meminta semua isi & foto dari PDF dimasukkan.

## Pilihan User
- Gaya: elegan mewah — latar gelap, aksen emas, nuansa wedding premium, transisi 3D sinematik
- Fitur: semua isi PDF (hero, tentang, paket wedding/cinema/prewedding, add-ons, cetak & album, syarat & ketentuan, kontak)
- Tombol booking WhatsApp (082291840341) di setiap paket

## Arsitektur
- Frontend: Vite + React 19 + TS, Tailwind v4, motion (framer-motion API via `motion/react`), Lenis smooth scroll (`src/lib/scroll.ts`)
- Font: Playfair Display Variable (heading), DM Sans Variable (body), JetBrains Mono Variable (overline)
- Tema: dark luxury — background #0B0C0E, emas #D4AF37 (token `--color-gold` di index.css)
- Konten terpusat di `src/lib/data.ts` (paket, harga, add-ons, cetak & album, terms, kontak) + helper `waLink()` / `bookMsg()`
- Foto: 27 foto portofolio asli diekstrak dari PDF user, dioptimasi ke WebP di `frontend/public/img/pdf_*.webp`
- Komponen: Navbar, Hero (masked line reveal + gold dust canvas + 3D tilt card + parallax), Marquee, About, Philosophy (Raw Moment/Beauty/Wedding Stage), WeddingPackages (3D tilt cards), CinemaSection (parallax bg), PreweddingSection, AddonsPrint (tabs), TermsSection (accordion), Footer, FloatingDock (WA)
- Backend: FastAPI template tidak diubah (situs statis; endpoint /api/status bawaan tetap hidup)

## User Personas
- Calon pengantin (Padang & Sumatera Barat) yang ingin melihat harga paket dokumentasi dan booking cepat via WhatsApp
- Pemilik studio (Anez Creative) yang membagikan link pricelist ke calon klien

## Yang Sudah Diimplementasikan (2026-09-30)
- Hero sinematik dengan masked line-by-line reveal, partikel emas canvas, kartu foto 3D tilt mengikuti mouse, parallax scroll
- Marquee editorial lambat (layanan studio)
- Section Tentang (Salam Perkenalan + kutipan Dave Meurer dari PDF)
- Philosophy: Raw Moment, Beauty Session, Wedding Stage (teks asli PDF)
- Paket Wedding Silver/Gold/Platinum dengan harga & item persis dari PDF + tombol WA per paket (pesan terisi otomatis)
- Wedding Cinema: Video Teaser 1,25jt / Video Cinema 1,85jt / Drone Aerial 750rb
- Prewedding: Session 1,5jt / Cinema Prewedding 1,2jt / Drone add-on
- Add-ons (5 item) & Cetak & Album (5 item) dalam tabs
- Term & Condition lengkap (Booking & Payment, Day Moment, Post Production) sebagai accordion
- Footer kontak: WA 0822-9184-0341, email aanneezz15@gmail.com, IG @anez.creative, Padang Sumbar
- Floating WhatsApp dock, favicon monogram "A" emas, responsif mobile + menu hamburger
- Verifikasi: typecheck bersih, curl /api 200 via URL publik, screenshot semua flow (desktop+mobile), 0 console error

## Update 2026-09-30 (iterasi 2)
- Logo navbar & footer diganti memakai logo asli dari PDF (dirender ulang, dibuat transparan: /img/logo.png & logo-gold.png)
- Galeri Lightbox: 26 foto portofolio dari PDF, grid masonry, klik → layar penuh dengan navigasi prev/next + keyboard (Esc/panah), counter
- Kalkulator Paket: pilih paket wedding (single) + cinema/prewedding/add-ons/cetak (multi), total estimasi real-time, kirim rincian ke WhatsApp terformat. Data numerik di src/lib/calculator.ts
- Testimoni Klien: 3 kartu 3D tilt. CATATAN: kutipan & 2 nama masih CONTOH — perlu diganti testimoni asli
- Video Teaser: montase sinematik (Ken Burns crossfade + letterbox) dari 5 foto portofolio asli di section Cinema — BUKAN file video; ganti dengan video asli (mp4/YouTube/IG) jika user mengirimkannya
- Verifikasi: typecheck bersih; lightbox nav/counter/esc OK; kalkulator total akurat (3,6jt+1,25jt+750rb+250rb = Rp 5.850.000) & pesan WA terformat; teaser & testimoni tampil

## Backlog / Next Tasks
- P0: Minta user: video teaser asli (mp4/link YouTube/IG) + testimoni klien asli untuk menggantikan konten contoh
- P1: Form booking tanggal tersimpan ke MongoDB; filter kategori di galeri
- P2: SEO metadata lengkap + Open Graph; animasi before/after color grading
