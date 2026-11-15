import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	if (!event.url.pathname.startsWith('/jasa')) return resolve(event);

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('<html lang="en"', '<html lang="id"')
	});
};
