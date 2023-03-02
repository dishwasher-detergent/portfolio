import { Server } from "#/utils/config";
import { cookies } from "next/headers";
import api from "#/utils/appwrite";
import { redirect } from "next/navigation";

export async function checkLoggedInStatus() {
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
    console.error(err);
  }

  console.log(account);

  if (account) return account;

  redirect("/Login");
}
