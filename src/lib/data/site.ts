export const SITE = {
	name: 'MUHAMMAD FADIL',
	brand: 'FLAID',
	email: 'mfadil.coder@gmail.com',
	github: 'https://github.com/itsflaid',
	linkedin: 'https://www.linkedin.com/in/muhammad-fadil-1264b82a9',
	instagram: 'https://www.instagram.com/sebutsajamf?igsh=N2xjdnVobmthdGU0',
	location: 'Kutai Kartanegara, ID'
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
