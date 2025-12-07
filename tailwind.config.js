/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // সব React ফাইল scan হবে
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class', // 🔑 Dark mode টগল করার জন্য
  plugins: [],
};
