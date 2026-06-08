import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Apple blacks
        ink: {
          DEFAULT: "#000000",
          800: "#0a0a0a",
          700: "#161617",
          600: "#1d1d1f",
          500: "#2a2a2c",
        },
        // SCA gold — used sparingly as the single accent
        gold: {
          DEFAULT: "#d4af37",
          light: "#e8c77a",
          deep: "#b8902a",
          50: "#fbf3d9",
        },
        ice: "#f5f5f7", // Apple near-white
        slate: "#86868b", // Apple secondary text
        line: "#424245", // dark borders
        blue: { DEFAULT: "#0071e3", bright: "#2997ff" },
        ember: "#f56300", // urgência (parcimônia)
      },
      fontFamily: {
        sans: ['"SF Pro Text"', "-apple-system", "BlinkMacSystemFont", '"Helvetica Neue"', "Arial", "sans-serif"],
        display: ['"SF Pro Display"', '"SF Pro Text"', "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        gold: "0 8px 30px rgba(212,175,55,0.18)",
        glass: "0 4px 24px rgba(0,0,0,0.4)",
        lift: "0 16px 50px rgba(0,0,0,0.55)",
      },
      backgroundImage: {
        "gold-grad": "linear-gradient(135deg, #e8c77a 0%, #d4af37 50%, #b8902a 100%)",
        "ink-fade": "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 50%, rgba(0,0,0,0.95) 100%)",
        "radial-gold": "radial-gradient(120% 80% at 50% 0%, rgba(40,40,42,0.6) 0%, rgba(0,0,0,0) 60%)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
        pulseDot: {
          "0%,100%": { transform: "scale(1)", opacity: "0.9" },
          "50%": { transform: "scale(1.8)", opacity: "0.2" },
        },
        floaty: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
      animation: {
        shimmer: "shimmer 3s linear infinite",
        pulseDot: "pulseDot 2.4s ease-in-out infinite",
        floaty: "floaty 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
