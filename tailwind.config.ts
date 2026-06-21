import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0c0f",
          900: "#0f1216",
          800: "#161a20",
          700: "#1e242c",
          600: "#2a323c",
        },
        mist: {
          100: "#e7edf2",
          200: "#c8d3dc",
          300: "#9fb0bd",
          400: "#728292",
        },
        drop: {
          // water-droplet accent gradient stops
          light: "#7fd3e6",
          DEFAULT: "#3fa8c9",
          deep: "#1e6f93",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 40px -12px rgba(63, 168, 201, 0.35)",
        wet: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 10px 30px -10px rgba(0,0,0,0.6)",
      },
      keyframes: {
        ripple: {
          "0%": { transform: "scale(0.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.15)", opacity: "0" },
        },
        floatUp: {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        ripple: "ripple 2.4s ease-out infinite",
        floatUp: "floatUp 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
