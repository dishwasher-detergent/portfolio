export interface Projects {
  id: string;
  title: string;
  short_description: string;
  description: string;
  image_ids: string[];
  tags: string[];
  links: string[];
  slug: string;
  organization_id: string;
}

export interface Information {
  id: string;
  title: string;
  description: string;
  image_id: string;
  socials: string[];
  organization_id: string;
  createdBy: string;
}

export interface Organizations {
  id: string;
  title: string;
  slug: string;
  information_id: string;
  project_ids: string[];
  experience_id: string | null;
  createdBy: string;
}

export interface Experience {
  id: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: Date;
  company: string;
  website: URL;
  skills: string[];
  createdBy: string;
  organization_id: string;
}
