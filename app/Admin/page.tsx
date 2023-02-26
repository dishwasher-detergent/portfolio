import CreateProject from "#/ui/layout/Admin/CreateProject";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import api from "#/utils/appwrite";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "Add a new project.",
};

async function getLoggedStatus() {
  const logged = await api.checkSessionStatus();

  return logged;
}

export default async function Admin() {
  const logged = await getLoggedStatus();

  if (!logged) redirect("/Login");

  return (
    <>
      <div className="h-full">
        <CreateProject />
      </div>
      <ListProjects />
    </>
  );
}
