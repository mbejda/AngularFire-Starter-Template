/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          sm: '2rem',

        },
        screens: {
          sm: '100%',
          md: '1200px',
        }

      },
    },
  },
  plugins: [require('tailwindcss-primeui')]
}
