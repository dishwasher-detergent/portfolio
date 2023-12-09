import type { Metadata } from "next";
import { Karla } from "next/font/google";
import "./globals.css";

const font = Karla({ subsets: ["latin"] });

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
      <body className={`${font.className}`}>{children}</body>
    </html>
  );
}
