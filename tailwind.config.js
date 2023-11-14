/** @type {import('tailwindcss').Config} */
module.exports = {
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
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
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

        main: "#0AA7AC",
        main30: "#B0E3E4",
        bg: "#F0F5F4",
        white: "#FFFFFF",
        black: "#000000",
        grey: "#979797",
        lgrey: "#D2D2D2",
        red: "#F42222",
        yellow: "#FFD541",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 6px)",
        sm: "calc(var(--radius) - 8px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      boxShadow: {
        lg: "var(--shadow-lg)",
        md: "var(--shadow-md)",
        sm: "var(--shadow-sm)",
      },
    },
  },
  safelist: [
    "bg-main",
    "bg-white",
    "bg-black",
    "bg-grey",
    "bg-lgrey",
    "bg-red",
    "bg-yellow",
    "bg-bg",
    "bg-transparent",
    "text-main",
    "text-red",
    "text-yellow",
    "text-grey",
    "text-lgrey",
    "text-white",
    "text-black",
    "border-main",
    "border-red",
    "border-yellow",
    "border-lgrey",
    "border-white",
    "border-black",
    "broder-grey",
  ],
  plugins: [require("tailwindcss-animate")],
};
