import siraUI from '@sira-ui/tailwind';

/** @type {import('tailwindcss').Config} */
const config = {
	content: [
		'./index.html',
		'./src/**/*.{vue,js,ts,jsx,tsx}',
	],
	darkMode: 'class',
	plugins: [
		siraUI({
			themes: [
				{
					name: 'light',
					colorScheme: 'light',
					colors: {
						primary: [
							'#E8F5E9',
							'#C8E6C9',
							'#A5D6A7',
							'#81C784',
							'#66BB6A',
							'#4CAF50',
							'#43A047',
							'#388E3C',
							'#2E7D32',
							'#1B5E20',
							'#0F4C1E',
							'#0A3614',
						],
					},
				},
			],

		}),

	],
	theme: {
		extend: {
			colors: {
				primary: {
					50: '#E8F5E9',
					100: '#C8E6C9',
					200: '#A5D6A7',
					300: '#81C784',
					400: '#66BB6A',
					500: '#4CAF50',
					600: '#43A047',
					700: '#388E3C',
					800: '#2E7D32',
					900: '#1B5E20',
					1000: '#0F4C1E',
					1100: '#0A3614',
				},
				secondary: {
					50: '#F1F8E9',
					100: '#DCEDC8',
					200: '#C5E1A5',
					300: '#AED581',
					400: '#9CCC65',
					500: '#8BC34A',
					600: '#7CB342',
					700: '#689F38',
					800: '#558B2F',
					900: '#33691E',
				},
				gray: {
					100: '#f7fafc',
					200: '#edf2f7',
					300: '#e2e8f0',
					400: '#cbd5e0',
					450: '#D0D0D0',
					500: '#a0aec0',
					600: '#718096',
					700: '#4a5568',
					800: '#2d3748',
					900: '#1a202c',
				},
				white: '#ffffff',
			},
		},
	},
};

export default config;
