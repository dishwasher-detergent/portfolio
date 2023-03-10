"use client";

import api from "#/utils/appwrite";
import { textColor } from "#/utils/color";
import Image from "next/image";
import { useEffect, useState } from "react";

interface ProjectProps {
  image: string;
  title: string;
  accent_color: string;
}

export default function Showcase({ image, accent_color, title }: ProjectProps) {
  const [banner, setBanner] = useState<URL | null>(null);

  useEffect(() => {
    const img = api.getFilePreview(image, {
      height: "1080",
      quality: "100",
      gravity: "center",
    });
    setBanner(img);
  }, []);

  return (
    <div className="relative z-40 h-auto w-full rounded-xl border border-slate-300 dark:border-slate-700">
      <div
        className="relative aspect-square w-full overflow-hidden rounded-xl p-4 md:aspect-[5/3] md:h-auto"
        {...textColor(accent_color, true)}
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
              alt={title}
            />
          </>
        )}
      </div>
    </div>
  );
}
