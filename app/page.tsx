import {
  AW_PROJECT_BUCKET_ID,
  AW_PROJECT_ID,
  AppwriteService,
} from "@/utils/appwrite";
import { LucideExternalLink, LucideGithub } from "lucide-react";

const fetchProjects = async () => {
  return AppwriteService.listProjects();
};

export default async function Home() {
  const projects = await fetchProjects();
  return (
    <main className="flex min-h-screen flex-col relative p-4 space-y-4">
      <section className="p-4 h-[50vh] flex flex-col justify-end text-white background rounded-3xl">
        <p className="text-9xl font-display">Hello!</p>
        <h1 className="text-9xl font-display">I&apos;m Kenneth Bass</h1>
      </section>
      <section>
        <h2 className="text-6xl font-bold py-4">Explore My Work</h2>
        <div className="grid grid-cols-2 overflow-hidden rounded-3xl projects">
          {projects.documents.map((x, i) => (
            <div
              className="p-2 bg-slate-950"
              style={{
                borderBottomRightRadius:
                  i + 1 === projects.documents.length ||
                  i + 2 === projects.documents.length
                    ? "1.5rem"
                    : 0,
              }}
            >
              <div
                key={x.$id}
                className="w-full aspect-video bg-slate-950/10 relative overflow-hidden rounded-3xl"
              >
                <img
                  src={`https://cloud.appwrite.io/v1/storage/buckets/${AW_PROJECT_BUCKET_ID}/files/${x.images[0]}/view?project=${AW_PROJECT_ID}`}
                  className="absolute inset-0 h-full w-full object-cover object-left-top"
                />
                <div className="p-4 bg-gradient-to-t from-slate-950/60 text-white to-transparent h-2/3 absolute bottom-0 w-full flex flex-col justify-end gap-2">
                  <h3 className="font-bold text-3xl">{x.title}</h3>
                  <div className="flex flex-row flex-wrap gap-2">
                    {x.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-white/20 rounded-full px-2 py-1 text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-row flex-wrap gap-2">
                    {x.website && (
                      <a
                        href={x.website}
                        target="_blank"
                        className="p-2 rounded-xl hover:bg-white/20"
                      >
                        <LucideExternalLink size={24} />
                      </a>
                    )}
                    {x.github && (
                      <a
                        href={x.github}
                        target="_blank"
                        className="p-2 rounded-xl hover:bg-white/20"
                      >
                        <LucideGithub size={24} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {projects.documents.length % 2 === 1 && (
            <div className="relative filler">
              <div className="absolute top-0 left-0 h-24 w-24 bg-slate-950" />
              <div className="absolute top-0 left-0 h-24 w-24 bg-white rounded-tl-3xl" />
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
