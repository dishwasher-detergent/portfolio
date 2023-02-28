"use client";

import api from "#/utils/appwrite";
import Project from "#/ui/layout/Admin/Project/Project";
import { useEffect, useState } from "react";
import { Server } from "#/utils/config";

export default function ListProjects() {
  const [projects, setProjects] = useState<any>();

  useEffect(() => {
    (async () => {
      const fetchProjects = await api.listDocuments(Server.collectionID);
      setProjects(fetchProjects);
    })();

    const unsubscribe = api
      .provider()
      .appwrite.subscribe(
        [
          `databases.${Server.databaseID}.collections.${Server.collectionID}.documents`,
          `buckets.${Server.bucketID}.files`,
        ],
        async () => {
          const fetchProjects = await api.listDocuments(Server.collectionID);
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
