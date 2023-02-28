import { ProjectTypes } from "#/types/Project";
import Header from "#/ui/layout/Header/Header";
import ProjectDisplay from "#/ui/project/Project";
import api from "#/utils/appwrite";
import { textColor } from "#/utils/color";
import { Server } from "#/utils/config";
import { Models } from "appwrite";
import { ExternalLink, Github } from "lucide-react";
import { Metadata } from "next";

type Projects = ProjectTypes & Models.Document;

interface PageProps {
  params: {
    Project: string;
  };
}

async function getProject(Project: string) {
  const pattern = /^[a-zA-Z0-9][a-zA-Z0-9_]{0,35}$/;

  if (pattern.test(Project) && Project.length <= 36) {
    const document = await api.getDocument(Project, Server.collectionID);

    return document as Projects;
  }

  return null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const product = await getProject(params.Project);

  if (product)
    return {
      title: `Project - ${product.title}`,
      openGraph: {
        type: "website",
        url: product.website,
        title: `Project - ${product.title}`,
        description: product.short_description,
        siteName: product.title,
        images: [
          {
            url: api.getFilePreview(product.banner, {
              height: "320",
              quality: "100",
              gravity: "center",
            }).href,
          },
        ],
      },
    };

  return { title: params.Project };
}

export default async function Project({ params }: PageProps) {
  const project: Projects | null = await getProject(params.Project);

  if (!project) {
    return (
      <h2 className="text-6xl font-bold text-rose-600">
        Error Loading Project: {params.Project}
      </h2>
    );
  }

  return (
    <>
      <div className="sticky top-0">
        <Header>{project.title}</Header>
        <div className="relative z-10 flex w-full flex-col gap-2 pb-4 md:-mt-12">
          <div className="flex w-full flex-row gap-1 overflow-x-auto pb-2">
            {project.tags.map((tag: string) => (
              <span
                key={tag}
                className="relative whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold"
                {...textColor(project.accent_color, true)}
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="w-full dark:text-white md:w-1/2">
            {project.description}
          </p>
          <nav className="flex w-full flex-row flex-wrap gap-2">
            <a
              href={project.website}
              target="_blank"
              rel="noreferrer"
              className={`block cursor-pointer rounded-xl p-2 hover:bg-slate-200 hover:dark:bg-slate-800`}
            >
              <ExternalLink size={20} />
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer rounded-xl bg-slate-200 p-3 hover:bg-slate-300"
              >
                <Github size={20} />
              </a>
            )}
          </nav>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {project.images.map((image) => (
          <ProjectDisplay
            key={image}
            image={image}
            title={project.title}
            accent_color={project.accent_color}
          />
        ))}
      </div>
    </>
  );
}
