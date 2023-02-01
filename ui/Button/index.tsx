import { createElement } from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  type?: "Button" | "Link";
  href?: string;
}

export default function Button({
  children,
  type = "Button",
  href = "/",
}: ButtonProps) {
  let newType;

  if (type == "Button") {
    return (
      <button className="text-sm p-2 rounded-xl bg-transparent hover:bg-slate-200 focus:bg-slate-200 flex flex-row gap-2 font-semibold text-slate-900 dark:hover:bg-slate-800 dark:focus:bg-slate-800 dark:text-white">
        {children}
      </button>
    );
  } else {
    return (
      <Link
        href={href}
        className="text-sm p-2 rounded-xl bg-transparent hover:bg-slate-200 focus:bg-slate-200 flex flex-row gap-2 font-semibold text-slate-900 dark:hover:bg-slate-800 dark:focus:bg-slate-800 dark:text-white"
      >
        {children}
      </Link>
    );
  }
}
