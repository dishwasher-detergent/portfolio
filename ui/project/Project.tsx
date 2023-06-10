import { ProjectProps } from "#/types/Project";
import api from "#/utils/appwrite";
import { textColor } from "#/utils/color";
import { ExternalLink, Github } from "lucide-react";
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
          <nav className="flex w-full flex-row flex-wrap gap-2 pb-2">
            {content.website && (
              <a
                href={content.website}
                target="_blank"
                rel="noreferrer"
                className="flex cursor-pointer flex-row gap-2 rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800"
              >
                Visit
                <ExternalLink size={20} />
              </a>
            )}
            {content.github && (
              <a
                href={content.github}
                target="_blank"
                rel="noreferrer"
                className="flex cursor-pointer flex-row gap-2 rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800"
              >
                Code
                <Github size={20} />
              </a>
            )}
          </nav>
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
