/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      montserrat: 'Montserrat, sans-serif'
    },
    screens: {
      mobile: { min: '350px', max: '450px' }
    }
  },
  plugins: []
}
