import type Lenis from 'lenis';

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
	lenis = instance;
}

export function getLenis() {
	return lenis;
}

export function stopLenis() {
	lenis?.stop();
}

export function startLenis() {
	lenis?.start();
}

export function scrollToTarget(target: string) {
	const to = target === '#top' ? 0 : target;
	if (lenis) {
		lenis.scrollTo(to, { duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
	} else if (to === 0) {
		window.scrollTo({ top: 0 });
	} else {
		document.querySelector(to)?.scrollIntoView();
	}
}

export function jumpToTop() {
	if (lenis) {
		lenis.scrollTo(0, { immediate: true });
	} else {
		window.scrollTo({ top: 0 });
	}
}