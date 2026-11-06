import { beforeEach, describe, expect, it, vi } from "vitest";
import { ADMIN_COOKIE, signSession } from "@/lib/comments/admin-auth";
import { approveComment, deleteComment, login, logout, unpublishComment } from "./actions";

const store = { approve: vi.fn(), unpublish: vi.fn(), remove: vi.fn() };
const jar = new Map<string, string>();
const setCookie = vi.fn((name: string, value: string) => jar.set(name, value));
const updateTag = vi.fn();

vi.mock("@/lib/comments/server", () => ({ getStore: () => store, commentsSecret: () => "s" }));
vi.mock("next/cache", () => ({ updateTag: (tag: string) => updateTag(tag) }));
vi.mock("next/headers", () => ({
  cookies: async () => ({
    get: (name: string) => (jar.has(name) ? { name, value: jar.get(name) } : undefined),
    set: setCookie,
    delete: (opt: string | { name: string }) => jar.delete(typeof opt === "string" ? opt : opt.name),
  }),
}));

beforeEach(() => {
  jar.clear();
  vi.clearAllMocks();
  process.env.ADMIN_PASSWORD = "pw";
});

const form = (password: string) => {
  const data = new FormData();
  data.set("password", password);
  return data;
};

describe("admin actions", () => {
  it("refuses to change comments without a valid session", async () => {
    jar.set(ADMIN_COOKIE, "123.bad");
    await expect(approveComment("c1")).rejects.toThrow();
    await expect(unpublishComment("c1")).rejects.toThrow();
    await expect(deleteComment("c1")).rejects.toThrow();
    expect(store.approve).not.toHaveBeenCalled();
    expect(store.remove).not.toHaveBeenCalled();
    expect(updateTag).not.toHaveBeenCalled();
  });

  it("changes comments and refreshes the public list with a valid session", async () => {
    jar.set(ADMIN_COOKIE, signSession(Date.now(), "s"));
    await approveComment("c1");
    await unpublishComment("c2");
    await deleteComment("c3");
    expect(store.approve).toHaveBeenCalledWith("c1");
    expect(store.unpublish).toHaveBeenCalledWith("c2");
    expect(store.remove).toHaveBeenCalledWith("c3");
    expect(updateTag).toHaveBeenCalledTimes(3);
    expect(updateTag).toHaveBeenCalledWith("comments");
  });

  it("logs in with the right password and sets a locked-down cookie", async () => {
    expect(await login({ error: false }, form("pw"))).toEqual({ error: false });
    const [name, , options] = setCookie.mock.calls[0] as unknown as [string, string, object];
    expect(name).toBe(ADMIN_COOKIE);
    expect(options).toMatchObject({ httpOnly: true, sameSite: "lax", path: "/admin" });
  });

  it("rejects a wrong password, and any password when none is set", async () => {
    expect(await login({ error: false }, form("nope"))).toEqual({ error: true });
    delete process.env.ADMIN_PASSWORD;
    expect(await login({ error: false }, form(""))).toEqual({ error: true });
    expect(setCookie).not.toHaveBeenCalled();
  });

  it("logs out", async () => {
    jar.set(ADMIN_COOKIE, "x");
    await logout();
    expect(jar.has(ADMIN_COOKIE)).toBe(false);
  });
});
