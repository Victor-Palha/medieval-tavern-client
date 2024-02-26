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
        "gear-rotate": "GearRotate 2s ",
        "overlayShow": 'overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',
        "contentShow": 'contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1)',

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
        GearRotate: {
          "0%, 70%": {
              transform: "rotate(180deg)"
          },
          "70%, 100%": {
              transform: "rotate(-180deg)"
          },
        },
        overlayShow: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        contentShow: {
          from: { opacity: '0', transform: 'translate(-50%, -48%) scale(0.96)' },
          to: { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' },
        },
      }
    },
  },
  plugins: [],
}

