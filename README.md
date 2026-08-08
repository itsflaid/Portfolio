# Muhammad Fadil — Portfolio

Dibangun dengan **SvelteKit + TypeScript + Tailwind CSS + GSAP (ScrollTrigger)**.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:5173`.

## Build production

```bash
npm run build
npm run preview
```

Adapter yang dipakai: `@sveltejs/adapter-auto` — otomatis menyesuaikan saat di-deploy ke Vercel/Netlify/Cloudflare dkk. Kalau targetnya static hosting murni (mis. GitHub Pages), tinggal ganti ke `@sveltejs/adapter-static`.

## Struktur

```
src/
  app.html          -> shell HTML + import Google Fonts
  app.css           -> Tailwind directives + CSS variable desain (--ff-display, warna, dst)
  routes/
    +layout.svelte  -> import app.css global
    +layout.ts      -> prerender = true (site statis)
    +page.svelte    -> merangkai Grain, Nav, Hero, About
  lib/components/
    Grain.svelte    -> overlay noise/grain
    Nav.svelte      -> navigasi atas (mark "FLAID")
    Hero.svelte     -> nama + watermark silhouette "FLAID" + pin scroll GSAP
    About.svelte    -> heading "ABOUT MYSELF" letter-by-letter + reveal scroll GSAP
```

## Catatan perubahan dari versi HTML asli

- **Font utama diganti ke Bebas Neue** — dipakai di nama pada Hero, watermark siluet "FLAID", heading "About Myself" (komposisi huruf ABOUT/MYSELF), dan paragraf deskripsi. Diatur lewat satu variabel `--ff-display` di `src/app.css`, jadi kalau mau ganti lagi cukup ubah di satu tempat.
- Karena Bebas Neue di Google Fonts cuma tersedia dalam satu ketebalan (regular), `font-weight` yang tadinya 600/800 pada elemen-elemen itu diturunkan ke 400, dan `letter-spacing`/`line-height` disesuaikan tipis supaya tetap proporsional — termasuk siluet watermark "FLAID" di Hero tetap terlihat solid/tebal walau kini pakai berat huruf regular.
- Font body (subjudul, nav, eyebrow) tetap **Hanken Grotesk**, font mono (eyebrow, indikator scroll) tetap **JetBrains Mono** — hanya font utama/display yang diganti, sesuai permintaan.
- Markup dipecah jadi komponen (`Nav`, `Hero`, `About`, `Grain`); semua kode GSAP/ScrollTrigger dipindah ke `onMount` masing-masing komponen karena SvelteKit merender di server dulu — kode yang menyentuh DOM harus jalan di browser.
- Elemen huruf yang dibuat lewat JavaScript (`.letter` pada komposisi ABOUT/MYSELF) diberi selector `:global()` di `<style>` supaya scoping CSS Svelte tetap mengenainya (elemen yang dibuat lewat `document.createElement` tidak otomatis kena scope Svelte).

Semua warna, spacing, dan urutan animasi scroll-nya sama persis dengan versi HTML — cuma typografi utamanya yang berubah.
