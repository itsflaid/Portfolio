export type ExperienceEntry = {
	side: 'left' | 'right';
	date: string;
	type: string;
	title: string;
	org: string;
	desc?: string;
};

export const entries: ExperienceEntry[] = [
	{
		side: 'left',
		date: 'JUL 2021 — MAR 2024',
		type: 'EDUCATION',
		title: 'COMPUTER ENGINEERING & NETWORKING',
		org: 'SMK Muhammadiyah Loa Janan',
		desc: 'Started my journey in IT, building a foundation in computer systems, hardware & networking.'
	},
	{
		side: 'right',
		date: 'JUL — DEC 2022',
		type: 'EXPERIENCE',
		title: 'PRAKTIK KERJA INDUSTRI - LOGISTICS',
		org: 'PT. Anugerah Bara Kaltim',
		desc: 'Worked in a real-world mining logistics environment, handling inventory records, checking incoming goods, and scanning docs.'
	},
	{
		side: 'left',
		date: 'AUG 2024 — PRESENT',
		type: 'EDUCATION',
		title: 'INFORMATION SYSTEM (S1)',
		org: 'UIN Sultan Aji Muhammad Idris Samarinda',
		desc: 'Studying information systems, with coursework in web dev, databases, software eng, & UI/UX'
	},
	{
		side: 'right',
		date: 'SEP 2024 — PRESENT',
		type: 'SELF-TAUGHT',
		title: 'Full-Stack Development',
		org: 'Independent',
		desc: 'Learning by building through personal projects, courses, youtube tutorials, & community events'
	}
];
