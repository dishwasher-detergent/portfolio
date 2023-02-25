"use client";

import api from "#/utils/appwrite";
import { AutoTextSize } from "auto-text-size";
import Image from "next/image";
import { useEffect, useState } from "react";
import { textColor } from "#/utils/color";
import { ProjectProps } from "#/types/Project";

export default function Showcase({ content }: ProjectProps) {
  const [banner, setBanner] = useState<URL | null>(null);

  useEffect(() => {
    if (!content.images) return;

    const img = api.getFilePreview(content.banner, {
      height: 1080,
      quality: 100,
      gravity: "center",
    });
    setBanner(img);
  }, []);

  return (
    <div className="relative z-40 h-auto w-full rounded-xl bg-slate-900 md:p-8">
      <div
        className="relative h-96 w-full overflow-hidden rounded-xl md:aspect-[5/3] md:h-auto"
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
      </div>
    </div>
  );
}
