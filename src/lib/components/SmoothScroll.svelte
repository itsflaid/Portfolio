<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { setLenis } from '$lib/scroll';

	let lenis: Lenis | null = null;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		// ---- Refresh terpusat, sekali aja ----
		// Sebelumnya About.svelte & Work.svelte masing-masing punya listener
		// window 'load' sendiri yang manggil ScrollTrigger.refresh() (global —
		// re-measure SEMUA trigger di halaman, bukan cuma punya masing-masing).
		// Ditambah GSAP sendiri juga auto-refresh di 'load' secara default.
		// Totalnya jadi 2-3x full-refresh beruntun tiap kali halaman kelar
		// dimuat. Ini selalu ada dari dulu, tapi baru kerasa jadi "double
		// refresh"/jump sejak Manifesto masuk — timeline-nya paling berat di
		// halaman (banyak getBoundingClientRect + puluhan tween), jadi tiap
		// refresh ekstra itu kena biaya besar & keliatan sebagai kedip/lompat.
		//
		// 'load' dicabut dari autoRefreshEvents bawaan GSAP, dan satu-satunya
		// refresh manual ditunda sampai window 'load' DAN font (Bebas Neue dkk,
		// font-display: swap — bisa nyusul kapan aja, nggak terikat 'load')
		// sama-sama siap, biar ukuran section yang dipakai buat itung jarak
		// pin (termasuk Manifesto) udah final saat di-refresh.
		ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,resize' });

		let cancelled = false;
		const fontsReady = document.fonts?.ready ?? Promise.resolve();
		const loadReady =
			document.readyState === 'complete'
				? Promise.resolve()
				: new Promise<void>((resolve) => window.addEventListener('load', () => resolve(), { once: true }));

		Promise.all([fontsReady, loadReady]).then(() => {
			if (!cancelled) ScrollTrigger.refresh();
		});

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return () => {
				cancelled = true;
			};
		}

		lenis = new Lenis({
			duration: 1.1,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
		});
		setLenis(lenis);

		lenis.on('scroll', ScrollTrigger.update);

		const raf = (time: number) => {
			lenis?.raf(time * 1000);
		};
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			cancelled = true;
			gsap.ticker.remove(raf);
			lenis?.destroy();
			lenis = null;
			setLenis(null);
		};
	});
</script>

<slot />