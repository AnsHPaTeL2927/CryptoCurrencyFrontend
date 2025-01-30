import daisyui from "daisyui"; // Import DaisyUI as an ES Module

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // Paths to scan for class usage
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      colors: {
        primary: "#1E40AF", // Indigo
        secondary: "#0EA5E9", // Cyan
        background: "#F9FAFB", // Light Gray
        cardBg: "#FFFFFF", // White
        textPrimary: "#374151", // Dark Gray
        textMuted: "#9CA3AF", // Muted Gray
        success: "#10B981", // Green for Positive
        danger: "#EF4444", // Red for Negative
        warning: "#F59E0B", // Amber for Warnings
        info: "#3B82F6", // Blue for Informational Elements
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["Roboto Mono", "monospace"],
      },
      spacing: {
        1: "0.25rem", // 4px
        2: "0.5rem", // 8px
        3: "0.75rem", // 12px
        4: "1rem", // 16px
        5: "1.25rem", // 20px
        6: "1.5rem", // 24px
        8: "2rem", // 32px
        10: "2.5rem", // 40px
        12: "3rem", // 48px
        16: "4rem", // 64px
        20: "5rem", // 80px
        24: "6rem", // 96px
        32: "8rem", // 128px
      },
      screens: {
        sm: "640px", // Small devices
        md: "768px", // Tablets
        lg: "1024px", // Laptops
        xl: "1280px", // Desktops
        "2xl": "1536px", // Large screens
      },
    },
  },
  plugins: [daisyui], // Use imported daisyui
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1E40AF",
          secondary: "#0EA5E9",
          accent: "#3B82F6",
          neutral: "#374151",
          "base-100": "#F0F8FF",
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
        dark: {
          primary: "#3B82F6",
          secondary: "#0EA5E9",
          accent: "#1E40AF",
          neutral: "#9CA3AF",
          "base-100": "#1A202C", // Dark background
          info: "#3B82F6",
          success: "#10B981",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
    ],
  },
};
