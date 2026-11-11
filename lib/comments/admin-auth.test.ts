import { describe, expect, it } from "vitest";
import { checkPassword, SESSION_MS, signSession, verifySession } from "./admin-auth";

const SECRET = "secret";
const NOW = Date.UTC(2026, 10, 7);

describe("admin session", () => {
  it("lasts 7 days", () => {
    expect(SESSION_MS).toBe(7 * 24 * 60 * 60 * 1000);
  });

  it("verifies a fresh session", () => {
    expect(verifySession(signSession(NOW, SECRET), NOW + 1000, SECRET)).toBe(true);
  });

  it("rejects a tampered signature", () => {
    const value = signSession(NOW, SECRET);
    const last = value.at(-1) === "0" ? "1" : "0";
    expect(verifySession(value.slice(0, -1) + last, NOW, SECRET)).toBe(false);
  });

  it("rejects a moved timestamp and a different secret", () => {
    const [, sig] = signSession(NOW, SECRET).split(".");
    expect(verifySession(`${NOW + 1}.${sig}`, NOW, SECRET)).toBe(false);
    expect(verifySession(signSession(NOW, "other"), NOW, SECRET)).toBe(false);
  });

  it("expires after 7 days", () => {
    const value = signSession(NOW, SECRET);
    expect(verifySession(value, NOW + SESSION_MS, SECRET)).toBe(true);
    expect(verifySession(value, NOW + SESSION_MS + 1, SECRET)).toBe(false);
  });

  it("rejects missing or malformed cookies and an empty secret", () => {
    expect(verifySession(undefined, NOW, SECRET)).toBe(false);
    expect(verifySession("garbage", NOW, SECRET)).toBe(false);
    expect(verifySession(signSession(NOW, ""), NOW, "")).toBe(false);
  });
});

describe("checkPassword", () => {
  it("compares safely", () => {
    expect(checkPassword("a", "a")).toBe(true);
    expect(checkPassword("a", "b")).toBe(false);
    expect(checkPassword("a", "abc")).toBe(false);
    expect(checkPassword("", "")).toBe(false);
  });
});
