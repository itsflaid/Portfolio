import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'normal' | 'neo';

export const THEME_KEY = 'flaid-theme';

function initialTheme(): Theme {
	// app.html sets data-theme before hydration, so the store and the DOM agree.
	if (browser && document.documentElement.getAttribute('data-theme') === 'neo') return 'neo';
	return 'normal';
}

export const theme = writable<Theme>(initialTheme());

function applyTheme(next: Theme) {
	if (!browser) return;
	const root = document.documentElement;
	if (next === 'neo') root.setAttribute('data-theme', 'neo');
	else root.removeAttribute('data-theme');
	try {
		localStorage.setItem(THEME_KEY, next);
	} catch {
		/* storage can be blocked; the toggle still works for this visit */
	}
}

/** Call once after the first client render: lifts the pre-paint cover set by app.html. */
export function revealApp() {
	if (browser) document.documentElement.removeAttribute('data-boot');
}

export function setTheme(next: Theme) {
	applyTheme(next);
	theme.set(next);
	if (browser) window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
}

export function toggleTheme(current: Theme) {
	setTheme(current === 'neo' ? 'normal' : 'neo');
}
