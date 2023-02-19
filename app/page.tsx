import Header from "#/ui/layout/Header/Header";
import Project from "#/ui/project/Project";
import Showcase from "#/ui/project/Showcase";
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
      <div>
        <Header>Kenneth</Header>
        <Showcase content={projects.filter((e) => e.showcase)[0]} />
      </div>
      <div>
        <Header>All Projects</Header>
        <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {projects.map((item) => {
            return <Project key={item.$id} content={item} />;
          })}
        </section>
      </div>
    </>
  );
}

export const revalidate = 60;
