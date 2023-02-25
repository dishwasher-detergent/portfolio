"use client";

import { AutoTextSize } from "auto-text-size";

interface HeaderProps {
  children: React.ReactNode;
}

export default function Header({ children }: HeaderProps) {
  return (
    <div className="display sticky top-8 z-0 w-full font-bold text-slate-900 dark:text-white md:top-0">
      <AutoTextSize mode="oneline" as="h1" maxFontSizePx={300}>
        {children}
      </AutoTextSize>
    </div>
  );
}
