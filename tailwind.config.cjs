/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      colors: {
        background: "#ECECEC",
        primary: {
          1: "#0F766E",
          2: "#0284C7",
        }
        
      }
    },
  },
  plugins: [],
}
