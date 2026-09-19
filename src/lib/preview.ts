/**
 * Shared hover/scroll video-preview behavior for project cards.
 * Mirrors the logic in the homepage Featured Projects section so any page
 * rendering `.media__pan` cards behaves identically.
 */
export type PreviewController = {
	pause: () => void;
	resume: () => void;
	destroy: () => void;
};

const VIDEO_SWAP_DELAY = 250;

export function setupPreviewVideos(container: HTMLElement): PreviewController {
	let modalOpen = false;
	const pausedPreviews = new Set<HTMLElement>();

	const pans = Array.from(container.querySelectorAll<HTMLElement>('.media__pan'));
	const swapTimers = new Map<HTMLElement, number>();
	const swapped = new Set<HTMLElement>();
	const primed = new Set<HTMLElement>();

	let activeVideoPan: HTMLElement | null = null;

	const clearSwapTimer = (pan: HTMLElement) => {
		const id = swapTimers.get(pan);
		if (id !== undefined) {
			window.clearTimeout(id);
			swapTimers.delete(pan);
		}
	};

	const primeVideo = (pan: HTMLElement, video: HTMLVideoElement) => {
		if (primed.has(pan)) return;
		primed.add(pan);
		video.preload = 'auto';
		video.load();
	};

	const playPanVideo = (pan: HTMLElement, video: HTMLVideoElement) => {
		if (activeVideoPan && activeVideoPan !== pan) {
			activeVideoPan.querySelector<HTMLVideoElement>('video')?.pause();
		}
		activeVideoPan = pan;
		pan.classList.add('is-video');
		video.play().catch(() => {});
	};

	const preloadObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;
				const pan = entry.target as HTMLElement;
				const video = pan.querySelector('video');
				if (!video) return;
				primeVideo(pan, video);
			});
		},
		{ threshold: 0, rootMargin: '40% 0px' }
	);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				const pan = entry.target as HTMLElement;
				const video = pan.querySelector('video');
				if (!video) return;
				if (entry.isIntersecting) {
					if (!swapped.has(pan)) {
						swapped.add(pan);
						primeVideo(pan, video);
						const id = window.setTimeout(() => {
							if (modalOpen) {
								swapTimers.delete(pan);
								swapped.delete(pan);
								return;
							}
							swapTimers.delete(pan);
							playPanVideo(pan, video);
						}, VIDEO_SWAP_DELAY);
						swapTimers.set(pan, id);
					} else {
						playPanVideo(pan, video);
					}
				} else {
					video.pause();
					if (activeVideoPan === pan) activeVideoPan = null;
					if (swapTimers.has(pan)) {
						clearSwapTimer(pan);
						swapped.delete(pan);
					}
				}
			});
		},
		{ threshold: 0.35 }
	);

	pans.forEach((pan) => {
		preloadObserver.observe(pan);
		observer.observe(pan);
	});

	const resetAll = () => {
		pans.forEach((pan) => {
			const video = pan.querySelector('video');
			if (!video) return;
			clearSwapTimer(pan);
			pan.classList.remove('is-video');
			swapped.delete(pan);
			primed.delete(pan);
			video.pause();
			video.currentTime = 0;
		});
	};

	const sectionObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) resetAll();
			});
		},
		{ threshold: 0 }
	);
	sectionObserver.observe(container);

	return {
		pause() {
			modalOpen = true;
			const livePans = Array.from(container.querySelectorAll<HTMLElement>('.media__pan'));
			pausedPreviews.clear();
			livePans.forEach((pan) => {
				const video = pan.querySelector('video');
				if (!video) return;
				if (!video.paused) pausedPreviews.add(pan);
				video.pause();
				pan.classList.remove('is-video');
			});
		},
		resume() {
			modalOpen = false;
			const livePans = Array.from(container.querySelectorAll<HTMLElement>('.media__pan'));
			livePans.forEach((pan) => {
				const video = pan.querySelector('video');
				if (!video) return;
				if (pausedPreviews.has(pan)) {
					pan.classList.add('is-video');
					video.play().catch(() => {});
				}
			});
			pausedPreviews.clear();
		},
		destroy() {
			swapTimers.forEach((id) => window.clearTimeout(id));
			preloadObserver.disconnect();
			observer.disconnect();
			sectionObserver.disconnect();
		}
	};
}
