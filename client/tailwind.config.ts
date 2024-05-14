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
        'star-wars': "url('/img/pxfuel.jpg')",
        'films-wars': "url('/img/bgfilm.jpg')",
        'char-wars': "url('/img/bgchar.jpg')",
      }),
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}