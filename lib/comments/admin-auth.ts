import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE = "msl_admin";
export const SESSION_MS = 7 * 24 * 60 * 60 * 1000;
/** A long password is what keeps guessing impractical; shorter ones disable the admin page. */
export const ADMIN_PASSWORD_MIN = 12;
/** Each wrong guess costs a second, so guessing a 12+ character password is impractical. */
export const LOGIN_FAIL_DELAY_MS = 1000;

export function adminPasswordReady(password: string | undefined): password is string {
  return typeof password === "string" && password.length >= ADMIN_PASSWORD_MIN;
}

function sign(issuedMs: number, secret: string): string {
  return createHmac("sha256", secret).update(`admin:${issuedMs}`).digest("hex");
}

function sameText(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Cookie value "<issuedMs>.<hmac>". */
export function signSession(nowMs: number, secret: string): string {
  return `${nowMs}.${sign(nowMs, secret)}`;
}

export function verifySession(value: string | undefined, nowMs: number, secret: string): boolean {
  if (!value || !secret) return false;
  const [issuedText, sig, ...rest] = value.split(".");
  if (rest.length > 0 || !/^\d+$/.test(issuedText ?? "") || !sig) return false;
  const issued = Number(issuedText);
  if (issued > nowMs || nowMs - issued > SESSION_MS) return false;
  return sameText(sig, sign(issued, secret));
}

/** An unset password never matches, so a missing env var cannot open the admin page. */
export function checkPassword(input: string, expected: string): boolean {
  if (!expected) return false;
  return sameText(input, expected);
}
