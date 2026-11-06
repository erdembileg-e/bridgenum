"use server";

import { updateTag } from "next/cache";
import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkPassword, SESSION_MS, signSession } from "@/lib/comments/admin-auth";
import { isAdmin, type LoginState } from "@/lib/comments/admin-session";
import { COMMENTS_TAG } from "@/lib/comments/tags";
import { commentsSecret, getStore } from "@/lib/comments/server";

export async function login(_prev: LoginState, form: FormData): Promise<LoginState> {
  const password = form.get("password");
  const secret = commentsSecret();
  if (
    !secret ||
    typeof password !== "string" ||
    !checkPassword(password, process.env.ADMIN_PASSWORD ?? "")
  )
    return { error: true };
  (await cookies()).set(ADMIN_COOKIE, signSession(Date.now(), secret), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MS / 1000,
  });
  return { error: false };
}

export async function logout(): Promise<void> {
  (await cookies()).delete({ name: ADMIN_COOKIE, path: "/admin" });
}

/** Every change re-checks the session; the page check alone is not enough. */
async function changeComment(run: (store: NonNullable<ReturnType<typeof getStore>>) => Promise<void>) {
  if (!(await isAdmin())) throw new Error("Not signed in");
  const store = getStore();
  if (!store) throw new Error("Comments are not configured");
  await run(store);
  updateTag(COMMENTS_TAG);
}

export async function approveComment(id: string): Promise<void> {
  await changeComment((store) => store.approve(id));
}

export async function unpublishComment(id: string): Promise<void> {
  await changeComment((store) => store.unpublish(id));
}

export async function deleteComment(id: string): Promise<void> {
  await changeComment((store) => store.remove(id));
}
