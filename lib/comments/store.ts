import type { Comment } from "./rules";

type Row = {
  id: string;
  name: string | null;
  body: string;
  created_at: string;
  approved_at: string | null;
};

const COLUMNS = "id,name,body,created_at,approved_at";

function toComment(row: Row): Comment {
  return {
    id: row.id,
    name: row.name,
    body: row.body,
    createdAt: row.created_at,
    approvedAt: row.approved_at,
  };
}

type Fetcher = (url: string, init: RequestInit) => Promise<Response>;

/** Talks to the Supabase `comments` table over its REST API. Server only: it uses the service key. */
export function createStore(cfg: { url: string; key: string; fetch?: Fetcher }) {
  const doFetch: Fetcher = cfg.fetch ?? fetch;
  const base = `${cfg.url.replace(/\/+$/, "")}/rest/v1/comments`;

  async function request(query: string, init: RequestInit = {}): Promise<Response> {
    const headers = new Headers(init.headers);
    headers.set("apikey", cfg.key);
    // Legacy service_role keys are JWTs and go in both headers. New sb_secret_ keys are not JWTs,
    // so Supabase wants them only in `apikey`.
    if (!cfg.key.startsWith("sb_")) headers.set("authorization", `Bearer ${cfg.key}`);
    if (init.body) headers.set("content-type", "application/json");
    const res = await doFetch(query ? `${base}?${query}` : base, {
      ...init,
      headers,
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Supabase ${init.method ?? "GET"} failed: ${res.status}`);
    return res;
  }

  async function list(query: string): Promise<Comment[]> {
    const rows = (await (await request(query)).json()) as Row[];
    return rows.map(toComment);
  }

  const byId = (id: string) => `id=eq.${encodeURIComponent(id)}`;

  return {
    async insert(c: { name: string | null; body: string; ipHash: string }): Promise<void> {
      await request("", {
        method: "POST",
        body: JSON.stringify({ name: c.name, body: c.body, ip_hash: c.ipHash }),
      });
    },
    async countRecent(ipHash: string, sinceIso: string): Promise<number> {
      const res = await request(
        `select=id&ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${encodeURIComponent(sinceIso)}`,
        { method: "HEAD", headers: { prefer: "count=exact" } },
      );
      const total = res.headers.get("content-range")?.split("/")[1];
      return total && total !== "*" ? Number(total) : 0;
    },
    listApproved(limit: number): Promise<Comment[]> {
      return list(`select=${COLUMNS}&approved_at=not.is.null&order=approved_at.desc&limit=${limit}`);
    },
    listPending(): Promise<Comment[]> {
      return list(`select=${COLUMNS}&approved_at=is.null&order=created_at.desc`);
    },
    async approve(id: string): Promise<void> {
      await request(byId(id), {
        method: "PATCH",
        body: JSON.stringify({ approved_at: new Date().toISOString() }),
      });
    },
    async unpublish(id: string): Promise<void> {
      await request(byId(id), { method: "PATCH", body: JSON.stringify({ approved_at: null }) });
    },
    async remove(id: string): Promise<void> {
      await request(byId(id), { method: "DELETE" });
    },
  };
}

export type CommentStore = ReturnType<typeof createStore>;
