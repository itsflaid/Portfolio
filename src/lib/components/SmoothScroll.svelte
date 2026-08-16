<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { setLenis } from '$lib/scroll';

	let lenis: Lenis | null = null;

	onMount(() => {
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