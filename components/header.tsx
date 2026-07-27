"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useRef, useState } from "react";

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
      <header className="flex flex-col items-center py-8">
        <h1 ref={ref} className={`text-center text-4xl font-bold md:text-5xl`}>
          {title}
        </h1>
        <p className="pb-2 text-center text-sm">{description}</p>
        <div ref={linksRef}>
          <Links links={socials} />
        </div>
      </header>

      <AnimatePresence>
        {!isHeaderVisible && (
          <motion.div
            className="pointer-events-none fixed inset-y-0 left-0 right-0 z-50 hidden md:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mx-auto flex h-full max-w-3xl items-start justify-end px-4 pt-24">
              <div className="pointer-events-auto flex flex-row items-center rounded-xl bg-slate-50/70 p-2 backdrop-blur-md dark:bg-slate-950/70">
                <Links links={socials} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
