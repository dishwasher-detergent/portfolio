import { ProjectTypes } from "#/types/Project";
import { ChildWrapper } from "#/ui/animate/ChildWrapper";
import Header from "#/ui/layout/Header/Header";
import Project from "#/ui/project/Compact";
import Showcase from "#/ui/project/Showcase";
import api from "#/utils/appwrite";
import { Models } from "appwrite";

type Projects = ProjectTypes & Models.Document;

async function getProjects(): Promise<Projects[]> {
  const documents = await api.listDocuments(
    process.env.NEXT_PUBLIC_APP_COLLECTION_ID
  );

  const projects = documents.documents as Projects[];

  return projects;
}

export default async function Home() {
  const projects: Projects[] = await getProjects();

  return (
    <ChildWrapper>
      <div className="py-0 md:pb-12">
        <Header>Kennethh</Header>
        <Showcase content={projects.filter((e) => e.showcase)[0]} />
      </div>
      <div className="py-4 md:py-12">
        <div className="sticky top-16">
          <div className="w-3/5">
            <p className="relative top-4 w-full text-xl text-slate-900 dark:text-white md:top-20 md:text-6xl">
              All
            </p>
            <Header>Projects</Header>
          </div>
        </div>
        <section className="grid grid-cols-1 gap-4 overflow-hidden rounded-xl bg-white/80 backdrop-blur-lg dark:bg-slate-900/80 md:grid-cols-2">
          {projects.map((item) => {
            return <Project key={item.$id} content={item} />;
          })}
        </section>
      </div>
    </ChildWrapper>
  );
}

export const revalidate = 60;
