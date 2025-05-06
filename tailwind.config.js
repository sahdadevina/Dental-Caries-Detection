/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        blue: {
          50: '#E6F1F8',
          100: '#CCE3F1',
          200: '#99C7E3',
          300: '#66ABD5',
          400: '#338FC7',
          500: '#0077B6',
          600: '#005E92',
          700: '#00476D',
          800: '#002F49',
          900: '#001824',
        },
        teal: {
          50: '#E6F9FC',
          100: '#CCF3F9',
          200: '#99E7F3',
          300: '#66DBEC',
          400: '#33CFE6',
          500: '#00B4D8',
          600: '#0090AD',
          700: '#006C82',
          800: '#004856',
          900: '#00242B',
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s infinite',
      },
    },
  },
  plugins: [],
};