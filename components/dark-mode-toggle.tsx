"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="rounded-xl p-2 hover:bg-slate-600/20 hover:dark:bg-slate-200/20"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <span className="sr-only">Theme</span>
      {theme == "dark" ? <LucideSun size={20} /> : <LucideMoon size={20} />}
    </button>
  );
}
