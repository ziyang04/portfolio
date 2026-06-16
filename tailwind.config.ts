import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0f1a",
        panel: "#11192b",
        edge: "#1e2a44",
        brand: {
          DEFAULT: "#6d5efc",
          soft: "#8b7dff",
        },
        accent: "#19d3a2",
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(109,94,252,0.25), 0 20px 60px -20px rgba(109,94,252,0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
