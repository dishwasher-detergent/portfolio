import CreateProject from "#/ui/layout/Admin/CreateProject";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import { checkLoggedInStatus } from "#/utils/auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Add a new project.",
};

export default async function Admin() {
  const auth = await checkLoggedInStatus();

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
