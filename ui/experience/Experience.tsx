import { ExperienceProps } from "#/types/Experience";

export default function Experience({ content }: ExperienceProps) {
  return (
    <div className="group relative flex h-56 flex-row pl-8 md:pl-16">
      <div className="absolute left-0 top-0 h-full w-8 border-l-2 border-slate-300 group-last:hidden dark:border-slate-700 md:w-16" />
      <div className="absolute top-0 left-0 h-28 w-8 rounded-bl-full border-l-2 border-b-2 border-slate-300 dark:border-slate-700 md:w-16" />
      <article className="flex h-full flex-col justify-center rounded-xl p-4">
        <p className="font-semibold text-slate-600 dark:text-slate-100">
          {content.employer}
        </p>
        <h2 className="display w-full py-4 text-4xl font-bold text-slate-900 dark:text-white md:text-7xl">
          {content.title}
        </h2>
        <p className="text-slate-900 dark:text-white">
          <>
            {new Date(content.start_date).toLocaleDateString("en-us", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}{" "}
            -{" "}
            {content.end_date
              ? new Date(content.end_date).toLocaleDateString("en-us", {
                  weekday: "long",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "Current"}
          </>
        </p>
      </article>
    </div>
  );
}
