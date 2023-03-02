// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Server } from "#/utils/config";
import { cookies } from "next/headers";
import api from "#/utils/appwrite";

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

  return account;
}

// This function can be marked `async` if using `await` inside
export async function middleware(
  request: NextRequest,
  response: NextResponse,
  next: any
) {
  const account = await checkLoggedInStatus();
  //@ts-ignore
  if (account.code)
    return NextResponse.redirect(new URL("/Login", request.url));
  next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/about/:path*",
};
