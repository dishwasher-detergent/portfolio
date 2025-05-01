import { Metadata } from "next";

import { Experience } from "@/components/experience";
import { Header } from "@/components/header";
import { Links } from "@/components/links";
import { ProjectCard } from "@/components/project-card";
import { BASE_URL, TEAM_ID } from "@/constants/base.constants";

import { Client } from "@kurioh/client";

const fetchPortfolio = async () => {
  const client = new Client(BASE_URL, TEAM_ID);

  try {
    const { data, isError, error } = await client.team.get();

    if (isError || !data) {
      throw new Error(error?.message || "Failed to fetch portfolio data");
    }

    const projects = data.projects;
    const experience = data.experience;

    return { data, projects, experience };
  } catch (err) {
    const error = err as Error;

    throw new Error(error.message);
  }
};

export async function generateMetadata(): Promise<Metadata> {
  const { data } = await fetchPortfolio();

  return {
    metadataBase: new URL("https://kennethbass.com"),
    title: data.title,
    description: data.description,
    icons: {
      icon: [{ url: `${BASE_URL}/favicon?width=64&height=64&quality=100` }],
    },
    openGraph: {
      title: data.title,
      description: data.description,
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
      title: data.title,
      description: data.description,
      images: [`${BASE_URL}/favicon?width=256&height=256&quality=60`],
    },
  };
}

export default async function Home() {
  const { data, projects, experience } = await fetchPortfolio();

  return (
    <main className="relative flex min-h-screen w-full flex-col gap-16 overflow-hidden px-4">
      <section className="mx-auto w-full max-w-5xl overflow-hidden pt-12">
        <Header
          title={data.title}
          description={data.description}
          socials={data.socials}
        />
      </section>
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="pb-4 text-xl font-semibold">Experience</h2>
        <Experience experience={experience} />
      </section>
      <section className="mx-auto w-full max-w-5xl">
        <h2 className="pb-4 text-xl font-semibold">Projects</h2>
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </section>
      <footer className="py-12">
        <div className="mx-auto flex max-w-5xl flex-col items-center">
          <p className="font-bold">
            Made by the most rootin tootin cowboy in Oklahoma
          </p>
          <Links links={data.socials} />
        </div>
      </footer>
    </main>
  );
}
