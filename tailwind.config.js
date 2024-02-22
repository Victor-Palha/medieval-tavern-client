/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#F1B711",
        secondary: "#FAF2C1",
      }
    },
  },
  plugins: [],
}

