import { extractWebsiteName, isValidUrl, renderSiteIcon } from "@/lib/utils";

interface LinksProps {
  links: string[];
}

export const Links = ({ links }: LinksProps) => {
  return (
    links &&
    links.length > 0 && (
      <div className="flex flex-row flex-wrap gap-2">
        {links.map((link, index) => {
          if (!isValidUrl(link)) return null;

          const Icon = renderSiteIcon(extractWebsiteName(link.toLowerCase()));

          return (
            <a key={index} target="_blank" href={link}>
              {<Icon className="h-5 w-5" />}
            </a>
          );
        })}
      </div>
    )
  );
};
