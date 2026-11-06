import "server-only";
import { createStore, type CommentStore } from "./store";

/** Comments work only when Supabase and the hashing secret are configured. */
export function commentsConfigured(): boolean {
  return Boolean(
    process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY && process.env.COMMENTS_SECRET,
  );
}

export function commentsSecret(): string {
  return process.env.COMMENTS_SECRET ?? "";
}

export function getStore(): CommentStore | null {
  if (!commentsConfigured()) return null;
  return createStore({
    url: process.env.SUPABASE_URL!,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY!,
  });
}
