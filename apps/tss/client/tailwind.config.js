/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 Bắt buộc để Tailwind quét file React
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
