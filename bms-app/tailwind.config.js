/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0a0f1e',
          800: '#111827',
          700: '#1f2937',
        },
        cyan: {
          DEFAULT: '#00d4ff',
          hover: '#00b8e6',
        },
        amber: {
          DEFAULT: '#f59e0b',
        },
        emerald: {
          DEFAULT: '#10b981',
        },
        red: {
          DEFAULT: '#ef4444',
        },
      },
      fontFamily: {
        heading: ['"Rajdhani"', 'sans-serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['"Rajdhani"', 'sans-serif'], // Default to Rajdhani
      },
      backgroundImage: {
        'tactical-grid': 'linear-gradient(rgba(0, 212, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.05) 1px, transparent 1px)',
      },
      backgroundSize: {
        'tactical-grid': '30px 30px',
      },
      animation: {
        'scan-line': 'scan 2.5s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        scan: {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' },
        }
      }
    },
  },
  plugins: [],
}
