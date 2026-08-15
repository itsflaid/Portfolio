import { writable } from 'svelte/store';

export type Lang = 'en' | 'id';

/**
 * Language for case study modal copy only (not a site-wide i18n system —
 * scope is deliberately small). Defaults to English; the person can flip
 * to Indonesian per-session via the toggle inside the modal.
 */
export const caseStudyLang = writable<Lang>('en');