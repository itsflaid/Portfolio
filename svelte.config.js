import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			handleMissingId: 'ignore',
			// /resume.pdf tidak ikut di-commit, jadi link Resume tidak boleh membuat build gagal.
			// 404 lainnya tetap menggagalkan build.
			handleHttpError: ({ path, message }) => {
				if (path === '/resume.pdf') return;
				throw new Error(message);
			}
		}
	}
};

export default config;
