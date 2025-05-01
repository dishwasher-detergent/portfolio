"use client";

import { AnimatePresence, motion } from "framer-motion";
import { LucideDot } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";

import { ThemeToggle } from "@/components/dark-mode-toggle";
import { Links } from "@/components/links";
import { HueContext } from "@/context/hue-provider";

interface HeaderProps {
  title: string;
  description: string;
  socials: string[];
}

export const Header = ({ title, description, socials }: HeaderProps) => {
  const { setAnchor, width } = useContext(HueContext);
  const ref = useRef(null);
  const linksRef = useRef(null);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    if (ref.current) {
      const tempRef = ref.current as Element;
      const rect = tempRef.getBoundingClientRect();
      setAnchor({ x: rect.left - 50, y: rect.top - 75 });
    }
  }, [ref.current, width]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeaderVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (linksRef.current) {
      observer.observe(linksRef.current);
    }

    return () => {
      if (linksRef.current) {
        observer.unobserve(linksRef.current);
      }
    };
  }, [linksRef.current]);

  return (
    <>
      <header className="flex flex-col items-center py-12">
        <h1 ref={ref} className={`text-center text-5xl font-bold md:text-7xl`}>
          {title}
        </h1>
        <p className="pb-4 text-center">{description}</p>
        <div ref={linksRef}>
          <Links links={socials} />
        </div>
      </header>

      <AnimatePresence>
        {!isHeaderVisible && (
          <motion.div
            className="fixed bottom-8 left-0 right-0 z-50 grid place-items-center"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex flex-row items-center gap-2 rounded-xl bg-slate-900/10 p-3 px-6 backdrop-blur-md dark:bg-slate-50/10">
              <Links links={socials} />
              <LucideDot className="size-6" />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
