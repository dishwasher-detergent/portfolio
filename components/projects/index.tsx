import { Marquee } from "@/components/marquee";
import { Project } from "@/components/projects/project";
import { AppwriteService } from "@/utils/appwrite";

export async function Projects() {
  const projects = await AppwriteService.listProjects();

  console.log(projects);

  return (
    <>
      <Marquee text="Projects" />
      <div className="flex flex-col -space-y-1 p-10">
        {projects.documents.map((project) => (
          <Project key={project.$id} {...project} />
        ))}
      </div>
    </>
  );
}
