import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import AnimatedCursor from "react-animated-cursor";
import "./globals.css";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kenneth Bass",
  description: "Kenneth Bass' personal website.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${font.className} bg-primary text-white`}>
        <AnimatedCursor
          color="255,255,255"
          innerSize={8}
          outerSize={32}
          innerScale={1.5}
          outerScale={2}
          clickables={[
            "a",
            'input[type="text"]',
            'input[type="email"]',
            'input[type="number"]',
            'input[type="submit"]',
            'input[type="image"]',
            "label[for]",
            "select",
            "textarea",
            "button",
            ".link",
          ]}
        />
        {children}
      </body>
    </html>
  );
}
