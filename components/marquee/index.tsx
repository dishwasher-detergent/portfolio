"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LucideAsterisk } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

interface MarqueeProps {
  text: string;
}

export function Marquee({ text }: MarqueeProps) {
  const marquee = useRef(null);
  const topText = useRef(null);
  const bottomText = useRef(null);

  const marqueeCount = 36;

  useEffect(() => {
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: marquee.current,
        start: "-40% bottom",
        scrub: 10,
      },
    });

    timeline
      .to(topText.current, { duration: 5, xPercent: 100 })
      .to(bottomText.current, { duration: 5, xPercent: -100 }, "<");
  }, []);

  return (
    <section
      ref={marquee}
      className="py-2 relative overflow-hidden lg:text-9xl md:8xl sm:4xl font-black"
    >
      <ul
        ref={topText}
        className="w-fit flex gap-2 relative whitespace-nowrap -translate-x-full"
      >
        {[...Array(marqueeCount)].map((val: any, index: number) => {
          const isFontDisplay = Math.random() < 0.5; // 50% chance to get true
          const className = isFontDisplay ? "font-display" : "";
          return (
            <li
              key={index}
              className={`${className} flex flex-row gap-2 items-center`}
              style={{
                opacity: Math.random() * 0.75 + 0.75,
              }}
            >
              {text} <LucideAsterisk size={32} />
            </li>
          );
        })}
      </ul>
      <ul
        ref={bottomText}
        className="w-fit flex gap-2 relative whitespace-nowrap translate-x-1/2"
      >
        {[...Array(marqueeCount)].map((val: any, index: number) => {
          const isFontDisplay = Math.random() < 0.5; // 50% chance to get true
          const className = isFontDisplay ? "font-display" : "";
          return (
            <li
              key={index}
              className={`${className} flex flex-row gap-2 items-center`}
              style={{
                opacity: Math.random() * 0.5 + 0.5,
              }}
            >
              {text} <LucideAsterisk size={32} />
            </li>
          );
        })}
      </ul>
    </section>
  );
}
