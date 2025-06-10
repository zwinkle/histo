// frontend/tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Menambahkan font family baru
      fontFamily: {
        'mono': ['"IBM Plex Mono"', 'monospace'],
        'sans': ['"Inter"', 'sans-serif'],
      },
      // Menambahkan warna tema baru
      colors: {
        'retro-bg': '#2a2a2a',
        'retro-card': '#3a3a3a',
        'retro-text': '#d4c9b5',
        'retro-accent': '#c9a86a',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
