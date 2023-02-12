import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Models } from "appwrite";

interface ProjectProps {
  content: Models.Document;
}

export default function Project({ content }: ProjectProps) {
  return (
    <article className="group relative h-72 overflow-hidden bg-white">
      <Link
        href={`Projects/${content.$id}`}
        className="absolute inset-0 z-30 grid place-items-center bg-slate-900/30 opacity-0 backdrop-blur-md transition-all group-hover:opacity-100"
      >
        <button className="flex flex-row items-center gap-2 rounded-xl py-2 px-4 text-sm font-semibold text-white group-hover:bg-slate-900">
          Explore Project <ArrowRight size={20} />
        </button>
      </Link>
      <div className="absolute bottom-0 z-20 w-full p-4">
        <h3 className="display w-full truncate text-xl font-bold text-white dark:text-slate-900">
          {content.title}
        </h3>
        <p className="w-full truncate text-sm text-white dark:text-slate-900">
          {content.short_description}
        </p>
        <div className="flex flex-row flex-nowrap gap-1 overflow-x-auto overflow-y-hidden py-2">
          {content.tags.map((item: string, index: number) => {
            if (item == null) return;
            return (
              <div
                className="whitespace-nowrap rounded-full bg-emerald-600 px-2 py-1 text-xs font-semibold text-white"
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-900/80 to-transparent dark:from-slate-300/70" />
      <div className="absolute inset-0 z-0 bg-slate-900">
        {content.banner && (
          <Image
            style={{ objectFit: "cover", objectPosition: "0% 15%" }}
            fill={true}
            src={`https://allbeefhotdogs.corndocs.com/v1/storage/buckets/63e17bd7024f7fadf59d/files/${content.banner}/preview?project=63e17a1b54d5f6eec8ea&width=1000&height=1000&quality=80&output=webp`}
            alt="This is the preview image of the component"
          />
        )}
      </div>
    </article>
  );
}
