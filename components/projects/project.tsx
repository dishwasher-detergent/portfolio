import { AW_PROJECT_BUCKET_ID, AW_PROJECT_ID } from "@/utils/appwrite";
import { Corners } from "../corners";

interface ProjectProps {
  title: string;
  description: string;
  short_description: string;
  images: string[];
  website: string;
  github: string;
  tags: string[];
}

export function Project({
  title,
  description,
  short_description,
  images,
  website,
  github,
  tags,
}: ProjectProps) {
  return (
    <a className="relative w-full md:h-60 flex flex-col md:flex-row md:items-center group cursor-pointer p-4">
      <div className="flex-none md:h-full w-full aspect-square md:aspect-auto md:w-0 bg-white/20 rounded-3xl md:group-hover:w-80 md:group-hover:mr-6 transition-all overflow-hidden">
        <img
          src={`https://cloud.appwrite.io/v1/storage/buckets/${AW_PROJECT_BUCKET_ID}/files/${images[0]}/view?project=${AW_PROJECT_ID}`}
          className="h-full w-full object-cover object-left-top"
        />
      </div>
      <div className="flex-1 overflow-hidden space-y-2 py-2 md:py-0 md:space-y-0">
        <p className="text-5xl md:text-8xl font-display truncate">{title}</p>
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-white/20 rounded-full px-2 py-1 text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Corners />
    </a>
  );
}
