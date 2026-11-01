import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { landingTemplates } from '$lib/data/jasa';

export function load() {
	return {
		templates: landingTemplates.map((t) => ({
			...t,
			thumb: existsSync(resolve('static', t.thumb.slice(1))) ? t.thumb : ''
		}))
	};
}
