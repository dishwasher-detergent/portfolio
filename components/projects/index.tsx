import { Project } from "@/components/projects/project";
import { AppwriteService } from "@/utils/appwrite";

export async function Projects() {
  const projects = await AppwriteService.listProjects();

  console.log(projects);

  return (
    <>
      <div className="w-full flex flex-row">
        <p>Projects</p>
      </div>
      <div className="flex flex-col -space-y-1 p-10">
        {projects.documents.map((project) => (
          <Project {...project} />
        ))}
      </div>
    </>
  );
}
