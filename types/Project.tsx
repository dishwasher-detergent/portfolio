import { Models } from "appwrite";

export type ProjectTypes = {
  title: string;
  description: string;
  images: string[];
  tags: string[];
  banner: string;
  short_description: string;
  github: string;
  website: string;
  showcase: boolean;
  accent_color: string;
};

export interface ProjectProps {
  content: ProjectTypes & Models.Document;
}
