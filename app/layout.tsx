import Layout from "ui/layout";
import "./globals.css";
import { Space_Grotesk, Phudu } from "@next/font/google";
import ToastWrapper from "#/ui/toast/ToastWrapper";
import { ThemeProvider } from "#/ui/theme/ThemeProvider";

const font = Space_Grotesk({ subsets: ["latin"], variable: "--main-font" });
const displayFont = Phudu({
  subsets: ["latin"],
  variable: "--display-font",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let dark = false;

  const checkDarkmode = () => {};

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={`${font.className} ${displayFont.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>{children}</Layout>
          <ToastWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
