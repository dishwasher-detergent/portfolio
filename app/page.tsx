import { ExperienceTypes } from "#/types/Experience";
import { ProjectTypes } from "#/types/Project";
import { ChildWrapper } from "#/ui/animate/ChildWrapper";
import Contact from "#/ui/contact/Contact";
import Experience from "#/ui/experience/Experience";
import ExperienceWrapper from "#/ui/experience/Wrapper";
import Header from "#/ui/layout/header/Header";
import Layout from "#/ui/layout/Layout";
import Project from "#/ui/project/Project";
import ProjectWrapper from "#/ui/project/Wrapper";
import api from "#/utils/appwrite";
import { Models, Query } from "appwrite";

type Projects = ProjectTypes & Models.Document;
type Experiences = ExperienceTypes & Models.Document;

async function getProjects(): Promise<Projects[]> {
  const documents = await api.listDocuments("63e17a3b092917cea721",[
    Query.orderDesc("$createdAt"),
  ]);

  const projects = documents.documents as Projects[];

  return projects;
}

async function getExperience(): Promise<Experiences[]> {
  const documents = await api.listDocuments("640133e70053b55f3fed", [
    Query.orderDesc("start_date"),
  ]);

  const projects = documents.documents as Experiences[];

  return projects;
}

export default async function Home() {
  const projects: Projects[] = await getProjects();
  const experience: Experiences[] = await getExperience();

  return (
    <ChildWrapper>
      <Layout>
        <div className="py-0 md:pb-12">
          <Header>Kenneth</Header>
        </div>
        <div className="py-4 md:py-12">
          <Header width="75%">Experience</Header>
          <ExperienceWrapper>
            {experience.map((item, index) => (
              <Experience content={item} key={index} />
            ))}
          </ExperienceWrapper>
        </div>
        <div className="py-4 md:py-12">
          <Header width="75%">Projects</Header>
          <ProjectWrapper>
            {projects.map((item) => {
              return <Project key={item.$id} content={item} />;
            })}
          </ProjectWrapper>
        </div>
        <div className="py-4 md:py-12">
          <Header width="75%">Contact</Header>
          <Contact />
        </div>
      </Layout>
    </ChildWrapper>
  );
}

export const revalidate = 60;
