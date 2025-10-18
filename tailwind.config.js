/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FDFBF8',
          100: '#FBF6F1',
          200: '#F0E5DE',
          300: '#D5A08C',
          400: '#C18B6F',
          500: '#AF6B51',
          600: '#9c5f48',
          700: '#8a533f',
          800: '#784736',
          900: '#663b2d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
