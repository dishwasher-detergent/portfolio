import { Marquee } from "@/components/marquee";
import { Project } from "@/components/projects/project";
import { AppwriteService } from "@/utils/appwrite";

export async function Projects() {
  const projects = await AppwriteService.listProjects();

  console.log(projects);

  return (
    <>
      <Marquee text="Projects" />
      <section className="flex flex-col -space-y-1 p-4 md:p-10">
        {projects.documents.map((project) => (
          <Project key={project.$id} {...project} />
        ))}
      </section>
    </>
  );
}
