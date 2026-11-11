import { cacheLife, cacheTag } from "next/cache";
import type { Comment } from "./rules";
import { getStore } from "./server";
import { COMMENTS_TAG } from "./tags";

export const PUBLIC_COMMENT_LIMIT = 12;

/** Approved comments for the home page. Admin actions expire the `comments` tag. */
export async function getApprovedComments(): Promise<Comment[]> {
  "use cache";
  cacheTag(COMMENTS_TAG);
  cacheLife("hours");
  const store = getStore();
  if (!store) return [];
  try {
    return await store.listApproved(PUBLIC_COMMENT_LIMIT);
  } catch (error) {
    console.error("getApprovedComments failed", error);
    return [];
  }
}
