const {nextui} = require('@nextui-org/theme');

const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,css,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors:{
        primary:colors.yellow,
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}

