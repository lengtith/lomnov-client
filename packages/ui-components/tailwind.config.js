/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "olive-green": "#7D7757",
        "olive-drab": "#79826A",
        "grayish-white": "#E0E0DC",
        neutral: "#B5B49E",
        beige: "#E5D2B0",
        charcoal: "#252728",
        white: "#FFFFFF",
      },
      fontFamily: {
        coolvetica: ["Coolvetica", "sans-serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
      },
      fontWeight: {
        normal: "400",
        bold: "700",
        black: "900",
      },
      letterSpacing: {
        "coolvetica-tight": "-0.5px",
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
        "helvetica-h5": ["20px", { lineHeight: "28px" }],
        "helvetica-paragraph": ["16px", { lineHeight: "24px" }],
        "helvetica-paragraph2": ["16px", { lineHeight: "22px" }],
        "helvetica-small": ["14px", { lineHeight: "20px" }],
        "helvetica-text": ["16px", { lineHeight: "20px" }],
        "helvetica-caption": ["12px", { lineHeight: "16px" }],
        "helvetica-form-label": ["14px", { lineHeight: "18px" }],
      },
    },
  },
  plugins: [],
};
