/** @type {import('tailwindcss').Config} */
export default {
  purge: {
    enabled: false,
  },
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    spacing: Array.from({ length: 1000 }).reduce((map, _, index) => {
      map[index] = `${index}px`
      return map
    }, {}),
    extend: {
      fontSize: ({ theme }) => ({
        ...theme("spacing"),
      }),
    },
  },
  plugins: [],
}
