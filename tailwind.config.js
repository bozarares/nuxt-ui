import aspect from "@tailwindcss/aspect-ratio";
import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	// content: [
	// './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
	// './storage/framework/views/*.php',
	// './resources/views/**/*.blade.php',
	// './resources/js/**/*.vue',
	// ],
	darkMode: ["class"],
	theme: {
		extend: {
			fontFamily: {
				sans: [
					"Rubik",
					// 'Poppins',
					"Figtree",
					...defaultTheme.fontFamily.sans,
				],
			},
		},
	},

	// plugins: [forms, typography, aspect],
};
