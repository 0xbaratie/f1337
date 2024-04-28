/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF3131',
          text: '#FF3131',
          hover: '#FF8585',
        },
      },
      fontFamily: {
        mincho: ['ShipporiMincho'],
      },
      fontWeight: {
        normal: '400',
        bold: '700',
        extrabold: '800',
      }
    },
  },
  plugins: [require("daisyui")],
}

