/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      cursor: {
        default: "url(src/assets/svgs/cursor-default.svg), default",
        pointer: "url(src/assets/svgs/cursor-pointer.svg), pointer",
        text: "url(src/assets/svgs/cursor-text.svg), text",
      },
      fontFamily: {
        matrix: ["matrix"],
      },
    },
  },
  plugins: [],
};
