/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "background-white": "#F7F7F7",
        white: "#FDFDFD",
        grey: "#AFAFAF",
        "green-noQ": "#255B57",
        "grey-noQ": "#F7F7F7",

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
