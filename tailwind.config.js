module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat"]
      },
      colors: {
        // fonts
        tradebigtext: "#104248",
        tradesmalltext: "#1A1A1A",
        // backgrounds
        header: {
          light: "#00e7ff",
          DEFAULT: "#00BED5",
          dark: "#018291",
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
        tradenewbuttoncancel: "#B8E7EF"
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ["even"],
      fontSize: ["hover"],
      fontWeight: ["hover"],
    },
  },
  plugins: [],
}
