import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        spotGreen: "#30AD4F",
        borderGreen: "#00FF73",
        spotRed: "#74011F",
        borderRed: "#C00013",
      },
    },
  },
  plugins: [],
} satisfies Config;
