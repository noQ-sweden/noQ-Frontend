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
        "grey-noQ": "#f7f6f4",
      },
      spacing: {
        card: "1rem",
      },
    },
    variants: { backgroundColor: ["responsive", "hover", "focus", "active"] },
  },
  plugins: [],
};
