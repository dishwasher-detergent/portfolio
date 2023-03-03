import CreateProject from "#/ui/admin/project/Create";
import ListProjects from "#/ui/admin/project/Wrapper";
import { checkLoggedInStatus } from "#/utils/auth";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "Add a new project.",
};

export default async function Admin() {
  // const auth = await checkLoggedInStatus();

  // if (!auth) {
  //   redirect("/Login");
  // }

  return (
    <>
      <CreateProject />
      <ListProjects />
    </>
  );
}
