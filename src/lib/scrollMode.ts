import { writable } from 'svelte/store';

export type ScrollMode = 'manual' | 'auto';

/**
 * Mode scroll sesi berjalan (tanpa localStorage). Welcome screen selalu muncul
 * setiap buka situs, jadi mode dipilih ulang tiap kunjungan — cukup sesi.
 */
export const scrollMode = writable<ScrollMode>('manual');