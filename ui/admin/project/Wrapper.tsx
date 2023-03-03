"use client";

import Project from "#/ui/admin/project/Project";
import api from "#/utils/appwrite";
import { Server } from "#/utils/config";
import { useEffect, useState } from "react";

export default function ListProjects() {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchProjects = await api.listDocuments("63e17a3b092917cea721");
      setProjects(fetchProjects);
    })();

    const unsubscribe = api
      .provider()
      .client.subscribe(
        [
          `databases.${
            Server.databaseID
          }.collections.${"63e17a3b092917cea721"}.documents`,
          `buckets.${Server.bucketID}.files`,
        ],
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
    <div className="flex flex-1 flex-col gap-4">
      {projects &&
        projects.documents.map((project: any, index: number) => (
          <Project key={project.title + index} content={project} />
        ))}
    </div>
  );
}
