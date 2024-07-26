/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{vue,js,ts}"
  ],
  theme: {
    extend: {},
    screens: {
      'pp': {'max': '325px'}, // Até 639px
      'p': {'max': '425px'}, // Até 639px
      'sm': {'max': '640px'}, // Até 639px
      'md': {'max': '768px'}, // Até 767px
      'lg': {'max': '1024px'}, // Até 1023px
      'xl': {'max': '1280px'}, // Até 1279px
    },
  },
  plugins: [],
}

