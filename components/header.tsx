"use client";

import { Links } from "@/components/links";
import { HueContext } from "@/context/hue-provider";
import { useContext, useEffect, useRef } from "react";

interface HeaderProps {
  title: string;
  description: string;
  socials: {
    url: string;
    value: string;
  }[];
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
    <header className="py-24">
      <h1 ref={ref} className={`text-5xl font-bold md:text-7xl`}>
        {title}
      </h1>
      <p className="pb-2 text-xl font-semibold">{description}</p>
      <Links links={socials.map((x) => x.url + x.value)} />
    </header>
  );
};
