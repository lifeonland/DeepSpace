/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'space-black': '#05070a',
        'space-dark': '#0b0e14',
        'nebula-purple': '#a855f7',
        'nebula-blue': '#3b82f6',
        'star-white': '#f8fafc',
        'accent': '#22d3ee',
        'accent-glow': 'rgba(34, 211, 238, 0.5)',
      },
      boxShadow: {
        'neon-cyan': '0 0 10px rgba(6, 182, 212, 0.4), 0 0 20px rgba(6, 182, 212, 0.2)',
        'neon-purple': '0 0 10px rgba(168, 85, 247, 0.4), 0 0 20px rgba(168, 85, 247, 0.2)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      }
    },
  },
  plugins: [],
}
