/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981', // Emerald
          dark: '#059669',
        },
        secondary: {
          DEFAULT: '#3b82f6', // Blue
          dark: '#2563eb',
        },
        background: {
          DEFAULT: '#060608', // Deep Void
          alt: '#0a0a0c',
        },
        text: {
          DEFAULT: '#ffffff',
          muted: '#94a3b8',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
