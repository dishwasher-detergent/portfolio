import api from "#/utils/appwrite";
import Project from "#/ui/layout/Admin/Project";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchProjects = await api.listDocuments("63e17a3b092917cea721");
      setProjects(fetchProjects);
    })();

    const unsubscribe = api
      .provider()
      .appwrite.subscribe(
        "databases.63e17a380bdd4f868114.collections.63e17a3b092917cea721.documents",
        async () => {
          const fetchProjects = await api.listDocuments("63e17a3b092917cea721");
          setProjects(fetchProjects);
        }
      );

    return function cleanup() {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col gap-4">
      {projects &&
        projects.documents.map((project: any, index: number) => (
          <Project key={project.title + index} project={project} />
        ))}
    </div>
  );
}
