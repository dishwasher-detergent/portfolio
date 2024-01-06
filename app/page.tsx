import { HueLoop } from "@/components/hueLoop";
import { Links } from "@/components/links";
import { Tags } from "@/components/tags";
import { displayClass } from "@/lib/font";
import { Information, Projects } from "@/types/types";

const BASE_URL =
  "https://65859d577192b501841c.appwrite.global/portfolios/kenny";

const fetchPortfolio = async () => {
  const response = await fetch(BASE_URL, { next: { revalidate: 0 } });

  const data = await response.json();

  const information = data.information as Information;
  const projects = data.projects as Projects[];

  return {
    information,
    projects,
  };
};

export default async function Home() {
  const { information, projects } = await fetchPortfolio();

  return (
    <main className="flex min-h-screen w-full flex-col relative overflow-hidden">
      <HueLoop />
      <section className="w-full px-4 py-24 overflow-hidden">
        <div className="max-w-5xl mx-auto mix-blend-luminosity">
          <h1 className={`text-6xl font-bold ${displayClass}`}>
            {information.title}
          </h1>
          <p className="text-xl font-semibold pb-4">
            {information.description}
          </p>
          <Links links={information.social.map((x) => x.url + x.value)} />
        </div>
      </section>
      <section className="p-4 space-y-8 max-w-5xl mx-auto w-full">
        {projects.map((project, index) => (
          <article key={index} className="flex flex-col md:flex-row gap-4">
            <div
              className="flex-none w-full aspect-square md:w-64 md:h-64 overflow-hidden rounded-lg"
              style={{ backgroundColor: project.color + "50" }}
            >
              <img
                src={`${BASE_URL}/projects/${project.slug}/image/${project.images[0]}?width=256&height=256&quality=60`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 space-y-2">
              <h3
                className={`text-3xl font-bold flex flex-row gap-4 items-center ${displayClass}`}
              >
                {project.title}
                <Links links={project.links} />
              </h3>
              <Tags tags={project.tags} />
              <p className="font-semibold text-slate-600 dark:text-slate-100">
                {project.description}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
