import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { webTemplates } from '$lib/data/jasa';

export function load() {
	return {
		templates: webTemplates.map((t) => ({
			...t,
			thumb: existsSync(resolve('static', t.thumb.slice(1))) ? t.thumb : ''
		}))
	};
}
