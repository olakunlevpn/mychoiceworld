/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#edfafa',
          100: '#d1f1f2',
          200: '#aae4e7',
          300: '#75d1d6',
          400: '#46b2ba',
          500: '#2b969e',
          600: '#14878E',
          700: '#1b646c',
          800: '#1a5157',
          900: '#19444a',
        },
        dark: '#020202',
        light: '#F5F5F5',
      },
      fontFamily: {
        sans: ['Urbanist', 'sans-serif'],
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
