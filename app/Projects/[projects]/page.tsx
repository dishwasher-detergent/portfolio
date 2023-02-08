import { Client, Databases, Query } from "appwrite";
import Image from "next/image";

export type Projects = {
  title: string;
  short_description: string;
  description: string;
  images: string[];
  tags: string[];
  banner: string;
};

const client = new Client();

const databases = new Databases(client);

client
  .setEndpoint("https://allbeefhotdogs.corndocs.com/v1")
  .setProject("63e17a1b54d5f6eec8ea");

async function getProjects(params: string) {
  const projects = await databases.getDocument(
    "63e17a380bdd4f868114",
    "63e17a3b092917cea721",
    params
  );

  return projects;
}

export default async function Project({ params }) {
  const projects = await getProjects(params.projects);
  return (
    <>
      <div className="p-4 w-full md:w-96 md:h-72 flex-none bg-slate-100 border border-slate-200 rounded-xl md:top-20 md:sticky">
        <h1 className="display text-2xl font-bold truncate">
          {projects.title}
        </h1>
        <div className="flex flex-row flex-nowrap py-2 gap-1 overflow-x-auto overflow-y-hidden">
          {projects.tags.map((item: string, index: number) => {
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
        <p>{projects.description}</p>
      </div>
      <div className="flex-1">
        {projects.images &&
          projects.images.map((image: string) => {
            if (image == null) return;
            return (
              <div
                key={image}
                className="relative w-full aspect-square overflow-hidden rounded-xl"
              >
                <Image
                  className="object-cover"
                  sizes="100%"
                  fill={true}
                  src={`https://allbeefhotdogs.corndocs.com/v1/storage/buckets/63e17bd7024f7fadf59d/files/${image}/view?project=63e17a1b54d5f6eec8ea`}
                  alt="This is the preview image of the component"
                />
              </div>
            );
          })}
      </div>
    </>
  );
}
