import Project from "#/ui/Project";
import api from "#/utils/appwrite";

async function getProjects() {
  const documents = await api.listDocuments("63e17a3b092917cea721");
  return documents.documents;
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <section className="w-full h-full overflow-hidden rounded-xl grid grid-cols-1 md:grid-cols-2 project-grid">
      {projects.map((item) => {
        return <Project key={item.title} content={item} />;
      })}
    </section>
  );
}
