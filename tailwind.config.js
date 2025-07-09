/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      colors: {
        'aqi-good': '#22c55e',
        'aqi-moderate': '#eab308',
        'aqi-unhealthy-sensitive': '#f97316',
        'aqi-unhealthy': '#ef4444',
        'aqi-very-unhealthy': '#a855f7',
        'aqi-hazardous': '#7f1d1d',
      },
    },
  },
  plugins: [],
};