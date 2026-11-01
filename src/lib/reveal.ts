export type RevealOptions = { delay?: number; y?: number; duration?: number };

export function reveal(node: HTMLElement, opts: RevealOptions = {}) {
	if (typeof window === 'undefined') return {};
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return {};
	if (!('IntersectionObserver' in window)) return {};

	const { delay = 0, y = 28, duration = 0.9 } = opts;
	const hiddenTransform = `translate3d(0, ${y}px, 0)`;
	let anim: Animation | null = null;

	const hide = () => {
		anim?.cancel();
		anim = null;
		node.style.opacity = '0';
		node.style.transform = hiddenTransform;
	};

	const show = () => {
		anim?.cancel();
		anim = node.animate(
			[
				{ opacity: 0, transform: hiddenTransform },
				{ opacity: 1, transform: 'translate3d(0, 0, 0)' }
			],
			{
				duration: duration * 1000,
				delay: delay * 1000,
				easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
				fill: 'both'
			}
		);
		anim.finished
			.then(() => {
				node.style.opacity = '';
				node.style.transform = '';
			})
			.catch(() => {});
	};

	hide();

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) show();
				else hide();
			}
		},
		{ rootMargin: '-8% 0px -8% 0px', threshold: 0 }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
			anim?.cancel();
		}
	};
}
