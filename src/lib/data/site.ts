export const SITE = {
	name: 'MUHAMMAD FADIL',
	brand: 'FLAID',
	email: 'mfadil.coder@gmail.com',
	github: 'https://github.com/itsflaid',
	linkedin: 'https://www.linkedin.com/in/muhammad-fadil-1264b82a9',
	instagram: 'https://www.instagram.com/sebutsajamf?igsh=N2xjdnVobmthdGU0',
	npm: 'https://www.npmjs.com/~fadilz',
	tiktok: 'https://www.tiktok.com/@itsflaid',
	location: 'Kutai Kartanegara, ID',
	url: 'https://itsflaid.my.id'
} as const;

export type NavLink = { label: string; href: string };

export const navLinks: NavLink[] = [
	{ label: 'ABOUT', href: '#about' },
	{ label: 'PROJECTS', href: '#projects' },
	{ label: 'SKILLS', href: '#skills' },
	{ label: 'CONTACT', href: '#contact' }
];

export const socials: NavLink[] = [
	{ label: 'GITHUB', href: SITE.github },
	{ label: 'LINKEDIN', href: SITE.linkedin },
	{ label: 'INSTAGRAM', href: SITE.instagram }
];


export const sameAs: string[] = [
	SITE.github,
	SITE.linkedin,
	SITE.instagram,
	SITE.npm,
	SITE.tiktok,
	'https://github.com/mufacoderz',
];