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
      animation: {
        'horizontal-slide': 'slide 1.5s ease-in-out infinite',
      },
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
