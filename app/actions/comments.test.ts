import { beforeEach, describe, expect, it, vi } from "vitest";
import { hashIp } from "@/lib/comments/rules";
import { submitComment } from "./comments";

const store = { insert: vi.fn(), countRecent: vi.fn() };
let configured = true;
let forwardedFor: string | null = "1.2.3.4, 10.0.0.1";

vi.mock("@/lib/comments/server", () => ({
  getStore: () => (configured ? store : null),
  commentsSecret: () => "secret",
}));
vi.mock("next/headers", () => ({
  headers: async () => new Headers(forwardedFor ? { "x-forwarded-for": forwardedFor } : {}),
}));

function form(fields: Record<string, string>) {
  const data = new FormData();
  for (const [k, v] of Object.entries(fields)) data.set(k, v);
  return data;
}

const idle = { status: "idle" } as const;

beforeEach(() => {
  configured = true;
  forwardedFor = "1.2.3.4, 10.0.0.1";
  store.insert.mockReset().mockResolvedValue(undefined);
  store.countRecent.mockReset().mockResolvedValue(0);
});

describe("submitComment", () => {
  it("is closed when Supabase is not configured", async () => {
    configured = false;
    expect(await submitComment(idle, form({ body: "Сайхан" }))).toEqual({ status: "closed" });
  });

  it("pretends success for bots that fill the honeypot", async () => {
    const result = await submitComment(idle, form({ body: "Сайхан", website: "x" }));
    expect(result).toEqual({ status: "sent" });
    expect(store.insert).not.toHaveBeenCalled();
  });

  it("explains invalid input", async () => {
    expect(await submitComment(idle, form({ body: "a" }))).toEqual({
      status: "error",
      message: "Сэтгэгдэл хэт богино байна.",
    });
    expect(await submitComment(idle, form({ body: "a".repeat(501) }))).toEqual({
      status: "error",
      message: "Сэтгэгдэл 500 тэмдэгтээс хэтрэхгүй.",
    });
    expect(await submitComment(idle, form({ body: "Сайхан", name: "н".repeat(41) }))).toEqual({
      status: "error",
      message: "Нэр 40 тэмдэгтээс хэтрэхгүй.",
    });
  });

  it("asks to wait after 3 comments in 10 minutes", async () => {
    store.countRecent.mockResolvedValue(3);
    expect(await submitComment(idle, form({ body: "Сайхан" }))).toEqual({
      status: "error",
      message: "Түр хүлээгээд дахин оролдоорой.",
    });
    expect(store.insert).not.toHaveBeenCalled();
    const since = new Date(store.countRecent.mock.calls[0][1]).getTime();
    expect(Date.now() - since).toBeGreaterThanOrEqual(10 * 60 * 1000 - 1000);
  });

  it("saves the comment with the hashed first forwarded IP", async () => {
    const result = await submitComment(idle, form({ body: " Сайхан ", name: "Бат" }));
    expect(result).toEqual({ status: "sent" });
    expect(store.insert).toHaveBeenCalledWith({
      name: "Бат",
      body: "Сайхан",
      ipHash: hashIp("1.2.3.4", "secret"),
    });
  });

  it("uses «unknown» when there is no forwarded IP", async () => {
    forwardedFor = null;
    await submitComment(idle, form({ body: "Сайхан" }));
    expect(store.insert.mock.calls[0][0].ipHash).toBe(hashIp(null, "secret"));
  });

  it("reports a friendly error when saving fails", async () => {
    store.insert.mockRejectedValue(new Error("down"));
    expect(await submitComment(idle, form({ body: "Сайхан" }))).toEqual({
      status: "error",
      message: "Илгээж чадсангүй. Дахин оролдоорой.",
    });
  });
});
