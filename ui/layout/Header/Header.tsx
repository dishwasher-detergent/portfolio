"use client";

import { AutoTextSize } from "auto-text-size";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="sticky top-0 z-0 w-full py-10 font-bold text-slate-900 dark:text-white">
      <AutoTextSize mode="oneline" as="h1" maxFontSizePx={1000}>
        {children}
      </AutoTextSize>
    </div>
  );
}
