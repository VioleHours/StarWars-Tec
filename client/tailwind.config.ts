/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: () => ({
        "star-wars": "url('/img/pxfuel.jpg')",
        "films-wars": "url('/img/bgfilm.jpg')",
        "char-wars": "url('/img/bgchar.jpg')",
        "blue-gradient": "linear-gradient(135deg, #0000FF, #ffffff)",
        "red-gradient": "linear-gradient(135deg, #FF0000, #000000)",
      }),

      backdropBlur: {
        xs: "2px",
      },

      screens: {
        "2xl": { max: "1535px" },

        xl: { max: "1279px" },

        lg: { min: "1023px" },

        md: { max: "767px" },

        sm: { max: "639px" },

        xs: { max: "479px" },
      },
    },
  },
  plugins: [],
};
