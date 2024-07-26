/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"primary-colour": "#131112",
				"secondary-colour": "#242629",
				"accent-colour": "#cd1c3c",
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
