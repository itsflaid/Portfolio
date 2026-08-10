// Update these three fields to match whatever you actually drop in
// static/resume.pdf — nothing here reads the file itself, it's just the
// metadata shown in the gate modal before the real download happens.
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