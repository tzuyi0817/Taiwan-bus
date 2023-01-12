/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["Monda", "Noto Sans TC", "sans-serif"],
    },
    colors: {
      primary: '#283C43',
      secondary: '#D08181',
      blue: '#3591C5',
      'blue-dark': '#283C43',
      green: '#7FC0C5',
      'green-dark': '#52797C',
      teal: '#5E9BAE',
      gray: {
        100: '#F5F6F6',
        300: '#EEEEEE',
        500: '#D5D5D5',
        600: '#888888',
        700: '#444444',
        900: '#000000',
      },
    },
    extend: {},
  },
  plugins: [],
}