import { Models } from "appwrite";

export type ExperienceTypes = {
  title: string;
  employer: string;
  start_date: Date;
  end_date?: Date;
  current: boolean;
};

export interface ExperienceProps {
  content: ExperienceTypes & Models.Document;
}
