/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./Pages/**/*.{js,ts,jsx,tsx}", 
    "./Components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0C10',       // Deep background
          gray: '#1F2833',       // Secondary background
          accent: '#66FCF1',     // Neon Cyan (AI glow)
          muted: '#45A29E',      // Muted Cyan
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      },
      keyframes: {
        blob: {
          "0%, 100%": { transform: "translateY(0) scale(1)" },
          "50%": { transform: "translateY(-15px) scale(1.02)" },
        },
      },
      animation: {
        blob: "blob 6s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.animation-delay-2000': {
          'animation-delay': '2s',
        },
      });
    },
  ],
}