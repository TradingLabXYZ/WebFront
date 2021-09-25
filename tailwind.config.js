module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'montserrat': ['Montserrat']
      },
      colors: {
        header: '#00BED5',
        tradehero: "#3400FA"
      }
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even'],
      fontSize: ['hover'],
      fontWeight: ['hover'],
    },
  },
  plugins: [],
}
