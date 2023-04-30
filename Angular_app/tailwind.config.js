/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{html,ts}",],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      white: "#ffffff",
      purple: "#3f3cbb",
      midnight: "#121063",
      red: "rgb(244 63 94)",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
      cream: "#fbf7f2",
      "shiny-green": "#52E782",
      gray: "#C7C6C2",
      ...colors,
    },
    fontFamily: {
      poppins: ["Poppins"],
    },
  },

  plugins: [],
};
