import "server-only";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, verifySession } from "./admin-auth";
import { commentsSecret } from "./server";

export type LoginState = { error: boolean };

export async function isAdmin(): Promise<boolean> {
  const value = (await cookies()).get(ADMIN_COOKIE)?.value;
  return verifySession(value, Date.now(), commentsSecret());
}
