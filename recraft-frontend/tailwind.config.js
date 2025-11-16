/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/pages/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'brand-cream': '#FDF6E3',
        'brand-green': '#556B2F',
        'brand-green-dark': '#445625',
        'brand-brown': '#8B4513',
        'brand-brown-dark': '#65340B',
        'dark-blue': '#1E3A8A',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

module.exports = config;
