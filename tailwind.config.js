const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        sky: colors.sky,
        emerald: colors.emerald,
      },
    },
  },
  variants: {
    extend: {
      scale: ['hover'],
      border: ['hover'],
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
