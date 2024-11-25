/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        textColor: "var(--textColor)",
        background2: "var(--background2)",
        descriptionColor: "var(--descriptionColor)",
        primaryColor: "var(--primaryColor)",
        secondaryColor: "var(--secondaryColor)",
        borderColor: "var(--borderColor)",
      },
      fontFamily: {
        inter: "var(--font-inter)",
        nunito: "var(--font-nunito)",
      },
    },
  },
  plugins: [],
};