import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: { 50: "#effcf9", 100: "#d3f7ef", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 900: "#134e4a" } } } },
  plugins: [],
};
export default config;
