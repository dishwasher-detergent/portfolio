import Layout from "ui/layout";
import "./globals.css";
import { Space_Grotesk, Oi } from "@next/font/google";
import ToastWrapper from "#/ui/toast/ToastWrapper";

const font = Space_Grotesk({ subsets: ["latin"], variable: "--main-font" });
const displayFont = Oi({ subsets: ["latin"], variable: "--display-font", weights: ['400'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`bg-gradient-to-b from-white to-slate-400 dark:from-slate-900 dark:to-slate-400 ${font} ${displayFont}`}>
        <Layout>{children}</Layout>
        <ToastWrapper />
      </body>
    </html>
  );
}
