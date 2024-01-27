"use client"; // Error components must be Client Components

import { HueContext } from "@/context/hue-provider";
import { useContext, useEffect, useRef } from "react";

export default function Error({ reset }: { reset: () => void }) {
  const { setAnchor, width } = useContext(HueContext);
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      const tempRef = ref.current as Element;
      const rect = tempRef.getBoundingClientRect();
      setAnchor({
        x: rect.left - 50,
        y: rect.top - 75,
      });
    }
  }, [ref.current, width]);

  return (
    <header className="flex flex-col items-center space-y-8 py-12">
      <h1 ref={ref} className={`text-center text-5xl font-bold md:text-7xl`}>
        Something went wrong!
      </h1>
      <button
        className="rounded-xl bg-slate-600/30 px-4 py-2 hover:bg-slate-600/20 hover:dark:bg-slate-200/20"
        onClick={() => reset()}
      >
        Try Again
      </button>
    </header>
  );
}
