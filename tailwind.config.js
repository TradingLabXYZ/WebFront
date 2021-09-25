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
        header: "#00BED5",
        tradehero: "#3400FA",
        tradetablehead: "#D2F8FD",
        tradepositive: "#00BED5",
        tradenegative: "#FA6060",
        tradenew: "#D2F8FD",
        subtradenew: "#AEEBF3",
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
