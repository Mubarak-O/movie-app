/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"secondary-colour": "#05010D",
				"accent-colour": "#73A4A6",
			},
			fontFamily: {
				k2d: ["K2D", "sans-serif"],
				maven: ["Maven Pro", "sans-serif"],
				rubik: ["Rubik", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
