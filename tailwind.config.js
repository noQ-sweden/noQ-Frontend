/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "background-white": "#F7F7F7", // used as UI background
        white: "#FDFDFD", // used as white
        grey: "#AFAFAF", // used for navigation for non active elements
        "green-noQ": "#255B57", // used as contrast in navigation
        "green-noQ-comp": "#f7f6f4", //Complementary color to green-noQ

        "Request-ButtonText-Green": "#255B57",
        "Request-ButtonColor-Green": "#255B57",
        "Request-ButtonBorder-Green": "#255B57",

        "Request-ButtonText-red": "#DC2A2A",
        "Request-ButtonColor-red": "#DC2A2A",
        "Request-ButtonBorder-red": "#DC2A2A",
      },
      spacing: {
        card: "1rem",
      },
    },
    variants: { backgroundColor: ["responsive", "hover", "focus", "active"] },
  },
  plugins: [],
};
