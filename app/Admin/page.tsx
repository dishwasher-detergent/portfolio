import CreateProject from "#/ui/layout/Admin/CreateProject";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import api, { APPWRITE_PROJECT_ID } from "#/utils/appwrite";
import { Server } from "#/utils/config";
import type { Metadata } from "next";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { toast } from "react-toastify";

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

  let hash = c.get(sessionNames[0]) ?? c.get(sessionNames[1]) ?? "";

  //@ts-ignore
  api.setSession(hash.value);

  let account: any;
  try {
    account = await api.getAccount();
  } catch (err) {
    account = err;
  }

  if (account.code == 401) {
    redirect("/Login");
  }
}

export default async function Admin() {
  await checkLoggedInStatus();

  return (
    <>
      <div className="h-full">
        <CreateProject />
      </div>
      <ListProjects />
    </>
  );
}
