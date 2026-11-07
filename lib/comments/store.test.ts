import { describe, expect, it, vi } from "vitest";
import { createStore } from "./store";

const URL_ = "https://abc.supabase.co";
const KEY = "service-key";

function fakeFetch(response: { status?: number; json?: unknown; headers?: Record<string, string> }) {
  return vi.fn<(url: string, init: RequestInit) => Promise<Response>>(async () =>
    new Response(response.json === undefined ? null : JSON.stringify(response.json), {
      status: response.status ?? 200,
      headers: response.headers,
    }),
  );
}

function call(f: ReturnType<typeof fakeFetch>) {
  const [url, init] = f.mock.calls[0];
  return { url, init, headers: new Headers(init.headers) };
}

describe("comment store", () => {
  it("inserts with the server key", async () => {
    const f = fakeFetch({ status: 201 });
    await createStore({ url: URL_, key: KEY, fetch: f }).insert({
      name: null,
      body: "Сайхан",
      ipHash: "h",
    });
    const { url, init, headers } = call(f);
    expect(url).toBe(`${URL_}/rest/v1/comments`);
    expect(init.method).toBe("POST");
    expect(headers.get("apikey")).toBe(KEY);
    expect(headers.get("authorization")).toBe(`Bearer ${KEY}`);
    expect(JSON.parse(init.body as string)).toEqual({ name: null, body: "Сайхан", ip_hash: "h" });
  });

  it("sends a new sb_secret_ key only as apikey, not as a Bearer token", async () => {
    const f = fakeFetch({ json: [] });
    await createStore({ url: URL_, key: "sb_secret_abc", fetch: f }).listPending();
    const { headers } = call(f);
    expect(headers.get("apikey")).toBe("sb_secret_abc");
    expect(headers.get("authorization")).toBeNull();
  });

  it("lists approved comments newest first and maps the columns", async () => {
    const f = fakeFetch({
      json: [
        { id: "1", name: "Бат", body: "Сайн", created_at: "c", approved_at: "a", ip_hash: "x" },
      ],
    });
    const list = await createStore({ url: URL_, key: KEY, fetch: f }).listApproved(12);
    const { url } = call(f);
    expect(url).toContain("approved_at=not.is.null");
    expect(url).toContain("order=approved_at.desc");
    expect(url).toContain("limit=12");
    expect(list).toEqual([{ id: "1", name: "Бат", body: "Сайн", createdAt: "c", approvedAt: "a" }]);
  });

  it("lists pending comments", async () => {
    const f = fakeFetch({ json: [] });
    await createStore({ url: URL_, key: KEY, fetch: f }).listPending();
    expect(call(f).url).toContain("approved_at=is.null");
  });

  it("counts recent comments from content-range", async () => {
    const f = fakeFetch({ json: [], headers: { "content-range": "0-1/2" } });
    const n = await createStore({ url: URL_, key: KEY, fetch: f }).countRecent(
      "h",
      "2026-11-07T00:00:00.000Z",
    );
    const { url, headers } = call(f);
    expect(n).toBe(2);
    expect(headers.get("prefer")).toBe("count=exact");
    expect(url).toContain("ip_hash=eq.h");
    expect(url).toContain(`created_at=gte.${encodeURIComponent("2026-11-07T00:00:00.000Z")}`);
  });

  it("approves, unpublishes and removes by id", async () => {
    const f = fakeFetch({ status: 204 });
    const store = createStore({ url: URL_, key: KEY, fetch: f });
    await store.approve("abc");
    await store.unpublish("abc");
    await store.remove("abc");
    const [approve, unpublish, remove] = f.mock.calls.map(([url, init]) => ({ url, init }));
    expect(approve.url).toBe(`${URL_}/rest/v1/comments?id=eq.abc`);
    expect(approve.init.method).toBe("PATCH");
    expect(JSON.parse(approve.init.body as string).approved_at).toEqual(expect.any(String));
    expect(JSON.parse(unpublish.init.body as string)).toEqual({ approved_at: null });
    expect(remove.init.method).toBe("DELETE");
  });

  it("throws on an error response", async () => {
    const f = fakeFetch({ status: 500, json: { message: "boom" } });
    await expect(createStore({ url: URL_, key: KEY, fetch: f }).listPending()).rejects.toThrow();
  });
});
