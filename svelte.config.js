import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		prerender: {
			handleMissingId: 'ignore',
			// /resume.pdf is not committed to the repo; the Resume links must not break the build.
			// Every other 404 still fails the build.
			handleHttpError: ({ path, message }) => {
				if (path === '/resume.pdf') return;
				throw new Error(message);
			}
		}
	}
};

export default config;
