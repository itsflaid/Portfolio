import { writable } from 'svelte/store';

export type Lang = 'en' | 'id';

export const caseStudyLang = writable<Lang>('en');