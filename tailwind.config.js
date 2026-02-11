
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: '#F05A5B', // Primary CTAs
          light: '#F27B7C',
        },
        softPink: {
          DEFAULT: '#F7B2B7', // Highlights
          subtle: '#FFF0F1',
        },
        skyBlue: {
          DEFAULT: '#7EC8E3', // Navigation
          light: '#E6F4FA',
        },
        teal: {
          DEFAULT: '#3FB6B2', // Headers, Active
          dark: '#2A8F8C',
        },
        neutral: {
          text: '#333333',
          secondary: '#6B6B6B',
          bg: '#FAFAFA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
