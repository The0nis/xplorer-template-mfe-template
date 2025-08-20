/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
      animation: {
        "progress-bar": "progress-bar 2s linear infinite",
        slideDown: "slideDown 0.9s ease-out",
        slideUp: "slideUp 0.9s ease-out",
        'horizontal-slide': 'slide 1.5s ease-in-out infinite'
      },
      keyframes: {
        "progress-bar": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        slideDown: {
          "0%": { maxHeight: "0", opacity: "0" },
          "100%": { maxHeight: "500px", opacity: "1" },
        },
        slideUp: {
          "0%": { maxHeight: "500px", opacity: "1" },
          "100%": { maxHeight: "0", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
