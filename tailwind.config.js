/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, rgba(2,0,36,1) 0%, rgba(166,85,163,0.978) 32%)',
      },
      colors:{
        primary: "0F9DF8",
        white: "FBFBFB",
        beige: '#fed7aa',
        rose: '#f43f5e',
      }
    },
  },
  plugins: [],
}