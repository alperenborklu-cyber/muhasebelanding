import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#020617",
          900: "#040a1a",
          850: "#071128",
          800: "#0b1938",
          700: "#122654",
          600: "#1b3a80",
          500: "#2563eb",
        },
        gold: {
          100: "#fdf8e6",
          200: "#faecc0",
          300: "#f5db8f",
          400: "#ebc153",
          500: "#d4af37",
          600: "#b89025",
          700: "#916d1a",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        glow: {
          "0%": { opacity: "0.5", filter: "drop-shadow(0 0 15px rgba(212,175,55,0.25))" },
          "100%": { opacity: "0.9", filter: "drop-shadow(0 0 30px rgba(212,175,55,0.65))" },
        }
      }
    },
  },
  plugins: [],
};
export default config;
