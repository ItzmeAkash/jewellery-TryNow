/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primaryColor: "#b64173",
        secondaryColor: "#f6dbe1",
      },
      fontFamily: {
        sans: ["Lato", "sans-serif"], 
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
        },
      },
    },
  },
  plugins: [],
};
