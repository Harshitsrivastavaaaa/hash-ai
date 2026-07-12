/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
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
        sans: ['Inter', 'sans-serif'], // Ensure you import a nice font like Inter later
      }
    },
  },
  plugins: [],
}