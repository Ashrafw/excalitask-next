import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppins: ["var(--poppins-font)"],
        playpen: ["var(--playpen-font)"],
        mali: ["var(--mali-font)"],
        rokkitt: ["var(--rokkitt-font)"],
        ubuntu: ["var(--ubuntu-font)"],
        rubik: ["var(--rubik-font)"],
        raj: ["var(--raj-font)"],
        mplus: ["var(--mplus-font)"],
        orbit: ["var(--orbit-font)"],
        philosopher: ["var(--philosopher-font)"],
        fahkwang: ["var(--fahkwang-font)"],
        upright: ["var(--upright-font)"],
        lora: ["var(--lora-font)"],
        marri: ["var(--marri-font)"],
      },
    },
  },
  plugins: [],
};
export default config;
