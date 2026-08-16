import { writable } from 'svelte/store';

export type ScrollMode = 'manual' | 'auto';

export const scrollMode = writable<ScrollMode>('manual');