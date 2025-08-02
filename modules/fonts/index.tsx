import { Poppins, Lora, Pixelify_Sans } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
