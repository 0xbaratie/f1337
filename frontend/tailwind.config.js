/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8264CA',
          text: '#8A63D2',
        },
      },
    },
  },
  plugins: [require("daisyui")],
}

