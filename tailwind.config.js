/*eslint-env node*/
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
        "grey-row": "#F3F4F6", // table row background
        "almost-black": "#2D2D2D",
        "green-noQ": "#255B57", // used as contrast in navigation
        "green-noQ-comp": "#f7f6f4", //Complementary color to green-noQ
        "grey-button-border": "#64748B",
        "secondary-soft":"#E5E7EB",

        //Overview component
        "overview-border": "f1f1f1",

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
