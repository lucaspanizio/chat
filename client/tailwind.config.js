/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,css,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0c1317',
        text: '#d1d7db',
        foreground: 'hsl(202, 23%, 16%)',
      },
    },
  },
  plugins: [],
};
