import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				ink: '#0A0A0A',
				paper: '#E8E8E5',
				'fg-dark': '#F1F1EF',
				'fg-dim': '#5a5a5a',
				gray: '#8A8A85',
				'ink-soft': '#2A2A28',
				'accent-ph': '#3A3A38'
			},
			fontFamily: {
				display: ['"Bebas Neue"', 'sans-serif'],
				body: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
				mono: ['"JetBrains Mono"', '"Courier New"', 'monospace']
			}
		}
	},
	plugins: []
} satisfies Config;
