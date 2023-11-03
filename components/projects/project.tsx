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
    <a className="relative w-full h-60 flex flex-row items-center group cursor-pointer p-4">
      <div className="flex-none h-full w-0 bg-white/20 rounded-3xl group-hover:w-80 group-hover:mr-6 transition-all overflow-hidden">
        <img
          src={`https://cloud.appwrite.io/v1/storage/buckets/${AW_PROJECT_BUCKET_ID}/files/${images[0]}/view?project=${AW_PROJECT_ID}`}
          className="h-full w-full object-fill"
        />
      </div>
      <div className="flex-1 overflow-hidden">
        <p className="text-8xl font-display truncate">{title}</p>
        <div className="flex flex-row flex-wrap gap-2">
          {tags.map((tag) => (
            <span className="bg-white/20 rounded-full px-2 py-1 text-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <Corners />
    </a>
  );
}
