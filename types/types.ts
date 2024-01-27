export interface Projects {
  title: string;
  slug: string;
  short_description: string;
  description: string;
  images: string[];
  position: number;
  tags: string[];
  color: string;
  links: string[];
}

export interface Information {
  title: string;
  description: string;
  icon: string;
  social: {
    url: string;
    value: string;
  }[];
}

export interface Portfolios {
  title: string;
  slug: string;
  information: Information;
  projects: Projects[];
}

export interface Experience {
  company: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  website: string;
  languages: string[];
}
