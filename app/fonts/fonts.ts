import {
  Swanky_and_Moo_Moo,
  Shadows_Into_Light_Two,
  Architects_Daughter,
  PT_Sans_Narrow,
  Ubuntu,
  PT_Sans,
  Bodoni_Moda,
  Rokkitt,
  Gluten,
  Expletus_Sans,
  Edu_QLD_Beginner,
  Poppins,
} from "next/font/google";

export const architects = Architects_Daughter({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--arc-font",
});
export const swanky = Swanky_and_Moo_Moo({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--swanky-font",
});
export const shadows = Shadows_Into_Light_Two({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--shadows-font",
});

export const poppinsFont = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--poppins-font",
});

export const rokkittFont = Rokkitt({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--Rokkitt-font",
});

export const glutenFont = Gluten({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--gluten-font",
});

export const expletus = Expletus_Sans({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--expletus-font",
});
