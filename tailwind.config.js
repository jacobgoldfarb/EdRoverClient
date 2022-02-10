const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './pages/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        blue: '#1D3FB5',
        purple: '#7715C3',
        white: '#fff',
        ...colors,
      },
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
        body: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        header: ['Montserrat', 'Helvetica', 'Arial', 'sans-serif'],
        ...defaultTheme.fontFamily,
      },
      boxShadow: {
        bold: '0 1px 2px 0 rgba(0, 0, 0, 0.30)',
        black: '4px 4px 0 8px rgba(0, 0, 0, 1)',
        black2: '2px 2px 0 4px rgba(0, 0, 0, 1)',
        bottom: '0 2px 2px -2px rgba(0, 0, 0, 1)',
        ...defaultTheme.boxShadow,
      },
      minWidth: {
        '1/4': '25%',
        '1/5': '20%',
      },
      maxWidth: {
        '1/4': '25%',
        '1/5': '20%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
