import type { Config } from "tailwindcss"

const config: Config = {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  },
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          md: "4rem",
          lg: "5rem",
        },
        center: true,
      },
      colors: {
        primary: "#FF7A00",
      },
    },
  },
  plugins: [],
}
export default config
