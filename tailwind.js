const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: [
    "./pages/**/*.vue", 
    "./components/**/*.vue", 
    "./plugins/**/*.vue",
    "./static/**/*.vue",
    "./store/**/*.vue"
  ],
  theme: {
    fontFamily: {
      sans: ['Montserrat'],
    },
    fontSize: {
      xxs: '.5rem',
      ...defaultTheme.fontSize
    },
    screens: {
      xs: '1px',
      ...defaultTheme.screens
    },
    extend: {
      colors: {
        blueshine: "#3400FA",
        azure: "#00e7ff",
        lagune: "#00BED5",
        cream: "#ECFDFF",
        dutchorange: "#FA6060",
        magentashine: "#C901A1",
        deepmagenta: "#710B79",
        universe: "#121634",
        universelight: "#1e2666",
        oldpurple: "#252083",
        sandpurple: "#26327F"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
