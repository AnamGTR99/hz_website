/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandBlack: '#3a3434',
        brandRed: '#c13333',
      },
      fontFamily: {
        sans: ['Helvetica', 'Arial', 'sans-serif'],
      },
      fontWeight: {
        normal: '700',
        bold: '700',
      },
    },
  },
  plugins: [],
}

