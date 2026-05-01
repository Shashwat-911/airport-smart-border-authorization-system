/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'bebas': ['Bebas Neue', 'sans-serif'],
        'mono': ['"Courier New"', 'monospace'],
      },
      animation: {
        'tactical-grid': 'tactical-grid 20s linear infinite',
      },
      backgroundImage: {
        'tactical-grid': "linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)",
        'tactical-grid': 'radial-gradient(circle at 25% 25%,#13334e 2%,transparent 0%),radial-gradient(circle at 75% 75%,#13334e 2%,transparent 0%)',
      }
    },
  },
  plugins: [],
}

