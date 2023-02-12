"use client";

import { Models } from "appwrite";
import Card from "#/ui/form/Card";
import { useEffect, useState } from "react";
import api from "#/utils/appwrite";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ProjectProps {
  content: Models.Document;
}

type Image = {
  name: string;
  image: URL;
};

export default function Project({ content }: ProjectProps) {
  const [images, setImages] = useState<Image[]>([]);
  const [banner, setBanner] = useState<string | null>(null);

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
    <Card type="article" className="md:h-[28rem] md:w-full">
      <div className="flex h-full w-full flex-col-reverse flex-nowrap gap-2 md:flex-row">
        <div className="flex w-full flex-none flex-col gap-2 p-4 text-slate-900 dark:text-white md:w-1/3">
          <h1 className="flex flex-row flex-nowrap items-center gap-2">
            <a
              href={content.website}
              target="_blank"
              rel="noreferrer"
              className="display truncate text-4xl font-bold"
            >
              {content.title}
            </a>
            <ExternalLink size={20} className="flex-none" />
          </h1>
          <div className="flex flex-row gap-1">
            {content.tags.map((tag: string) => (
              <span
                key={tag}
                className="relative whitespace-nowrap rounded-full bg-emerald-600 px-2 py-1 text-xs font-semibold text-white"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="overflow-y-auto break-words pt-4 pr-1 sm:max-h-48 md:flex-1">
            {content.description}
          </p>
        </div>
        <div className="flex h-full flex-1 flex-col flex-nowrap gap-2 md:flex-row">
          <div className="relative h-64 flex-none overflow-hidden rounded-xl border border-slate-200 bg-slate-600 dark:border-slate-700 dark:bg-slate-900 md:h-full md:flex-1">
            {banner && (
              <Image
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top left",
                }}
                src={banner}
                alt={"test"}
              />
            )}
          </div>
          {images.length > 1 && (
            <div className="flex h-full w-full flex-none flex-row gap-2 overflow-y-auto rounded-xl pr-1 md:w-1/3 md:flex-col">
              {images.length > 0 ? (
                images.map((image: Image) => {
                  if (image.name == content.banner) return;
                  return (
                    <div
                      key={image.name}
                      className="relative h-32 w-1/2 flex-none overflow-hidden rounded-xl border border-slate-200 bg-slate-600 dark:border-slate-700 dark:bg-slate-900 md:h-1/3 md:w-full"
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
        </div>
      </div>
    </Card>
  );
}
