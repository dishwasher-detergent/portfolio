"use client";

import { AutoTextSize } from "auto-text-size";

interface HeaderProps {
  children: React.ReactNode;
  sticky?: boolean;
  width?: number | string;
}

export default function Header({
  children,
  sticky = true,
  width = "100%",
}: HeaderProps) {
  return (
    <div
      className={`display ${
        sticky && "sticky"
      } top-8 z-0 w-full font-bold text-slate-900 dark:text-white md:top-0`}
      style={{
        width: width,
        maxWidth: "100%",
      }}
    >
      <AutoTextSize mode="oneline" as="h1" maxFontSizePx={300}>
        {children}
      </AutoTextSize>
    </div>
  );
}
