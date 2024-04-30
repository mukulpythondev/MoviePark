/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custompurple: '#6556CB ', // Define your custom color here
        customblack: '#1F1E24', // Another custom color example
      },
    },
  },
  plugins: [],
}

