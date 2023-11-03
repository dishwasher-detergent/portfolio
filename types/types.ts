import { Models } from "appwrite";

export type ProjectType = {
  title: string;
  description: string;
  short_description: string;
  images: string[];
  website: string;
  github: string;
  tags: string[];
} & Models.Document;
