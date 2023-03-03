import { ChildWrapper } from "#/ui/animate/ChildWrapper";
import { PresenceWrapper } from "#/ui/animate/PresenceWrapper";
import { ThemeProvider } from "#/ui/theme/ThemeProvider";
import ToastWrapper from "#/ui/toast/ToastWrapper";
import type { Metadata } from "next";
import { Phudu, Space_Grotesk } from "next/font/google";
import Layout from "ui/layout/Layout";
import "./globals.css";

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
            <PresenceWrapper>
              <ChildWrapper key={Math.random()}>{children}</ChildWrapper>
            </PresenceWrapper>
          </Layout>
          <ToastWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
