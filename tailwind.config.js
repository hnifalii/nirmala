/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFFCF4",
        sky: "#BCE4FE",
        sage: "#728C69",
        orange: "#FBA359",
        dark: "#363B43",
      },
      fontFamily: {
        sans: ["Gilroy-Regular"],
        light: ["Gilroy-Light"],
        medium: ["Gilroy-Medium"],
        semibold: ["Gilroy-SemiBold"],
        bold: ["Gilroy-Bold"],
        extrabold: ["Gilroy-ExtraBold"],
      },
    },
  },
  plugins: [],
};
