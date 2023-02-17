import Project from "#/ui/project/Project";
import api from "#/utils/appwrite";

async function getProjects() {
  const documents = await api.listDocuments(
    process.env.NEXT_PUBLIC_APP_COLLECTION_ID
  );
  return documents.documents;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <h2
        id="projects"
        className="display pb-4 text-xl font-bold text-slate-900 dark:text-white"
      >
        Projects:
      </h2>
      <section className="flex w-full flex-col gap-4">
        {projects.map((item) => {
          return <Project key={item.$id} content={item} />;
        })}
      </section>
    </>
  );
}

export const revalidate = 60;
