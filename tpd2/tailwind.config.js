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
        primary: "#ffffff",
        preprimary: "#f0f0f0",
        presecondary: "#0f0f0f",
        secondary: "#000000",
      },
      dark: {
        primary: "#000000",
        preprimary: "#0f0f0f",
        presecondary: "#f0f0f0",
        secondary: "#ffffff",
      },
      pestle: {
        primary: "#FF204E",
        preprimary: "#A0153E",
        presecondary: "#5D0E41",
        secondary: "#00224D",
      },
      darkpestle: {
        primary: "#00224D",
        preprimary: "#5D0E41",
        presecondary: "#A0153E",
        secondary: "#FF204E",
      },
    }),
  ],
};
