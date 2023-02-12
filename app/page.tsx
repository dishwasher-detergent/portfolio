import Project from "#/ui/Project";
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
    <section className="project-grid grid h-full w-full grid-cols-1 overflow-hidden rounded-xl md:grid-cols-2">
      {projects.map((item) => {
        return <Project key={item.title} content={item} />;
      })}
    </section>
  );
}
