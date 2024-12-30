import { Header } from "@/components/header";
import { Links } from "@/components/links";
import { Tags } from "@/components/tags";
import { Experience, Information, Projects } from "@/types/types";
import { LucideExternalLink } from "lucide-react";
import { Metadata } from "next";

const BASE_URL =
  "https://67719ec5a84833a99973.appwrite.global/organizations/6771fb5e00156e3c9638";

const fetchPortfolio = async () => {
  const response = await fetch(BASE_URL, {
    next: {
      revalidate: 1000,
    },
  });

  try {
    const data = await response.json();

    const information = data.information as Information;
    const projects = data.projects as Projects[];
    const experience = data.experience as Experience[];

    return {
      information,
      projects,
      experience,
    };
  } catch (err) {
    const error = err as Error;

    throw new Error(error.message);
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { information } = await fetchPortfolio();

  return {
    metadataBase: new URL("https://kennethbass.com"),
    title: information.title,
    description: information.description,
    icons: {
      icon: [
        {
          url: `${BASE_URL}/favicon?width=64&height=64&quality=100`,
        },
      ],
    },
    openGraph: {
      title: information.title,
      description: information.description,
      url: "https://kennethbass.com",
      siteName: "kennethbass.com",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: `${BASE_URL}/favicon?width=256&height=256&quality=60`,
          width: 256,
          height: 256,
        },
      ],
    },
    twitter: {
      card: "summary",
      title: information.title,
      description: information.description,
      images: [`${BASE_URL}/favicon?width=256&height=256&quality=60`],
    },
  };
}

export default async function Home() {
  const { information, projects, experience } = await fetchPortfolio();

  return (
    <main className="relative flex min-h-screen w-full flex-col gap-16 overflow-hidden px-4">
      <section className="mx-auto w-full max-w-5xl overflow-hidden pt-12">
        <Header
          title={information.title}
          description={information.description}
          socials={information.socials}
        />
      </section>
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="pb-4 text-xl font-semibold">Experience</h2>
        <ul className="space-y-8">
          {experience
            .sort(
              (a, b) =>
                new Date(b.start_date).getTime() -
                new Date(a.start_date).getTime(),
            )
            .map((experience, index) => (
              <li key={index}>
                <p className="flex flex-row gap-2">
                  <span>
                    {new Date(experience.start_date).toLocaleDateString(
                      undefined,
                      {
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </span>
                  <span>-</span>
                  {experience.end_date ? (
                    <span>
                      {new Date(experience.end_date).toLocaleDateString(
                        undefined,
                        {
                          month: "long",
                          year: "numeric",
                        },
                      )}
                    </span>
                  ) : (
                    <span>Present</span>
                  )}
                </p>
                <h3 className="my-0.5 text-3xl font-bold">
                  {experience.title}
                </h3>
                <p className="flex flex-row items-center gap-2">
                  {experience.company}
                  {experience.website && (
                    <a
                      key={index}
                      target="_blank"
                      href={experience.website.toString()}
                      className="rounded-xl p-2 hover:bg-slate-600/20 hover:dark:bg-slate-200/20"
                    >
                      {<LucideExternalLink className="h-4 w-4" />}
                    </a>
                  )}
                </p>
                <Tags tags={experience.skills} />
                {experience.description && (
                  <p className="max-w-2xl">{experience.description}</p>
                )}
              </li>
            ))}
        </ul>
      </section>
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="pb-4 text-xl font-semibold">Projects</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <article
              key={index}
              className="flex flex-col items-start gap-4 md:flex-row"
            >
              {project?.image_ids?.length > 0 && (
                <div className="aspect-video w-full flex-none overflow-hidden rounded-lg md:aspect-square md:w-64">
                  <img
                    src={`${BASE_URL}/organizations/${project.slug}/images/${project.image_ids[0]}?width=512&height=512&quality=60`}
                    className="h-full w-full object-cover object-left-top"
                  />
                </div>
              )}
              <div className="flex-1 space-y-4">
                <h3 className="flex flex-row items-center gap-2 text-3xl font-bold">
                  {project.title}
                  <Links links={project.links} />
                </h3>
                <Tags tags={project.tags} />
                <p className="max-w-2xl">{project.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <p className="font-bold">
            Made by the most rootin tootin cowboy in Oklahoma
          </p>
          <Links links={information.socials} />
        </div>
      </footer>
    </main>
  );
}
