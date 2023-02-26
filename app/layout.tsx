import Layout from "ui/layout";
import "./globals.css";
import { Space_Grotesk, Phudu } from "next/font/google";
import ToastWrapper from "#/ui/toast/ToastWrapper";
import { ThemeProvider } from "#/ui/theme/ThemeProvider";
import { PresenceWrapper } from "#/ui/animate/PresenceWrapper";
import type { Metadata } from "next";
import { ChildWrapper } from "#/ui/animate/ChildWrapper";

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
