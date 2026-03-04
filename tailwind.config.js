/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF8C00",
          dark: "#E67E00",
          light: "#FFA800",
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          dark: "#0F0F0F",
          light: "#262626",
        },
        accent: {
          DEFAULT: "#666666",
          dark: "#404040",
          light: "#999999",
        },
        success: "#4ADE80",
        bg: {
          DEFAULT: "#0F0F0F",
          alt: "#1A1A1A",
          surface: "#262626",
          card: "#1A1A1A",
        },
        text: {
          DEFAULT: "#FFFFFF",
          muted: "#999999",
          dimmed: "#666666",
        },
      },
      fontFamily: {
        display: ["Inter", "system-ui", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
      },
      spacing: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        12: "3rem",
        16: "4rem",
      },
      borderRadius: {
        sm: "6px",
        DEFAULT: "12px",
        lg: "16px",
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.06)",
        DEFAULT: "0 4px 12px rgba(0,0,0,0.08)",
        lg: "0 12px 24px rgba(0,0,0,0.12)",
      },
      maxWidth: {
        container: "1280px",
      },
    },
  },
  plugins: [],
};
