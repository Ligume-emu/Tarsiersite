import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        tarsier: {
          DEFAULT: "hsl(var(--tarsier))",
          light: "hsl(var(--tarsier-light))",
        },
        "bg-warm": "hsl(var(--bg-warm))",
        "bg-dark": "hsl(var(--bg-dark))",
        sand: "hsl(var(--sand))",
        "text-primary": "hsl(var(--text-primary))",
        "text-secondary": "hsl(var(--text-secondary))",
        "text-on-dark": "hsl(var(--text-on-dark))",
        "primary-foreground": "hsl(var(--primary-foreground))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
