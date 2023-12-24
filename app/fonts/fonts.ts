import {
  //   new fonts =========
  Poppins,
  Playpen_Sans,
  Mali, // yes
  //   ========== sans serif
  Rokkitt,
  Ubuntu, // yes
  Rubik,
  Rajdhani,
  M_PLUS_Rounded_1c,
  Orbitron,
  Philosopher,
  Fahkwang,
  // serif
  Cormorant_Upright,
  Lora,
  Merriweather,
  //
} from "next/font/google";

export const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--poppins-font",
});

export const playpen = Playpen_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--playpen-font",
});

export const mali = Mali({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--mali-font",
});

export const rokkittFont = Rokkitt({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--rokkitt-font",
});

export const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--ubuntu-font",
});

export const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--rubik-font",
});

export const raj = Rajdhani({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--raj-font",
});

export const mPlus = M_PLUS_Rounded_1c({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
  variable: "--mplus-font",
});

export const orbit = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--orbit-font",
});

export const philosopher = Philosopher({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--philosopher-font",
});

export const fahkwang = Fahkwang({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--fahkwang-font",
});

export const upright = Cormorant_Upright({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--upright-font",
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--lora-font",
});

export const marri = Merriweather({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  variable: "--marri-font",
});
