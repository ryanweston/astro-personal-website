const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
   content: [
    './src/**/*.{html,js,astro}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["GeneralSans", "Inter var", ...defaultTheme.fontFamily.sans],
        blog: ['Inter var', ...defaultTheme.fontFamily.sans] 
      },
    },
  },
};