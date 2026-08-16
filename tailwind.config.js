/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0B1220",
          900: "#0F172A",
          800: "#16213A",
        },
        sand: "#F5F3EE",
        gold: {
          400: "#E4B75B",
          500: "#D9A441",
          600: "#B9852B",
        },
        slate2: "#4B5A73",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
      },
      boxShadow: {
        card: "0 10px 30px -12px rgba(11,18,32,0.25)",
      },
    },
  },
  plugins: [],
};
