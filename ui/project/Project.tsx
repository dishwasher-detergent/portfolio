import { ProjectProps } from "#/types/Project";
import api from "#/utils/appwrite";
import { textColor } from "#/utils/color";
import Image from "next/image";

export default function Project({ content }: ProjectProps) {
  const banner = content.banner
    ? api.getFilePreview(content.banner, {
        height: "800",
        quality: "80",
        gravity: "center",
      })
    : null;

  return (
    <article
      className="rounded-xl p-4"
      style={{
        backgroundColor: textColor(content.accent_color, true, 0.05).style
          .backgroundColor,
      }}
    >
      <div className="flex h-full w-full flex-col-reverse flex-nowrap gap-4 md:flex-row">
        <div className="relative flex w-full flex-1 flex-col overflow-hidden">
          <h2 className="display w-full truncate pb-4 text-4xl font-bold text-slate-900 dark:text-white md:text-6xl">
            {content.title}
          </h2>
          <div className="flex w-full flex-row gap-1 overflow-x-auto pb-2">
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
          <p>{content.description}</p>
        </div>
        <div
          className="relative h-60 w-60 overflow-hidden rounded-xl md:h-96 md:w-96"
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
            </>
          )}
        </div>
      </div>
    </article>
  );
}
