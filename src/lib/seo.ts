import { SITE } from '$lib/data/site';

// SITE.url sudah berakhir slash; normalisasi agar tetap aman kalau nilainya diubah.
export const SITE_URL = SITE.url.endsWith('/') ? SITE.url : `${SITE.url}/`;

export function absoluteUrl(path = ''): string {
	return new URL(path.replace(/^\/+/, ''), SITE_URL).toString();
}

export const OG_IMAGE = {
	url: absoluteUrl('og-image.png'),
	width: 2848,
	height: 1504,
	alt: 'Muhammad Fadil (Flaid) — fullstack developer dan jasa pembuatan website'
} as const;

// `<` harus di-escape agar isi JSON tidak bisa menutup tag <script>.
export function serializeJsonLd(data: unknown): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}
