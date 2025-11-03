/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index-new.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    // Dynamic color classes used in components
    {
      pattern: /(bg|text|border)-(green|orange|red|purple|cyan|indigo)-(50|100|200|300|400|500|600|700)/,
    },
  ],
}

