import Layout from "ui/layout";
import "./globals.css";
import { Space_Grotesk, Phudu } from "next/font/google";
import ToastWrapper from "#/ui/toast/ToastWrapper";
import { ThemeProvider } from "#/ui/theme/ThemeProvider";
import { Presence } from "#/ui/animate/Presence";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kenneth's Portfolio",
  description: "Kenneth Bass' Portfolio of Projects!",
};

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
  return (
    <html lang="en">
      <head></head>
      <body className={`${font.className} ${displayFont.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Layout>
            <Presence>{children}</Presence>
          </Layout>
          <ToastWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
