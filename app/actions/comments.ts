"use server";

import { headers } from "next/headers";
import { hashIp, RATE_LIMIT, validateComment, type ValidationError } from "@/lib/comments/rules";
import { commentsSecret, getStore } from "@/lib/comments/server";
import type { SubmitState } from "@/lib/comments/submit-state";

const messages: Record<Exclude<ValidationError, "honeypot">, string> = {
  "too-short": "Сэтгэгдэл хэт богино байна.",
  "too-long": "Сэтгэгдэл 500 тэмдэгтээс хэтрэхгүй.",
  "name-too-long": "Нэр 40 тэмдэгтээс хэтрэхгүй.",
};

export async function submitComment(_prev: SubmitState, form: FormData): Promise<SubmitState> {
  const store = getStore();
  if (!store) return { status: "closed" };

  const field = (key: string) => {
    const value = form.get(key);
    return typeof value === "string" ? value : "";
  };
  const values = { name: field("name"), body: field("body") };
  const fail = (message: string): SubmitState => ({ status: "error", message, values });

  const result = validateComment({ ...values, website: form.get("website") });
  // Bots get the same answer as people, so they learn nothing.
  if (!result.ok) {
    if (result.error === "honeypot") return { status: "sent" };
    return fail(messages[result.error]);
  }

  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const ipHash = hashIp(ip, commentsSecret());

  try {
    const since = new Date(Date.now() - RATE_LIMIT.windowMinutes * 60 * 1000).toISOString();
    if ((await store.countRecent(ipHash, since)) >= RATE_LIMIT.max)
      return fail("Түр хүлээгээд дахин оролдоорой.");
    // New comments wait for approval, so nothing public changes yet.
    await store.insert({ name: result.name, body: result.body, ipHash });
  } catch (error) {
    console.error("submitComment failed", error);
    return fail("Илгээж чадсангүй. Дахин оролдоорой.");
  }
  return { status: "sent" };
}
