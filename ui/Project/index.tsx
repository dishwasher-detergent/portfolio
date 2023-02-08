import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Models } from "appwrite";

interface ProjectProps {
  content: Models.Document;
}

export default function Project({ content }: ProjectProps) {
  return (
    <article className="h-72 bg-white relative overflow-hidden group">
      <Link
        href={`Projects/${content.$id}`}
        className="absolute inset-0 z-30 bg-slate-900/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all grid place-items-center"
      >
        <button className="py-2 px-4 rounded-xl text-white group-hover:bg-slate-900 flex flex-row gap-2 items-center text-sm font-semibold">
          Explore Project <ArrowRight size={20} />
        </button>
      </Link>
      <div className="absolute bottom-0 z-20 p-4 w-full">
        <h3 className="w-full truncate font-bold text-xl display text-white dark:text-slate-900">
          {content.title}
        </h3>
        <p className="text-sm text-white dark:text-slate-900 truncate w-full">
          {content.short_description}
        </p>
        <div className="flex flex-row flex-nowrap py-2 gap-1 overflow-x-auto overflow-y-hidden">
          {content.tags.map((item: string, index: number) => {
            if (item == null) return;
            return (
              <div
                className="whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold text-white bg-emerald-600"
                key={index}
              >
                {item}
              </div>
            );
          })}
        </div>
      </div>
      <div className="z-10 absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent dark:from-slate-300/70" />
      <div className="bg-slate-900 absolute inset-0 z-0">
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
