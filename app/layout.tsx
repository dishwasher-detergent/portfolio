import { ThemeToggle } from "@/components/dark-mode-toggle";
import { Hue } from "@/components/hue";
import { HueProvider } from "@/context/hue-provider";
import { ThemeProvider } from "@/context/theme-provider";
import { displayClass, fontClass } from "@/lib/font";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${fontClass} relative w-full dark:bg-slate-950 dark:text-white`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HueProvider>
            <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-md dark:bg-slate-950/10">
              <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
                <Link href="/" className={`font-bold ${displayClass}`}>
                  KB
                </Link>
                <ThemeToggle />
              </div>
            </nav>
            {children}
            <Hue />
          </HueProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
