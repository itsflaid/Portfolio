export function reveal(node: HTMLElement, delay = 0) {
	node.classList.add('rv');
	if (delay) node.style.setProperty('--rv-d', `${delay}ms`);

	if (typeof IntersectionObserver === 'undefined') {
		node.classList.add('in');
		return;
	}

	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
	);
	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
