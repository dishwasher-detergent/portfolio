import CreateProject from "#/ui/layout/Admin/CreateProject";
import CheckLoginStatus from "#/ui/layout/Admin/Login";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin",
  description: "Add a new project.",
};

export default function Admin() {
  return (
    <CheckLoginStatus>
      <div className="h-full">
        <CreateProject />
      </div>
      <ListProjects />
    </CheckLoginStatus>
  );
}
