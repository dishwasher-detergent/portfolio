import { fontClass } from "@/lib/font";
import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark">
      <body className={`${fontClass} w-full dark:bg-slate-950 dark:text-white`}>
        {children}
      </body>
    </html>
  );
}
