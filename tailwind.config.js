/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "var(--font-pretendard)",
        "Helvetica Neue",
        "Apple SD Gothic Neo",
        "Malgun Gothic",
        "맑은고딕",
        "Dotum",
        "돋움",
        "Gulim",
        "굴림",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      mono: [
        "ui-monospace",
        "Consolas",
        "SFMono-Regular",
        "Liberation Mono",
        "Menlo",
        "Monaco",
        "Courier",
        "Apple SD Gothic Neo",
        "Nanum Gothic",
        "나눔고딕",
        "Malgun Gothic",
        "맑은고딕",
        "monospace",
        "NerdFontsSymbols Nerd Font",
      ],
    },
    extend: {
      colors: {
        "antd-form": "#d9d9d9",
        brand: "#63489a",
        turquoise: "#1abc9c",
        greensea: "#16a085",
        emerald: "#2ecc71",
        nephritis: "#27ae60",
        peterriver: "#3498db",
        belizehole: "#2980b9",
        amethyst: "#9b59b6",
        wisteria: "#8e44ad",
        wetasphalt: "#34495e",
        midnightblue: "#2c3e50",
        sunflower: "#f1c40f",
        orange: "#f39c12",
        carrot: "#e67e22",
        pumpkin: "#d35400",
        alizarin: "#e74c3c",
        pomegranate: "#c0392b",
        clouds: "#ecf0f1",
        silver: "#bdc3c7",
        concrete: "#95a5a6",
        asbestos: "#7f8c8d",

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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        medium: "1px -1px 14px 0px rgba(0, 0, 0, 0.05)",
      },
    },
  },
  darkMode: "class",
  safelist: [
    "bg-main",
    "bg-white",
    "bg-black",
    "bg-gray",
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
  plugins: [],
};
