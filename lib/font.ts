import { Karla, Unbounded } from "next/font/google";

export const display = Unbounded({ subsets: ["latin"] });
export const font = Karla({ subsets: ["latin"] });

export const fontClass = font.className;
export const displayClass = display.className;
