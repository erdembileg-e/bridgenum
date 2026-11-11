import { describe, expect, it } from "vitest";
import { displayName, hashIp, RATE_LIMIT, validateComment } from "./rules";

const valid = (body: unknown, name: unknown = "", website: unknown = "") =>
  validateComment({ name, body, website });

describe("validateComment", () => {
  it("rejects messages shorter than 3 characters after trimming", () => {
    expect(valid("  hi  ")).toEqual({ ok: false, error: "too-short" });
    expect(valid(null)).toEqual({ ok: false, error: "too-short" });
  });

  it("accepts 3 characters and trims", () => {
    expect(valid("  сай  ")).toEqual({ ok: true, name: null, body: "сай" });
  });

  it("counts visible characters, so 500 Cyrillic letters or emoji fit", () => {
    expect(valid("ө".repeat(500)).ok).toBe(true);
    expect(valid("😀".repeat(500)).ok).toBe(true);
    expect(valid("ө".repeat(501))).toEqual({ ok: false, error: "too-long" });
  });

  it("limits names to 40 characters and turns blank names into null", () => {
    expect(valid("Сайхан сайт", "б".repeat(41))).toEqual({ ok: false, error: "name-too-long" });
    expect(valid("Сайхан сайт", "  Сараа ")).toEqual({
      ok: true,
      name: "Сараа",
      body: "Сайхан сайт",
    });
    expect(valid("Сайхан сайт", "   ")).toMatchObject({ ok: true, name: null });
  });

  it("flags the honeypot field", () => {
    expect(valid("Сайхан сайт", "", "http://spam")).toEqual({ ok: false, error: "honeypot" });
  });
});

describe("displayName", () => {
  it("shows «Зочин» when there is no name", () => {
    expect(displayName(null)).toBe("Зочин");
    expect(displayName("  ")).toBe("Зочин");
    expect(displayName("Бат")).toBe("Бат");
  });
});

describe("hashIp", () => {
  it("treats a missing IP as «unknown» and depends on the secret", () => {
    expect(hashIp(null, "s")).toBe(hashIp("unknown", "s"));
    expect(hashIp("1.2.3.4", "s")).not.toBe(hashIp("1.2.3.4", "t"));
    expect(hashIp("1.2.3.4", "s")).toMatch(/^[0-9a-f]{64}$/);
  });
});

describe("RATE_LIMIT", () => {
  it("allows 3 comments per 10 minutes", () => {
    expect(RATE_LIMIT).toEqual({ max: 3, windowMinutes: 10 });
  });
});
