# Warm Redesign and Visitor Comments Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the site in the approved warm "Lavender & sunshine" look with the GIP font, and add visitor comments that the owner approves in a private `/admin` page.

**Architecture:** Styling is Tailwind 4 theme tokens in `app/globals.css` plus a shared header, footer and sign card. Comments live in a Supabase table that only the server touches, through a small REST wrapper in `lib/comments/`. Visitors submit with a Server Action. The public list is a `use cache` function tagged `comments`. Admin actions call `updateTag("comments")`. Admin auth is a password check that sets a signed httpOnly cookie.

**Tech Stack:** Next.js 16.4.5 (App Router, `cacheComponents: true`), React 19.3, Tailwind 4, TypeScript, Vitest + Testing Library, Supabase (PostgREST over `fetch`, no SDK), Vercel.

**Spec:** `docs/superpowers/specs/2026-11-06-warm-redesign-and-comments-design.md` (builds on `docs/superpowers/specs/2026-11-05-msl-site-design.md`).

## Global Constraints

- Read the relevant guide in `node_modules/next/dist/docs/` before each task (AGENTS.md). These are the ones used here: `01-app/01-getting-started/13-fonts.md` (local fonts), `07-mutating-data.md`, `02-guides/forms.md` (`useActionState`), `09-revalidating.md` (`cacheTag`, `updateTag`), `02-guides/authentication-with-cache-components.md` (reading `cookies()` needs a `<Suspense>` boundary).
- Colors: accent `#7b4fd6`, primary `#5b3a9e`, ink `#2a1f3d`, sun `#ffc93c`, background gradient `#efe5ff` → `#f6f1ff` → `#fffaf0`, story stays `#1d1530`.
- Font: GIP from `public/fonts/gip-{400,500,600,700,800}.*.woff2` (already copied), Nunito as fallback. Headings use 700/800.
- Copy is plain, warm Mongolian. Never pity or "other" deaf people. Existing approved home text stays word for word (spec 4.1).
- Do not change slugs, sign data, or step-viewer behavior (swipe/tap/keys/next/prev/progress).
- The browser must never receive `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD` or `COMMENTS_SECRET`. No `NEXT_PUBLIC_` prefix on them, and `import "server-only"` in every module that reads them.
- Comment limits: name ≤ 40 chars (optional, shown as «Зочин»), message 3–500 chars, both trimmed. Rate limit: 3 per IP hash per 10 minutes. Public list: latest 12 approved, newest first.
- Missing Supabase env vars: the site still builds and runs. The list shows its empty state and the form shows «Сэтгэгдэл одоогоор хаалттай байна.»
- `npm test`, `npx tsc --noEmit`, `npx eslint .` and `npx next build` pass at the end of every task.

## Review Focus

- Message length counted by user-visible characters, so Cyrillic and emoji count as one each. Test: a 500-character Cyrillic message is accepted and 501 is rejected (Task 4).
- Someone typing `<script>` or HTML in a comment: it must show as plain text. Test: the list renders `<b>hi</b>` literally (Task 5).
- A visitor double-taps «Илгээх» on a slow phone: only one submission while pending. Test: the button is disabled while pending (Task 5).
- No `x-forwarded-for` header (local dev): the rate limit uses a fixed `"unknown"` key instead of crashing. Test (Task 4).
- A forged or expired admin cookie must not pass. Test: a tampered signature and a cookie older than 7 days are both rejected (Task 6).

---

### Task 1: Theme, GIP font, shared header and footer

**Files:**
- Modify: `app/globals.css`, `app/layout.tsx`, `components/SiteHeader.tsx`
- Create: `components/SiteFooter.tsx`, `components/SiteHeader.test.tsx`

**Interfaces:**
- Produces: Tailwind tokens `primary`, `accent`, `sun`, `ink`, `page`, `story`, `primary-light`, plus a utility class `bg-warm` (the gradient). Font var `--font-gip` set on `<html>`. `<SiteHeader />` (no props) and `<SiteFooter />` (no props).

- [ ] **Step 1: Write the failing tests** in `components/SiteHeader.test.tsx`:
  - `SiteHeader` renders links named «Өгүүлбэр» → `/learn`, «Цагаан толгой» → `/learn#letters`, «Сэтгэгдэл» → `/#comments`, and a home link «🤟 Дохионы хэл» → `/`.
  - `SiteFooter` renders a link named «Зургийн эх сурвалж: mnsl.mn» with `href="https://mnsl.mn"`.
- [ ] **Step 2: Run** `npx vitest run components/SiteHeader.test.tsx`. Expected: FAIL (no SiteFooter, no nav links).
- [ ] **Step 3: Implement.**
  - `app/layout.tsx`: `localFont({ src: [...5 weights from "../public/fonts/..."], variable: "--font-gip", display: "swap", fallback: [...] })`. Keep Nunito loaded as `--font-nunito`. Set `--font-sans: var(--font-gip), var(--font-nunito), system-ui, sans-serif` in `globals.css`.
  - `globals.css`: add the color tokens above and `bg-warm` (`linear-gradient(180deg,#efe5ff 0,#f6f1ff 40%,#fffaf0 100%)`). Apply it to `body`, with `min-height: 100dvh`.
  - Header: full-width bar with content max-width `max-w-6xl`. The links are white rounded pills, and on phone they become a compact horizontal pill row under the logo (no menu button).
  - Footer: centered small text, holding the mnsl.mn credit link.
- [ ] **Step 4: Run** `npx vitest run`. Expected: all PASS.
- [ ] **Step 5: Commit** `feat: warm theme, GIP font, shared header and footer`.

### Task 2: Shared sign card, restyled catalog, viewer and not-found

**Files:**
- Create: `components/SignCard.tsx`, `components/SignCard.test.tsx`
- Modify: `components/CatalogTabs.tsx`, `app/learn/page.tsx`, `components/StoryViewer.tsx`, `app/not-found.tsx`, `components/StepStrip.tsx` (colors/radius only)

**Interfaces:**
- Consumes: tokens from Task 1, `Sign` and `signHref` from `lib/signs.ts`.
- Produces: `SignCard({ sign, sizes, priority }: { sign: Sign; sizes: string; priority?: boolean })`, a link card for a sentence.

- [ ] **Step 1: Write the failing test.** `SignCard` renders a link to `/sentence/<slug>`, the title, and a badge «N алхам» where N = `sign.steps.length`.
- [ ] **Step 2: Run** `npx vitest run components/SignCard.test.tsx`. Expected: FAIL.
- [ ] **Step 3: Implement.**
  - Card: white, `rounded-[22px]`, `p-2`, soft purple shadow (`shadow-[0_6px_18px_rgba(123,79,214,0.10)]`). Image `aspect-[1.3] object-cover object-top rounded-2xl`. Title row plus a pill badge (`bg-primary-light text-accent`).
  - `CatalogTabs` uses `SignCard` in `grid-cols-2 sm:grid-cols-3 lg:grid-cols-4`. Tabs are pills (active `bg-accent text-white`, inactive `bg-white text-accent`).
  - `/learn` gets `<SiteHeader/>`, `max-w-6xl` and `<SiteFooter/>`.
  - `StoryViewer` keeps its logic. Visual changes only: `rounded-3xl` stage, a sun-yellow active progress bar, the GIP heading, and a small «Эх сурвалж: mnsl.mn» line under the caption.
  - Not-found: header, a friendly message «Энэ хуудас олдсонгүй.» with the existing button restyled `bg-accent rounded-full`, and the footer.
- [ ] **Step 4: Run** `npx vitest run`. Expected: all PASS (existing `CatalogTabs` and `StoryViewer` tests unchanged).
- [ ] **Step 5: Commit** `feat: shared sign card and warm catalog, viewer, not-found`.

### Task 3: Home page redesign

**Files:**
- Modify: `app/page.tsx`, `app/page.test.tsx`
- Create: `components/PhotoStack.tsx`

**Interfaces:**
- Consumes: `SignCard` (Task 2), `SiteHeader`/`SiteFooter` (Task 1), `getSign`, `getPublished`.
- Produces: an element with `id="comments"` in the home page, which Task 5 fills (until then, the heading «Хүмүүс юу гэж хэлж байна» only).

- [ ] **Step 1: Update `app/page.test.tsx`** so it asserts:
  - the existing approved text still renders (headline, lead text, «Нэг үг сураад үзье.», «Та одоо нэг дохио мэддэг боллоо. 🙌», the SDGBE source link);
  - a link «Сурч эхлэх →» to `/learn`;
  - exactly 6 sentence card links;
  - a link «Бүгдийг үзэх (40) →» to `/learn`;
  - a heading «Хүмүүс юу гэж хэлж байна» inside an element with id `comments`.
- [ ] **Step 2: Run** `npx vitest run app/page.test.tsx`. Expected: FAIL.
- [ ] **Step 3: Implement.**
  - `PhotoStack({ images }: { images: string[] })`: three step images, `aspect-square object-top`, white border, rotated −5°/0/+5°, `alt=""` (decorative). Photos are 150px on desktop and ~30vw on phone, with the middle image `priority`.
  - Images: Баярлалаа, Сайн байна уу?, Би чамд хайртай (step 1 / step 1 / step 2).
  - Headline: «бас нэг хэл.» wrapped in a `<mark>` with `bg-sun rounded-lg px-2`.
  - Order per spec 4.1: headline, lead, photo stack, lesson (`StepStrip`, restyled), button «Сурч эхлэх →», «40 өгүүлбэр» preview grid (first 6 published, 2 cols phone / 3 cols desktop), «Бүгдийг үзэх (40) →» (count from `getPublished`), comments section, source link, footer.
- [ ] **Step 4: Run** `npx vitest run`. Then check the page at phone width 390px and desktop width 1280px in a browser (`npm run dev`). Expected: tests PASS, headline and photos visible above the fold on phone, no horizontal scroll.
- [ ] **Step 5: Commit** `feat: warm home page with photo stack and sentence preview`.

### Task 4: Comment rules and Supabase store

**Files:**
- Create: `lib/comments/rules.ts`, `lib/comments/rules.test.ts`, `lib/comments/store.ts`, `lib/comments/store.test.ts`, `supabase/migrations/0001_comments.sql`

**Interfaces:**
- Produces:
  - `type Comment = { id: string; name: string | null; body: string; createdAt: string; approvedAt: string | null }`
  - `validateComment(input: { name: unknown; body: unknown; website: unknown }): { ok: true; name: string | null; body: string } | { ok: false; error: "honeypot" | "too-short" | "too-long" | "name-too-long" }`
  - `displayName(name: string | null): string` (returns «Зочин» for null/blank)
  - `hashIp(ip: string | null, secret: string): string` (HMAC-SHA256 hex; `null` → hash of `"unknown"`)
  - `RATE_LIMIT = { max: 3, windowMinutes: 10 }`
  - `commentsConfigured(): boolean`
  - `createStore(cfg: { url: string; key: string; fetch?: typeof fetch })` returning `{ insert(c: { name: string | null; body: string; ipHash: string }): Promise<void>; countRecent(ipHash: string, sinceIso: string): Promise<number>; listApproved(limit: number): Promise<Comment[]>; listPending(): Promise<Comment[]>; approve(id: string): Promise<void>; unpublish(id: string): Promise<void>; remove(id: string): Promise<void> }`
  - `getStore(): ReturnType<typeof createStore> | null` (reads env, `null` when not configured; module imports `server-only`)

- [ ] **Step 1: Write the failing tests.**
  - `rules.test.ts`: `"  hi  "` → too-short; 3 chars → ok; 500 Cyrillic chars → ok; 501 → too-long; `"😀".repeat(500)` → ok (count with `Array.from`); 41-char name → name-too-long; blank name → `name: null`; non-empty `website` → honeypot; `displayName(null)` and `displayName("  ")` → «Зочин»; `hashIp(null, "s") === hashIp("unknown", "s")`; and the same IP with a different secret gives a different hash.
  - `store.test.ts` (inject a fake `fetch`, assert the request): `insert` POSTs to `${url}/rest/v1/comments` with headers `apikey` and `Authorization: Bearer <key>`, and a body with `name`, `body`, `ip_hash`. `listApproved(12)` GETs `approved_at=not.is.null&order=approved_at.desc&limit=12` and maps snake_case → `Comment`. `countRecent` uses `Prefer: count=exact` and reads the total from `content-range`. `approve` PATCHes `approved_at`, `unpublish` PATCHes `approved_at: null`, and `remove` DELETEs `id=eq.<id>`. A non-2xx response throws.
- [ ] **Step 2: Run** `npx vitest run lib/comments`. Expected: FAIL.
- [ ] **Step 3: Implement** both modules. `store.ts` uses plain `fetch` against PostgREST (no SDK dependency). Install `server-only` and alias it to an empty module in `vitest.config.ts`.
- [ ] **Step 4: Write `supabase/migrations/0001_comments.sql`:** table `comments(id uuid primary key default gen_random_uuid(), name text check (char_length(name) <= 40), body text not null check (char_length(body) between 3 and 500), ip_hash text not null, created_at timestamptz not null default now(), approved_at timestamptz)`, indexes on `(approved_at desc)` and `(ip_hash, created_at)`, `alter table comments enable row level security;` and no policies.
- [ ] **Step 5: Run** `npx vitest run`. Expected: all PASS.
- [ ] **Step 6: Commit** `feat: comment validation and Supabase store`.

### Task 5: Public comments (form and list on home)

**Files:**
- Create: `app/actions/comments.ts`, `components/CommentForm.tsx`, `components/CommentList.tsx`, `lib/comments/queries.ts`, plus tests `components/CommentForm.test.tsx` and `components/CommentList.test.tsx`
- Modify: `app/page.tsx` (fill the `#comments` section)

**Interfaces:**
- Consumes: everything Task 4 produces.
- Produces:
  - `submitComment(prev: SubmitState, form: FormData): Promise<SubmitState>` where `type SubmitState = { status: "idle" | "sent" | "error" | "closed"; message?: string }`
  - `getApprovedComments(): Promise<Comment[]>` (`'use cache'`, `cacheTag("comments")`, `cacheLife("hours")`; returns `[]` when not configured or Supabase fails)
  - `CommentList({ comments }: { comments: Comment[] })`

- [ ] **Step 1: Write the failing tests.**
  - `CommentList`: renders each name via `displayName` plus the body. `<b>hi</b>` appears as literal text. An empty array shows «Эхний сэтгэгдлийг та үлдээгээрэй 🙌».
  - `CommentForm` (mock the action): it has a name input (optional, `maxLength` 40), a textarea (required, `maxLength` 500), a visually hidden honeypot input `name="website"` (`tabIndex={-1}`, `autoComplete="off"`) and the button «Илгээх».
    - The button is disabled while pending.
    - On `sent`, it shows «Баярлалаа! Таны сэтгэгдлийг удахгүй нийтэлнэ.» and clears the form.
    - On `closed`, it shows «Сэтгэгдэл одоогоор хаалттай байна.»
  - Action tests (mock `getStore`):
    - no store → `closed`;
    - honeypot → `sent` with no insert, so bots learn nothing;
    - invalid → `error` with messages «Сэтгэгдэл хэт богино байна.», «Сэтгэгдэл 500 тэмдэгтээс хэтрэхгүй.» or «Нэр 40 тэмдэгтээс хэтрэхгүй.»;
    - `countRecent` ≥ 3 → `error` «Түр хүлээгээд дахин оролдоорой.»;
    - success → `insert` is called with the hashed IP from the first `x-forwarded-for` value.
- [ ] **Step 2: Run** `npx vitest run components/Comment* app/actions`. Expected: FAIL.
- [ ] **Step 3: Implement.**
  - `"use server"` action: read the IP with `(await headers()).get("x-forwarded-for")?.split(",")[0].trim() ?? null`.
  - New comments are pending, so the action does not revalidate.
  - Speech-bubble cards: white, `rounded-[20px] rounded-bl-md`, soft shadow, in a grid of 1 col on phone and 3 on desktop.
  - The form sits under the list in a dashed lavender border box (`border-2 border-dashed border-[#d9c8fb]`).
  - `app/page.tsx` renders `<CommentList comments={await getApprovedComments()} />` and `<CommentForm />` inside `#comments`, with the list wrapped in `<Suspense>` if the build requires it.
- [ ] **Step 4: Run** `npx vitest run && npx next build`. Expected: PASS, and the build succeeds with no Supabase env vars set.
- [ ] **Step 5: Commit** `feat: visitor comment form and approved comment list`.

### Task 6: Admin page with approve, unpublish and delete

**Files:**
- Create: `lib/comments/admin-auth.ts`, `lib/comments/admin-auth.test.ts`, `app/admin/page.tsx`, `app/admin/actions.ts`, `app/admin/AdminLogin.tsx`
- Modify: `app/layout.tsx` only if the robots metadata needs it (otherwise set it in `app/admin/page.tsx`)

**Interfaces:**
- Consumes: `getStore`, `Comment`, `displayName` (Task 4).
- Produces:
  - `signSession(nowMs: number, secret: string): string`, a cookie value of `"<issuedMs>.<hmacHex>"`
  - `verifySession(value: string | undefined, nowMs: number, secret: string): boolean`, which is valid for 7 days
  - `checkPassword(input: string, expected: string): boolean`, using a constant-time compare
  - `ADMIN_COOKIE = "msl_admin"`
  - Server actions `login(prev, form)`, `logout()`, `approveComment(id)`, `unpublishComment(id)` and `deleteComment(id)`. Every action except `login` calls `verifySession` first and throws if it fails. Approve, unpublish and delete then call `updateTag("comments")`.

- [ ] **Step 1: Write the failing tests** in `admin-auth.test.ts`:
  - a fresh signed value verifies;
  - one changed hex character fails;
  - `issued + 7 days + 1ms` fails;
  - `undefined` and `"garbage"` fail;
  - `checkPassword("a","a")` → true and `checkPassword("a","b")` → false;
  - different lengths → false, with no throw.
- [ ] **Step 2: Run** `npx vitest run lib/comments/admin-auth.test.ts`. Expected: FAIL.
- [ ] **Step 3: Implement.**
  - The cookie is `httpOnly`, `secure` in production, `sameSite: "lax"`, `path: "/admin"` and `maxAge` 7 days.
  - `/admin`:
    - metadata `robots: { index: false, follow: false }`;
    - the session read sits inside `<Suspense>` (cookies need a boundary under Cache Components);
    - a bad session shows `AdminLogin` (password field and «Нэвтрэх» button);
    - a good session shows two lists, «Хүлээгдэж буй» (pending, with **Зөвшөөрөх** and **Устгах**) and «Нийтлэгдсэн» (approved, with **Нуух** and **Устгах**), each row showing the name, body and date;
    - an «Гарах» button.
  - Not configured: show «Supabase тохируулаагүй байна. README-г үзнэ үү.» The sitemap already excludes `/admin`, so leave it.
- [ ] **Step 4: Run** `npx vitest run && npx next build`. Expected: PASS.
- [ ] **Step 5: Commit** `feat: admin page to approve, hide and delete comments`.

### Task 7: Setup docs and end-to-end check

**Files:**
- Modify: `README.md`, `.gitignore` (confirm `.env*.local` is listed)
- Create: `.env.example`

- [ ] **Step 1: Write `.env.example`** with `SUPABASE_URL=`, `SUPABASE_SERVICE_ROLE_KEY=`, `ADMIN_PASSWORD=`, `COMMENTS_SECRET=` (a comment says to use 32+ random chars, e.g. `openssl rand -hex 32`).
- [ ] **Step 2: Replace the README's boilerplate** with short Mongolian setup steps:
  1. Create a Supabase project and run `supabase/migrations/0001_comments.sql` in the SQL editor.
  2. Copy the Project URL and the service_role key.
  3. Add the 4 env vars in Vercel → Settings → Environment Variables, then redeploy.
  4. Approve comments at `/admin`.
  Keep the existing dev/test commands and link `docs/adding-signs.md`.
- [ ] **Step 3: Check it end to end** against a real Supabase project, with env vars in `.env.local` and `npm run dev`:
  1. Submit a comment. It shows the thank-you and doesn't appear publicly.
  2. Log in at `/admin` and approve it. It appears on `/`.
  3. Hide it. It disappears.
  4. Delete it.
  5. Submit 4 times quickly. The 4th shows «Түр хүлээгээд дахин оролдоорой.»
  6. Search the browser's JS bundles for the service key. It isn't there: `grep -r "<first 12 chars of key>" .next/static` returns nothing.
- [ ] **Step 4: Run** `npm test && npx tsc --noEmit && npx eslint . && npx next build`. Expected: all pass.
- [ ] **Step 5: Commit** `docs: Supabase and Vercel setup for comments`.
