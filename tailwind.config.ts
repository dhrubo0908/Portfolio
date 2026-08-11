import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./data/**/*.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-geist-sans)", "Inter", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#0F172A",
        aurora: "#7C3AED",
        signal: "#2563EB",
        glass: "rgba(255,255,255,0.12)"
      },
      boxShadow: {
        premium: "0 24px 80px rgba(15, 23, 42, 0.18)"
      }
    }
  },
  plugins: []
};

export default config;
