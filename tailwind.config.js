module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
    },
    colors: {
      bg_dark: "#0c0c0c",
      bg_light: "#101010",
      bg_lighter: "#202020",

      text_dark: "#320e65",
      text_ligh: "#9548fd",
      text_lighter: "#ede0ff",

      gray_dark: "#b3b3b3",
      gray_light: "#e2e2e2",
      gray_lighter: "#f4f4f4",

      black: "#000",
      white: "#fff",
      // ...
    },
    fontFamily: {
      sans: "Poppins, Helvetica, Arial, sans-serif",
    },
  },
  plugins: [require("flowbite/plugin")],
};
