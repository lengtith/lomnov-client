import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/ms-ui-components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fade: "fadeIn 1s ease-in-out",
        bounce: "bounce 1s infinite",
        fadeUp: "fadeUp 1s ease-in-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        bounce: {
          "0%, 100%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      colors: {
        "olive-green": "#7D7757",
        "olive-drab": "#79826A",
        "grayish-white": "#E0E0DC",
        "olive-gray": "#79796B",
        "pale-gray": "#BCBCB3",
        neutral: "#B5B49E",
        beige: "#E5D2B0",
        charcoal: "#252728",
        white: "#FFFFFF",
      },
      spacing: {},
      fontFamily: {
        coolvetica: ["Coolvetica", "sans-serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
        black: "900",
      },
      fontSize: {
        "coolvetica-h1": ["48px", { lineHeight: "56px" }],
        "coolvetica-h2": ["36px", { lineHeight: "44px" }],
        "coolvetica-h3": ["30px", { lineHeight: "36px" }],
        "coolvetica-h4": ["24px", { lineHeight: "28px" }],
        "coolvetica-paragraph": ["16px", { lineHeight: "24px" }],
        "coolvetica-small": ["14px", { lineHeight: "20px" }],
        "coolvetica-text": ["16px", { lineHeight: "20px" }],
        "coolvetica-caption": ["12px", { lineHeight: "16px" }],
        "coolvetica-form-label": ["14px", { lineHeight: "18px" }],
        "helvetica-h1": ["48px", { lineHeight: "56px" }],
        "helvetica-h2": ["36px", { lineHeight: "44px" }],
        "helvetica-h3": ["30px", { lineHeight: "36px" }],
        "helvetica-h4": ["24px", { lineHeight: "28px" }],
        "helvetica-paragraph": ["16px", { lineHeight: "24px" }],
        "helvetica-paragraph2": ["16px", { lineHeight: "22px" }],
        "helvetica-small": ["14px", { lineHeight: "20px" }],
        "helvetica-text": ["16px", { lineHeight: "20px" }],
        "helvetica-caption": ["12px", { lineHeight: "16px" }],
        "helvetica-form-label": ["14px", { lineHeight: "18px" }],
      },
      borderRadius: {
        "11xl": "30px",
        xl: "20px",
        "8xs": "5px",
      },
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
    },
  },

  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
export default config;
