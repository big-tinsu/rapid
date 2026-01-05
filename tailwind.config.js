/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        buslybg: '#1e3a8a',
      },
      animation: {
        pulse: 'pulse 1.25s ease-out infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': {
            opacity: '0.85',
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(0, 128, 0, 0.5)',
          },
          '70%': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}