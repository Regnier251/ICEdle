export default {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    cssVariables: {
      ice: {
        cream: "255 251 235", // RGB values for #FFFBEB
        primary: "96 165 250", // RGB values for #60A5FA
        correct: "74 222 128", // RGB values for #4ADE80
        partial: "251 191 36", // RGB values for #FBBF24
        incorrect: "239 68 68", // RGB values for #EF4444
      },
    },
  },
};
