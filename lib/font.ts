import { Outfit as BaseFont } from "next/font/google";
import localFont from "next/font/local";

const display = localFont({
  src: "../public/Carena-Regular.otf",
});

export const font = BaseFont({ subsets: ["latin"] });

export const fontClass = font.className;
export const displayClass = display.className;
