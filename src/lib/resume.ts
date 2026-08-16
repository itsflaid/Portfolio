export const RESUME = {
	href: '/resume.pdf',
	downloadName: 'Muhammad-Fadil-Resume.pdf',
	pages: '2 halaman',
	size: '480 KB',
	updated: 'AGU 2026'
};

let openFn: (() => void) | null = null;

export function registerResumeModal(fn: () => void) {
	openFn = fn;
}

export function openResumeModal() {
	openFn?.();
}