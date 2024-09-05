/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nerko:["Nerko One", 'cursive'],
        cursive:['cursive'],
        greatvibes:["Great Vibes", 'cursive']
      }
    },
  },
  plugins: [],
}

