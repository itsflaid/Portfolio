import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
	lenis = instance;
}

export function scrollToTarget(target: string) {
	if (lenis) {
		lenis.scrollTo(target, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
	} else {
		document.querySelector(target)?.scrollIntoView();
	}
}
