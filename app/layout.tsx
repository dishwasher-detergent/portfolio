import Layout from "ui/layout";
import "./globals.css";
import { Space_Grotesk, Unbounded } from "@next/font/google";
import ToastWrapper from "#/ui/toast/ToastWrapper";

const font = Space_Grotesk({ subsets: ["latin"], variable: "--main-font" });
const display = Unbounded({
  subsets: ["latin"],
  variable: "--display-font",
});

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
      <body className="dark">
        <Layout className={`${font.className} ${display.variable}`}>
          {children}
        </Layout>
        <ToastWrapper />
      </body>
    </html>
  );
}
