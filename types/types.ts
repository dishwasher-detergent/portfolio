export interface Project {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  images: string[];
  tags: string[];
  links: string[];
}

export interface Organization {
  id: string;
  name: string;
  title: string;
  description: string;
  images: string[];
  socials: string[];
  projects: Project[];
  experience: Experience[];
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  skills: string[];
  startDate: Date;
  endDate: Date;
  company: string;
  website: string;
}
