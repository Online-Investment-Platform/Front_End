/* eslint-disable*/
import type { Config } from "tailwindcss";

const pxToRem = require("tailwindcss-preset-px-to-rem");

const config: Config = {
  presets: [pxToRem],
  darkMode: "selector",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "375px" },
      md: { min: "744px" },
      lg: { min: "1024px" },
      xl: { min: "1280px" },
      xxl: { min: "1600px" },
    },
    extend: {
      colors: {
        red: {
          100: "#FDEBEB",
          200: "#FDEDED",
          300: "#F5F5F5",
          400: "#EB0000",
          500: "#F12E35",
        },
        lime: {
          100: "#24d075",
          200: "#26db7a",
          300: "#11E977",
          400: "#0FED60",
          500: "#0FED78",
          600: "#0FED88",
        },
        green: {
          100: "#E9FFF0",
          200: "#E8F5E9",
          500: "#1DA65A",
          900: "#324950",
        },
        blue: {
          100: "#EDF1FC",
          200: "#F5F6F8",
          300: "#F3F4F6",
          400: "#EFF6FB",
          500: "#4882FA",
          900: "#1A00DF",
        },
        gray: {
          80: "#D9D9D9",
          100: "#B6B6B6",
          200: "#B7B7B7",
          300: "#A1A1A1",
          400: "#757575",
          500: "#9B9B9B",
          600: "#505050",
          700: "#9f9f9f",
        },
      },
    },
    fontSize: {
      // landing
      "40-600": ["40px", { lineHeight: "38px", fontWeight: "600" }],
      "48-600": ["48px", { lineHeight: "38px", fontWeight: "600" }],
      "64-600": ["64px", { lineHeight: "38px", fontWeight: "600" }],

      // 3xl (32px)
      "32-700": ["32px", { lineHeight: "38px", fontWeight: "700" }],
      "32-600": ["32px", { lineHeight: "38px", fontWeight: "600" }],
      "32-500": ["32px", { lineHeight: "38px", fontWeight: "500" }],

      // 2.5xl (28px)
      "28-700": ["28px", { lineHeight: "38px", fontWeight: "700" }],
      "28-600": ["28px", { lineHeight: "38px", fontWeight: "600" }],
      "28-500": ["28px", { lineHeight: "38px", fontWeight: "500" }],

      // 2xl (24px)
      "24-700": ["24px", { lineHeight: "28px", fontWeight: "700" }],
      "24-600": ["24px", { lineHeight: "28px", fontWeight: "600" }],
      "24-500": ["24px", { lineHeight: "28px", fontWeight: "500" }],
      "24-400": ["24px", { lineHeight: "28px", fontWeight: "400" }],

      // xl (20px)
      "20-700": ["20px", { lineHeight: "24px", fontWeight: "700" }],
      "20-600": ["20px", { lineHeight: "24px", fontWeight: "600" }],
      "20-500": ["20px", { lineHeight: "24px", fontWeight: "500" }],
      "20-400": ["20px", { lineHeight: "24px", fontWeight: "400" }],

      // 2lg (18px)
      "18-700": ["18px", { lineHeight: "21px", fontWeight: "700" }],
      "18-600": ["18px", { lineHeight: "21px", fontWeight: "600" }],
      "18-500": ["18px", { lineHeight: "21px", fontWeight: "500" }],
      "18-400": ["18px", { lineHeight: "21px", fontWeight: "400" }],

      // lg (16px)
      "16-700": ["16px", { lineHeight: "19px", fontWeight: "700" }],
      "16-600": ["16px", { lineHeight: "19px", fontWeight: "600" }],
      "16-500": ["16px", { lineHeight: "19px", fontWeight: "500" }],
      "16-400": ["16px", { lineHeight: "19px", fontWeight: "400" }],

      // md (14px)
      "14-700": ["14px", { lineHeight: "17px", fontWeight: "700" }],
      "14-600": ["14px", { lineHeight: "17px", fontWeight: "600" }],
      "14-500": ["14px", { lineHeight: "17px", fontWeight: "500" }],
      "14-400": ["14px", { lineHeight: "17px", fontWeight: "400" }],

      // sm (13px)
      "13-600": ["13px", { lineHeight: "16px", fontWeight: "600" }],
      "13-500": ["13px", { lineHeight: "16px", fontWeight: "500" }],

      // xs (12px)
      "12-600": ["12px", { lineHeight: "14px", fontWeight: "600" }],
      "12-500": ["12px", { lineHeight: "14px", fontWeight: "500" }],
      "12-400": ["12px", { lineHeight: "14px", fontWeight: "400" }],
    },
    boxShadow: {
      custom: "0 2px 4px 0 rgba(51, 50, 54, 0.06)", // X: 0, Y: 2, Blur: 4, Spread: 0, 색상: #333236/6
    },
  },
  plugins: [],
};
export default config;
