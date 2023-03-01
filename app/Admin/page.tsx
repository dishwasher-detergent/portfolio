import CreateProject from "#/ui/layout/Admin/CreateProject";
import ListProjects from "#/ui/layout/Admin/Project/ListProjects";
import { AppwriteService, APPWRITE_PROJECT_ID } from "#/utils/appwrite";
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
    "a_session_" + APPWRITE_PROJECT_ID.toLowerCase(),
    "a_session_" + APPWRITE_PROJECT_ID.toLowerCase() + "_legacy",
  ];

  const c = cookies();

  let hash = c.get(sessionNames[0]) ?? c.get(sessionNames[1]) ?? "";

  //@ts-ignore
  AppwriteService.setSession(hash.value);

  let account: any;
  try {
    account = await AppwriteService.getAccount();
  } catch (err) {
    account = err;
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
