"use client";

import api from "#/utils/appwrite";
import { Models } from "appwrite";
import { AutoTextSize } from "auto-text-size";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ShowcaseProps {
  content: Models.Document;
}

type Image = {
  name: string;
  image: URL;
};

export default function Showcase({ content }: ShowcaseProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [banner, setBanner] = useState<string | null>(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (!content.images) return;
    const fetchImages: Image[] = [];

    for (let i = 0; i < content.images.length; i++) {
      if (content.images[i] == null) continue;
      const img = api.getFilePreview(content.images[i], {
        height: 800,
        quality: 80,
        gravity: "center",
      });
      fetchImages.push({ name: content.images[i], image: img });
    }

    setImages(fetchImages);
    setBanner(
      fetchImages.filter((x) => x.name == content.banner)[0].image.href
    );
  }, [content]);

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-xl md:aspect-[5/2.5] md:h-auto">
      {banner && (
        <>
          <Image
            fill
            style={{
              objectFit: "cover",
              objectPosition: "top left",
            }}
            className="z-0"
            src={banner}
            alt={content.short_description}
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/70 to-transparent" />
        </>
      )}
      <div className="absolute inset-0 z-20 flex flex-col-reverse flex-nowrap gap-6 p-6 md:flex-row">
        <div className="flex w-full flex-none flex-col justify-end md:w-2/3">
          <div className="relative top-4 w-full md:top-12">
            <AutoTextSize
              mode="oneline"
              as="h2"
              maxFontSizePx={1000}
              className="m-0 p-0 font-bold text-white"
            >
              <a href={content.website} target="_blank" rel="noreferrer">
                {content.title}
              </a>
            </AutoTextSize>
          </div>
          <div className="flex flex-row gap-1 md:px-4">
            {content.tags.map((tag: string) => (
              <span
                key={tag}
                className="relative whitespace-nowrap rounded-full bg-emerald-600 px-2 py-1 text-xs font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        {images.length > 1 && (
          <div className="flex h-64 w-full flex-1 flex-row gap-2 overflow-y-auto rounded-xl pr-1 md:h-full md:flex-col md:justify-end">
            {images.length > 0 ? (
              images.map((image: Image) => {
                if (image.name == content.banner) return;
                return (
                  <div
                    key={image.name}
                    className="relative h-32 w-1/2 flex-none overflow-hidden rounded-xl dark:bg-slate-900 md:h-1/3 md:w-full"
                  >
                    <Image
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: "top left",
                      }}
                      src={image.image.href}
                      alt={image.image.href}
                    />
                  </div>
                );
              })
            ) : (
              <div className="relative h-1/3 w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-600 dark:border-slate-700 dark:bg-slate-900" />
            )}
          </div>
        )}
        <p className="absolute top-4 left-4 font-bold text-white">Showcase</p>
      </div>
    </div>
  );
}
