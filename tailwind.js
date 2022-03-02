const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: [],
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
        deepgray: "#104248",
        azure: "#00e7ff",
        lagune: "#00BED5",
        deeplagune: "#018291",
        softlagune: "#6ADFED",
        verysoftcyan: "#AEEBF3",
        cream: "#ECFDFF",
        dutchorange: "#FA6060",
        magentashine: "#C901A1",
        deepviolet: "#1B064C",
        deepmagenta: "#710B79",
        deeppurple: "#4200FF",
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
