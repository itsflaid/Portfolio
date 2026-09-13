<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { setLenis } from '$lib/scroll';

	let lenis: Lenis | null = null;

	onMount(() => {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}
		window.scrollTo(0, 0);

		gsap.registerPlugin(ScrollTrigger);

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
			lerp: 0.085,
			wheelMultiplier: 0.9
		});
		setLenis(lenis);

		lenis.on('scroll', ScrollTrigger.update);

		// Batas waktu (ms) maksimum yang boleh "dilihat" Lenis dalam satu tick.
		// Kalau main thread stall lebih lama dari ini, kelebihannya dibuang,
		// bukan diteruskan ke Lenis — animasi cuma lanjut normal begitu frame
		// jalan lagi, bukan "bayar utang" loncat jauh sekaligus.
		const MAX_RAF_STEP_MS = 50;
		let virtualTime = 0;
		let lastRealTime = 0;

		const raf = (time: number) => {
			const realTime = time * 1000;
			const rawDelta = lastRealTime === 0 ? 0 : realTime - lastRealTime;
			lastRealTime = realTime;
			virtualTime += Math.min(rawDelta, MAX_RAF_STEP_MS);
			lenis?.raf(virtualTime);
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