/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/primeng/**/*.{html,ts}", // For PrimeNG components
  ],
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
  plugins: [
    require('tailwindcss-primeui')
  ]
}


