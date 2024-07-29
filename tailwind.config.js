/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-colour": "#131112",
				"secondary-colour": "#282828",
				"accent-colour": "#A61731",
			},
			fontFamily: {
				k2d: ["K2D", "sans-serif"],
				maven: ["Maven Pro", "sans-serif"],
				rubik: ["Rubik", "sans-serif"],
				poppins: ["Poppins", "sans-serif"],
			},
		},
	},
	plugins: [require("tailwind-scrollbar-hide")],
};
