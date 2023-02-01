import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="display flex h-full cursor-pointer items-center justify-start gap-2 text-xl font-black"
    >
      <span className="hidden md:inline-block">Kenneth Bass</span>
      <span className="inline-block md:hidden">KB</span>
    </Link>
  );
}
