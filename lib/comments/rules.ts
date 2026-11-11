import { createHmac } from "node:crypto";

export type Comment = {
  id: string;
  name: string | null;
  body: string;
  createdAt: string;
  approvedAt: string | null;
};

export type ValidationError = "honeypot" | "too-short" | "too-long" | "name-too-long";

export const NAME_MAX = 40;
export const BODY_MIN = 3;
export const BODY_MAX = 500;
export const RATE_LIMIT = { max: 3, windowMinutes: 10 } as const;

/** Length as people see it: one emoji or Cyrillic letter is one character. */
function visibleLength(text: string): number {
  return Array.from(text).length;
}

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function validateComment(input: {
  name: unknown;
  body: unknown;
  website: unknown;
}): { ok: true; name: string | null; body: string } | { ok: false; error: ValidationError } {
  if (text(input.website) !== "") return { ok: false, error: "honeypot" };
  const name = text(input.name);
  const body = text(input.body);
  if (visibleLength(body) < BODY_MIN) return { ok: false, error: "too-short" };
  if (visibleLength(body) > BODY_MAX) return { ok: false, error: "too-long" };
  if (visibleLength(name) > NAME_MAX) return { ok: false, error: "name-too-long" };
  return { ok: true, name: name === "" ? null : name, body };
}

export function displayName(name: string | null): string {
  return name?.trim() ? name.trim() : "Зочин";
}

/** Raw IPs are never stored; a keyed hash is enough to rate-limit. */
export function hashIp(ip: string | null, secret: string): string {
  return createHmac("sha256", secret)
    .update(ip ?? "unknown")
    .digest("hex");
}
