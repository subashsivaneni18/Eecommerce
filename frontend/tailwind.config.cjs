/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        "white-primary": "#ffffff",
        "white-secondary": "#f9f9f9",
        "white-accent": "#f1f1f1",
        "gray-light": "#d4d4d4",
        "gray-medium": "#a1a1a1",
        "gray-dark": "#4b4b4b",
        "black-soft": "#222222",
        "blue-accent": "#1e40af",
        "error-red": "#ef4444",
        "success-green": "#22c55e",
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
