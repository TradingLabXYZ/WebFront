module.exports = {
  "plugins": [
    require('tailwindcss')('tailwind.js'),
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {})
  ]
}
