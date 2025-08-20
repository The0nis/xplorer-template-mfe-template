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
      backgroundImage:{
        authBackground: "url('/img/auth_background.svg')",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
