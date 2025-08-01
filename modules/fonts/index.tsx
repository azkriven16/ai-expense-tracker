import { Poppins, Lora, Fira_Code } from "next/font/google";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
});

export const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});
