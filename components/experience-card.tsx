import { Tags } from "@/components/tags";
import { Experience } from "@/types/types";
import { LucideExternalLink } from "lucide-react";

export function ExperienceCard({ experience }: { experience: Experience }) {
  return (
    <li className="experience-item">
      <header>
        <time
          dateTime={experience.start_date.toString()}
          className="flex flex-row gap-2"
        >
          <span>
            {new Date(experience.start_date).toLocaleDateString(undefined, {
              month: "long",
              year: "numeric",
            })}
          </span>
          <span aria-hidden="true">-</span>
          {experience.end_date ? (
            <span>
              <time dateTime={experience.end_date.toString()}>
                {new Date(experience.end_date).toLocaleDateString(undefined, {
                  month: "long",
                  year: "numeric",
                })}
              </time>
            </span>
          ) : (
            <span>Present</span>
          )}
        </time>
        <h3 className="my-0.5 text-3xl font-bold">{experience.title}</h3>
        <div className="organization flex flex-row items-center gap-2">
          <span>{experience.company}</span>
          {experience.website && (
            <a
              target="_blank"
              href={experience.website.toString()}
              className="company-link rounded-xl p-2 hover:bg-slate-600/20 hover:dark:bg-slate-200/20"
              rel="noopener noreferrer"
              aria-label={`Visit ${experience.company} website`}
            >
              <LucideExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>
      </header>
      <section className="experience-details">
        <Tags tags={experience.skills} />
        {experience.description && (
          <p className="experience-description max-w-2xl">
            {experience.description}
          </p>
        )}
      </section>
    </li>
  );
}
