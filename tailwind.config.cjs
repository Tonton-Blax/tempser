/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    },
    colors: {
      transparent: 'transparent',
      'white' : '#fff',
      'white-light': '#fafafa',
      gray: colors.gray,
      'great-blue': {
        DEFAULT: '#2A669F',
        '50': '#E4F7F8',
        '100': '#CCEEF2',
        '200': '#9CD7E5',
        '300': '#6CB9D8',
        '400': '#3B94CB',
        '500': '#2A669F',
        '600': '#234B83',
        '700': '#1B3366',
        '800': '#14204A',
        '900': '#0C102E'
      },   
      'other-white': {
        DEFAULT: '#FFFFFF',
        '50': '#FFFFFF',
        '100': '#FFFFFF',
        '200': '#FFFFFF',
        '300': '#FFFFFF',
        '400': '#FFFFFF',
        '500': '#FFFFFF',
        '600': '#E3E3E3',
        '700': '#C7C7C7',
        '800': '#ABABAB',
        '900': '#8F8F8F'
      },
      'mex-red': {
        DEFAULT: '#9F2A2A',
        '50': '#F8EBE4',
        '100': '#F2D7CC',
        '200': '#E5AC9C',
        '300': '#D87B6C',
        '400': '#CB463B',
        '500': '#9F2A2A',
        '600': '#83232A',
        '700': '#661B26',
        '800': '#4A1420',
        '900': '#2E0C16'
      },
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
