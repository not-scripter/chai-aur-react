import { createThemes } from "tw-colors";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [
    createThemes({
      light: {
        primary: "orange-600",
        secondary: "zinc-200",
        brand: "#ff0000",
      },
      dark: {
        primary: "orange-600",
        secondary: "zinc-800",
        brand: "#ff00ff",
      },
    }),
  ],
};
