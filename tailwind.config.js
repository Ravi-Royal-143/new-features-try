/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  darkMode: ['class', '.theme-dark'],
  corePlugins: {
    preflight: false, // keep Material/Angular styles intact
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
