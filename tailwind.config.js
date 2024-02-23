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
        modal: "#F0C85B",
        font: "#464135"
      },
      animation: {
        "bounce-small": "bounceSmall 1s infinite",
      },
      keyframes: {
        bounceSmall: {
            "0%, 100%": {
                transform: "translateY(-2%)"
            },
            "50%": {
                transform: "none"
            }
        }
      }
    },
  },
  plugins: [],
}

