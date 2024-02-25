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
        font: "#464135",
        loadingStart: "#F6F6F6",
        loadingEnd: "#F0F0F0",
      },
      animation: {
        "bounce-small": "bounceSmall 1s infinite",
        "background": "placeHolderShimmer 1.25s linear infinite"
      },
      keyframes: {
        bounceSmall: {
            "0%, 100%": {
                transform: "translateY(-2%)"
            },
            "50%": {
                transform: "none"
            }
        },
        placeHolderShimmer: {
            "0%": {
              backgroundPosition: "-468px 0"
            },
            "100%": {
                backgroundPosition: "468px 0"
            }
        }
      }
    },
  },
  plugins: [],
}

