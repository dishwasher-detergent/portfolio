import { extractWebsiteName, isValidUrl, renderSiteIcon } from "@/lib/utils";

interface LinksProps {
  links: string[];
  orientation?: "row" | "col";
}

export const Links = ({ links, orientation = "row" }: LinksProps) => {
  return (
    links &&
    links.length > 0 && (
      <div
        className={`flex ${orientation === "col" ? "flex-col" : "flex-row flex-wrap"}`}
      >
        {links.map((link, index) => {
          if (!isValidUrl(link)) return null;

          const Icon = renderSiteIcon(extractWebsiteName(link.toLowerCase()));

          return (
            <a
              key={index}
              target="_blank"
              href={link}
              className="rounded-xl p-2 hover:bg-slate-600/20 hover:dark:bg-slate-200/20"
            >
              {<Icon className="h-5 w-5" />}
            </a>
          );
        })}
      </div>
    )
  );
};
