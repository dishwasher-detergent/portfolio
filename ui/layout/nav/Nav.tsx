"use client";

import Logo from "#/ui/layout/nav/Logo";
import { Codepen, Github, Linkedin, Moon } from "lucide-react";
import { useTheme } from "next-themes";

export default function Nav() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 h-16 w-full flex-none border-b border-slate-300 bg-white/60 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/90 dark:text-white lg:z-50">
      <div className="mx-auto h-full w-full max-w-[90rem]">
        <div className="mx-4 h-full lg:mx-0 lg:border-0 lg:px-8">
          <div className="relative flex h-full items-center">
            <span className="mr-3 w-24 flex-none overflow-hidden md:w-auto">
              <span className="sr-only">Kenneth Bass</span>
              <Logo />
            </span>
            <div className="relative ml-auto flex items-center">
              <div className="ml-4 flex items-center space-x-2">
                <a
                  className={`block cursor-pointer rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://github.com/dishwasher-detergent"
                >
                  <Github size={20} />
                </a>
                <a
                  className={`block cursor-pointer rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://www.linkedin.com/in/kennethtylerbass/"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  className={`block cursor-pointer rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
                  rel="noreferrer"
                  target={"_blank"}
                  href="https://codepen.io/kennethbass"
                >
                  <Codepen size={20} />
                </a>
                <button
                  type="button"
                  className={`block cursor-pointer rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
                  onClick={() => setTheme(theme == "dark" ? "light" : "dark")}
                >
                  <Moon size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
