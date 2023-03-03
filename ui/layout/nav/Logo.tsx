"use client";

export default function Logo() {
  return (
    <a
      href="/"
      className="display flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black"
    >
      <span className="hidden md:inline-block">Kenneth Bass</span>
      <span className="inline-block md:hidden">KB</span>
    </a>
  );
}
