/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/routes/**/*.{svelte,ts,js}',
		'./src/internal/**/*.{svelte,ts,js}',
		'./src/app.html'
	],
	theme: {
		extend: {
			container: {
				center: true
			}
		}
	},
	plugins: []
};
