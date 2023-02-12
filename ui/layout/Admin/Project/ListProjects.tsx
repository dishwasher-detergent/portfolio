import api from "#/utils/appwrite";
import Project from "#/ui/layout/Admin/Project/Project";
import { useEffect, useState } from "react";

export default function ListProjects() {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchProjects = await api.listDocuments(
        process.env.NEXT_PUBLIC_APP_COLLECTION_ID
      );
      setProjects(fetchProjects);
    })();

    const unsubscribe = api
      .provider()
      .appwrite.subscribe(
        [
          `databases.${process.env.NEXT_PUBLIC_APP_DATABASE_ID}.collections.${process.env.NEXT_PUBLIC_APP_COLLECTION_ID}.documents`,
          `buckets.${process.env.NEXT_PUBLIC_APP_BUCKET_ID}.files`,
        ],
        async () => {
          const fetchProjects = await api.listDocuments(
            process.env.NEXT_PUBLIC_APP_COLLECTION_ID
          );
          setProjects(fetchProjects);
        }
      );

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4">
      {projects &&
        projects.documents.map((project: any, index: number) => (
          <Project key={project.title + index} project={project} />
        ))}
    </div>
  );
}
