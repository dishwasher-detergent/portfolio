import {
  LucideCodepen,
  LucideExternalLink,
  LucideGitBranch,
  LucideGithub,
  LucideLinkedin,
  LucideTwitter,
} from "lucide-react";

export function extractWebsiteName(url: string): string {
  try {
    const urlObj = new URL(url);
    const parts = urlObj.hostname.split(".");
    return parts[parts.length - 2];
  } catch (e) {
    console.error(e);
    return "";
  }
}

export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

export function renderSiteIcon(param: string) {
  switch (param) {
    case "github":
      return LucideGithub;
    case "linkedin":
      return LucideLinkedin;
    case "codepen":
      return LucideCodepen;
    case "twitter":
      return LucideTwitter;
    case "bitbucket":
    case "gitlab":
      return LucideGitBranch;
    default:
      return LucideExternalLink;
  }
}
