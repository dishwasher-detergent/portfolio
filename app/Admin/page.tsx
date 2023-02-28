import CreateProject from "#/ui/layout/Admin/CreateProject";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import api from "#/utils/appwrite";
import { Server } from "#/utils/config";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Admin",
  description: "Add a new project.",
};

async function checkLoggedInStatus() {
  const sessionNames = [
    "a_session_" + Server.project.toLowerCase(),
    "a_session_" + Server.project.toLowerCase() + "_legacy",
  ];

  const c = cookies();

  console.log(c.get("a_session_63e17a1b54d5f6eec8ea"));
  console.log(c.getAll());

  // let hash = c.get(sessionNames[0]) ? c.get(sessionNames[0]) : "";

  // api.setSession(hash);

  // let account: any;
  // try {
  //   account = await api.getAccount();
  // } catch (err) {
  //   console.error(err);
  // }

  // console.log("test");
  // console.log(account);

  // if (!account) redirect("/Login");
}

export default async function Admin() {
  const serverAccount = await checkLoggedInStatus();

  return (
    <>
      <div className="h-full">
        <CreateProject />
      </div>
      <ListProjects />
    </>
  );
}
