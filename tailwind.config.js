module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {},
    colors: {
      bg_dark: '#0c0c0c',
      heading_dark: '#e2e2e2',
      my_color: '#7f22fd',
      secondary: '#ecc94b',
      // ...
    },
    fontFamily: {
        'sans': 'Poppins, Helvetica, Arial, sans-serif',
     }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

