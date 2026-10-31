/**
 * Reveal seragam untuk section "biasa": satu fade-up sekali jalan, tanpa pin/scrub.
 * Pakai: <div use:reveal> atau <div use:reveal={{ delay: 0.1 }}>
 * Konten tetap terlihat kalau JS mati / prefers-reduced-motion.
 */
export type RevealOptions = { delay?: number; y?: number; duration?: number };

export function reveal(node: HTMLElement, opts: RevealOptions = {}) {
	if (typeof window === 'undefined') return {};
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
	if (!('IntersectionObserver' in window)) return {};

	const { delay = 0, y = 28, duration = 0.9 } = opts;
	node.style.opacity = '0';
	node.style.transform = `translate3d(0, ${y}px, 0)`;

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.animate(
					[
						{ opacity: 0, transform: `translate3d(0, ${y}px, 0)` },
						{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
					],
					{
						duration: duration * 1000,
						delay: delay * 1000,
						easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
						fill: 'both'
					}
				).finished.then(() => {
					node.style.opacity = '';
					node.style.transform = '';
					node.getAnimations().forEach((a) => a.cancel());
				});
				io.disconnect();
			}
		},
		{ rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
	);
	io.observe(node);

	return { destroy: () => io.disconnect() };
}
