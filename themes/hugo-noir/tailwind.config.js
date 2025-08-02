/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Enable dark mode support
  content: ["./layouts/**/*.html", "./content/**/*.{html,md}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['LINESeedTW_OTF_Rg', 'Space Grotesk', 'sans-serif'],
        bold: ['LINESeedTW_OTF_Bd', 'Space Grotesk', 'sans-serif'],
        extrabold: ['LINESeedTW_OTF_Eb', 'Space Grotesk', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 