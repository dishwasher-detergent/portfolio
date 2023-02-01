import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Project() {
  return (
    <article className="h-72 bg-white relative overflow-hidden group">
      <Link
        href="/"
        className="absolute inset-0 z-30 bg-slate-900/30 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all grid place-items-center"
      >
        <button className="py-2 px-4 rounded-xl text-white group-hover:bg-slate-900 flex flex-row gap-2 items-center text-sm font-semibold">
          Explore Project <ArrowRight size={20} />
        </button>
      </Link>
      <div className="absolute bottom-0 z-20 p-2 w-full">
        <h3 className="w-full truncate font-bold text-xl display text-white dark:text-slate-900">
          Titleasdfasdfasdfasdfasdfasdfasdfasdfa sdfasdfasdf as df
        </h3>
        <p className="text-sm text-white dark:text-slate-900 truncate w-full">
          Descriptionasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdfasdf
        </p>
        <div className="flex flex-row flex-nowrap py-2 gap-1 overflow-x-auto overflow-y-hidden">
          <div className="whitespace-nowrap rounded-full px-1.5 py-0.5 text-xs font-bold text-white bg-emerald-600">
            Test
          </div>
        </div>
      </div>
      <div className="z-10 absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent dark:from-slate-300/70" />
      <div className="bg-slate-900 absolute inset-0 z-0">
        <Image
          style={{ objectFit: "cover", objectPosition: "0% 15%" }}
          fill={true}
          src={`https://images.unsplash.com/photo-1503777119540-ce54b422baff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=772&q=80`}
          alt="This is the preview image of the component"
        />
      </div>
    </article>
  );
}
