import CreateProject from "#/ui/layout/Admin/CreateProject";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import { checkLoggedInStatus } from "#/utils/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "Add a new project.",
};

export default async function Admin() {
  const auth = await checkLoggedInStatus();

  if (!auth) {
    redirect("/login");
  }

  return (
    <>
      {JSON.stringify(auth)}
      {/* <div className="h-full">
        <CreateProject />
      </div>
      <ListProjects /> */}
    </>
  );
}
