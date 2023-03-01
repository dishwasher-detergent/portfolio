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

  sessionNames.forEach((session: string) => {
    let hash = c.get(session ? session : "");
    if (hash) api.setSession(hash);
  });

  let account: any;
  try {
    account = await api.getAccount();
  } catch (err) {
    console.error(err);
  }

  return account;
}

export default async function Admin() {
  const test = await checkLoggedInStatus();

  return (
    <>
      {JSON.stringify(test)}
      {/* <div className="h-full">
        <CreateProject />
      </div>
      <ListProjects /> */}
    </>
  );
}
