import type { Config } from "tailwindcss";

// Define reused hex codes as constants
const BRAND_ORANGE = "#FF6B2B";
const BRAND_PURPLE = "#9B8FFF";
const BRAND_CORAL = "#FF8C7D";
const BRAND_ROSE = "#E5A4A4";
const BRAND_LAVENDER = "#B6A4E5";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        brand: {
          orange: BRAND_ORANGE,
          coral: BRAND_CORAL,
          rose: BRAND_ROSE,
          lavender: BRAND_LAVENDER,
          purple: BRAND_PURPLE,
        },
        primary: {
          DEFAULT: BRAND_ORANGE,
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: BRAND_PURPLE,
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
    },
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
  },
  plugins: [],
} satisfies Config;
