const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,css,jsx}"],
  theme: {
    extend: {
      colors:{
        primary:colors.yellow,
      },
    },
  },
  plugins: [],
}

