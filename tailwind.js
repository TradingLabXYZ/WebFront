const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
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
        // fonts
        tradebigtext: "#104248",
        tradesmalltext: "#1A1A1A",
        // backgrounds
        header: {
          light: "#00e7ff",
          DEFAULT: "#00BED5",
          dark: "#018291",
          ultradark: "#013940",
        },
        popoverUserConsole: {
          text: "#B1ADAD"
        },
        tradehero: "#3400FA",
        tradetablehead: "#D2F8FD",
        tradepositive: "#00BED5",
        tradenegative: "#FA6060",
        tradenew: "#D2F8FD",
        subtradenew: "#AEEBF3",
        subtradesection: "#ECFDFF",
        subtradeeditable: "#D0F9FF",
        subtradeeditableborder: "#6ADFED",
        tradenewbuttonconfirm: "#3400FA", 
        tradenewbuttoncancel: "#B8E7EF",
        homebutton: "#C901A1",
        homeherotext: "#1B064C",
        hometextband: "#710B79"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
