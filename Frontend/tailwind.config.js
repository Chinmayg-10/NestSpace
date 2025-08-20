/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode:"class",
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5', // indigo
        secondary: '#6366F1', // lighter indigo
      },
    },
  },
  plugins: [],
}

