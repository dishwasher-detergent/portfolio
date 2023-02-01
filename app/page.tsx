import Project from "#/ui/Project";
import projects from "#/_projects/projects.json";

export type Projects = {
  title: string;
  short_description: string;
  description: string;
  banner: string;
  images: string[];
  tags: string[];
};

export default function Home() {
  return (
    <section className="w-full h-full overflow-hidden rounded-xl grid grid-cols-1 md:grid-cols-2 project-grid">
      {projects.map((item: Projects) => {
        return <Project key={item.title} content={item} />;
      })}
    </section>
  );
}
