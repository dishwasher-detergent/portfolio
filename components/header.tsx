"use client";

import { Links } from "@/components/links";
import { HueContext } from "@/context/hue-provider";
import { useContext, useEffect, useRef } from "react";

interface HeaderProps {
  title: string;
  description: string;
  socials: string[];
}

export const Header = ({ title, description, socials }: HeaderProps) => {
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
    <header className="flex flex-col items-center py-12">
      <h1 ref={ref} className={`text-center text-5xl font-bold md:text-7xl`}>
        {title}
      </h1>
      <p className="pb-4 text-center">{description}</p>
      <Links links={socials} />
    </header>
  );
};
