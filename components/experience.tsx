import { Experience as ExperienceType } from "@kurioh/client/interfaces";

import { ExperienceCard } from "@/components/experience-card";

export function Experience({ experience }: { experience: ExperienceType[] }) {
  return (
    <ul className="space-y-8">
      {experience
        .sort(
          (a, b) =>
            new Date(b.startDate).getTime() - new Date(a.startDate).getTime(),
        )
        .map((experience, index) => (
          <ExperienceCard key={index} experience={experience} />
        ))}
    </ul>
  );
}
