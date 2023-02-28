"use client";

import api from "#/utils/appwrite";
import { AutoTextSize } from "auto-text-size";
import Image from "next/image";
import { useEffect, useState } from "react";
import { textColor } from "#/utils/color";
import { ProjectProps } from "#/types/Project";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

export default function Showcase({ content }: ProjectProps) {
  const { scrollYProgress } = useScroll();
  const [scroll, setScroll] = useState<number>(1);
  const [banner, setBanner] = useState<URL | null>(null);

  useEffect(() => {
    if (!content.images) return;

    const img = api.getFilePreview(content.banner, {
      height: "1080",
      quality: "100",
      gravity: "center",
    });
    setBanner(img);
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const max = 1.1;
    const min = 1;
    let val = latest / 6 + 1;

    if (val <= max && val >= min) {
      setScroll(val);
    }
  });

  return (
    <motion.div
      style={{ scaleX: scroll }}
      className="relative z-40 h-auto w-full rounded-xl bg-slate-900 dark:bg-slate-800 md:p-8"
    >
      <Link
        href={`Project/${content.$id}`}
        className="relative block h-96 w-full overflow-hidden rounded-xl md:aspect-[5/3] md:h-auto"
        {...textColor(content.accent_color, true)}
      >
        {banner && (
          <>
            <Image
              fill
              style={{
                objectFit: "cover",
                objectPosition: "top left",
              }}
              className="z-0"
              src={banner.href}
              alt={content.short_description}
            />
            <div
              className="absolute inset-0 z-10"
              {...textColor(content.accent_color, true, 0.15)}
            />
          </>
        )}
        <div className="absolute inset-0 z-20 flex w-full flex-none flex-col flex-nowrap justify-end p-6">
          <div className="relative top-4 flex w-full flex-col">
            <AutoTextSize
              mode="oneline"
              maxFontSizePx={1000}
              className="display relative m-0 flex items-center p-0 font-bold"
              {...textColor(content.accent_color)}
            >
              <a href={content.website} target="_blank" rel="noreferrer">
                {content.title}
              </a>
            </AutoTextSize>
          </div>
          <div className="flex flex-row gap-1">
            {content.tags.map((tag: string) => (
              <span
                key={tag}
                className="relative whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold"
                {...textColor(content.accent_color, true)}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
