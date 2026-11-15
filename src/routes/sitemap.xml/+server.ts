import { absoluteUrl } from '$lib/seo';

export const prerender = true;

const pages = [
	{ path: '', changefreq: 'monthly', priority: '1.0' },
	{ path: 'jasa', changefreq: 'monthly', priority: '0.9' },
	{ path: 'jasa/studi-kasus/katalyst', changefreq: 'monthly', priority: '0.6' },
	{ path: 'projects', changefreq: 'monthly', priority: '0.7' }
];

export function GET() {
	const lastmod = new Date().toISOString().slice(0, 10);
	const urls = pages
		.map(
			(page) => `	<url>
		<loc>${absoluteUrl(page.path)}</loc>
		<lastmod>${lastmod}</lastmod>
		<changefreq>${page.changefreq}</changefreq>
		<priority>${page.priority}</priority>
	</url>`
		)
		.join('\n');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`,
		{
			headers: {
				'Content-Type': 'application/xml; charset=utf-8'
			}
		}
	);
}
