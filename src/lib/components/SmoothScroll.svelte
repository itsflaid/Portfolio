<script lang="ts">
	import { onMount } from 'svelte';
	import Lenis from 'lenis';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';

	let lenis: Lenis | null = null;

	onMount(() => {
		gsap.registerPlugin(ScrollTrigger);

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		lenis = new Lenis({
			duration: 1.1,
			easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
		});

		lenis.on('scroll', ScrollTrigger.update);

		const raf = (time: number) => {
			lenis?.raf(time * 1000);
		};
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		return () => {
			gsap.ticker.remove(raf);
			lenis?.destroy();
			lenis = null;
		};
	});
</script>

<slot />
