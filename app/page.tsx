import { ThemeToggle } from "@/components/dark-mode-toggle";
import { HueLoop } from "@/components/hueLoop";
import { Links } from "@/components/links";
import { Tags } from "@/components/tags";
import { displayClass } from "@/lib/font";
import { Experience, Information, Projects } from "@/types/types";

const BASE_URL =
  "https://65859d577192b501841c.appwrite.global/portfolios/kenny";

const fetchPortfolio = async () => {
  const response = await fetch(BASE_URL, { next: { revalidate: 0 } });

  const data = await response.json();

  const information = data.information as Information;
  const projects = data.projects as Projects[];
  const experience = data.experience as Experience[];

  return {
    information,
    projects,
    experience,
  };
};

export async function generateMetadata() {
  const { information } = await fetchPortfolio();

  return {
    title: information.title,
    description: information.description,
    image: `${BASE_URL}/image?width=256&height=256&quality=60`,
    openGraph: {
      title: information.title,
      description: information.description,
      url: "https://kennethbass.com",
      siteName: "kennethbass.com",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/image?width=256&height=256&quality=60`,
          width: 256,
          height: 256,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: information.title,
      description: information.description,
      images: [`${BASE_URL}/image?width=256&height=256&quality=60`],
    },
  };
}

export default async function Home() {
  const { information, projects, experience } = await fetchPortfolio();

  return (
    <main className="relative flex min-h-screen w-full flex-col overflow-hidden">
      <HueLoop />
      <section className="mx-auto w-full max-w-5xl overflow-hidden  px-4">
        <nav className="flex justify-end p-4">
          <ThemeToggle />
        </nav>
        <header className="py-24 mix-blend-luminosity">
          <h1 className={`text-6xl font-bold ${displayClass}`}>
            {information.title}
          </h1>
          <p className="pb-2 text-xl font-semibold">
            {information.description}
          </p>
          <Links links={information.social.map((x) => x.url + x.value)} />
        </header>
      </section>
      <section className="mx-auto w-full max-w-5xl p-4 pb-12">
        <h2 className="pb-4 text-xl font-semibold">Experience</h2>
        <ul className="space-y-8">
          {experience
            .sort(
              (a, b) =>
                new Date(b.start).getTime() - new Date(a.start).getTime(),
            )
            .map((experience, index) => (
              <li key={index}>
                <p>{experience.company}</p>
                <h3
                  className={`flex flex-row items-center gap-4 text-3xl font-bold ${displayClass}`}
                >
                  {experience.title}
                </h3>
                {experience.description && <p>{experience.description}</p>}
                <div className="flex flex-row gap-2">
                  <p>
                    {new Date(experience.start).toLocaleDateString(undefined, {
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                  {experience.end && (
                    <>
                      <p>-</p>
                      <p>
                        {new Date(experience.end).toLocaleDateString(
                          undefined,
                          {
                            month: "long",
                            day: "numeric",
                          },
                        )}
                      </p>
                    </>
                  )}
                </div>
              </li>
            ))}
        </ul>
      </section>
      <section className="mx-auto w-full max-w-5xl p-4 pb-12">
        <h2 className="pb-4 text-xl font-semibold">Projects</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <article key={index} className="flex flex-col gap-4 md:flex-row">
              <div
                className="aspect-square w-full flex-none overflow-hidden rounded-lg md:h-64 md:w-64"
                style={{ backgroundColor: project.color + "50" }}
              >
                <img
                  src={`${BASE_URL}/projects/${project.slug}/image/${project.images[0]}?width=256&height=256&quality=60`}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 space-y-2">
                <h3
                  className={`flex flex-row items-center gap-4 text-3xl font-bold ${displayClass}`}
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
        </div>
      </section>
      <footer>
        <div className="mx-auto flex max-w-5xl flex-col items-center p-4">
          <p>
            Made with
            <span role="img" aria-label="heart">
              ❤️
            </span>
            by Kenny
          </p>
          <Links links={information.social.map((x) => x.url + x.value)} />
        </div>
      </footer>
    </main>
  );
}
