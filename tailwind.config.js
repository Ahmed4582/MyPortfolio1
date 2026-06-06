/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        portfolio: {
          bg: "#060913",
          surface: "#0A1020",
          primary: "#22d3ee",
          secondary: "#60a5fa",
          accent: "#818cf8",
          text: "#f8fafc",
          muted: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      backdropBlur: {
        sm: "4px",
      },
    },
  },
  plugins: [],
};
