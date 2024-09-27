/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    darkMode: 'class',
    extend: {
      fontFamily: {
        nerko:["Nerko One", 'cursive'],
        cursive:['cursive'],
        greatvibes:["Great Vibes", 'cursive']
      },
      colors:{
        beige: "#c89e78",
        skin:"#e3bf99"
      }
    },
  },
  plugins: [],
}

