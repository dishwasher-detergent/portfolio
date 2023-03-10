import { ProjectProps } from "#/types/Project";
import api from "#/utils/appwrite";
import { textColor } from "#/utils/color";
import Image from "next/image";
import Link from "next/link";

export default function Project({ content }: ProjectProps) {
  const banner = content.banner
    ? api.getFilePreview(content.banner, {
        height: "800",
        quality: "80",
        gravity: "center",
      })
    : null;

  return (
    <div
      className="h-auto cursor-pointer rounded-xl p-4 md:h-72"
      style={{
        backgroundColor: textColor(content.accent_color, true, 0.05).style
          .backgroundColor,
      }}
    >
      <Link
        className="flex h-full w-full flex-col-reverse flex-nowrap gap-4 md:flex-row"
        href={`Project/${content.$id}`}
      >
        <div className="relative flex w-full flex-1 flex-col justify-end overflow-hidden">
          <p className="absolute top-0 left-0 text-xs font-semibold text-slate-600 dark:text-slate-100">
            {new Date(content.$createdAt).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
          <h2 className="display w-full truncate py-4 text-4xl font-bold text-slate-900 dark:text-white">
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
        </div>
        <div
          className="relative h-60 w-full overflow-hidden rounded-xl md:h-full md:w-80"
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
      </Link>
    </div>
  );
}
