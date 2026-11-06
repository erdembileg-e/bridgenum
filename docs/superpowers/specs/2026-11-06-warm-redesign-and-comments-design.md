# Warm redesign and visitor comments — design

Date: 2026-11-06
Builds on: `2026-11-05-msl-site-design.md` (pages, flow, tone, content rules still apply unless this document says otherwise).

## 1. Intent and why

The site works, but on a computer it looks too plain: a narrow phone-width column on a flat pale background. The owner wants visitors (mostly arriving from Facebook links on phones, staying 1–5 minutes) to feel **warm and friendly**, on both phone and desktop.

The owner also wants visitors to be able to **write a comment about the site on the site**: how they used it and what they think of it. Comments are public, but only after the owner approves them.

## 2. Goals, non-goals, anti-goals

**Goals**
- Restyle every page in the approved direction "B · Lavender & sunshine" (section 4.1), in the GIP font.
- A desktop layout that uses the width (no phone column on a big screen) and a phone layout with the same feel.
- A comments section: visitors submit, the owner approves in a private admin page, approved comments show publicly.

**Non-goals**
- User accounts, logins for visitors, likes, replies, star ratings, editing a comment after sending.
- Email notifications to the owner about new comments.
- Changing the content, slugs/URLs, or how the step viewer behaves (swipe/tap, next/prev, progress bar).

**Anti-goals (a failure even if it works)**
- Anything unapproved appearing publicly, or spam flooding the admin queue.
- The Supabase secret key (or admin password) reaching the browser.
- Copy that pities or "others" deaf people (see the 2026-11-05 spec, section 2). All new copy is plain, warm Mongolian.
- Slower first load on phones from Facebook (heavy images, layout shift from fonts).

## 3. Constraints

- Next.js 16.4.5 with `cacheComponents: true` and `partialPrefetching: true`, React 19.3, Tailwind 4, TypeScript. Read `node_modules/next/dist/docs/` before writing code (AGENTS.md): caching, Server Actions/forms and `next/font/local` may differ from older Next.js.
- Hosting: Vercel (owner confirmed). Database: Supabase (owner's choice).
- Existing tests (`vitest`) must keep passing; extend them for new logic.
- Superseded from the 2026-11-05 spec: "no comments, no database" is now out of date. The 2026-11-05 rule "only the owner's own images" is also superseded for sentences 2–40: the owner chose to use the illustrated step images from their artifact, which carry an «Эх сурвалж: mnsl.mn» label.

## 4. Decided

### 4.1 Look and feel (owner approved direction B)

Approved mockup: `.superpowers/brainstorm/53611-1793980056/content/visual-style.html`, section B.

- **Palette**: keep the purple as the brand color (accent around `#7b4fd6`, current `#5b3a9e` is fine for text/darker uses). Page background is a soft gradient from lavender (`#efe5ff`) through `#f6f1ff` to warm cream (`#fffaf0`). A sunny yellow (`#ffc93c`) highlights key words, e.g. «бас нэг хэл» in the headline as a rounded marker highlight. Ink `#2a1f3d`.
- **Font**: GIP for all text, self-hosted. Files already copied to `public/fonts/gip-{400,500,600,700,800}.*.woff2` from the owner's Ology project (they contain Ө and Ү in all weights). Headings use the bold weights (700/800). Nunito stays as the fallback.
- **Header/nav**: logo «🤟 Дохионы хэл» plus links Өгүүлбэр · Цагаан толгой · Сэтгэгдэл as white pills on desktop. On phone the links collapse (menu or a compact row; builder's choice, see 5).
- **Home content stays as approved (owner decided 2026-11-06)**: the headline «Дохионы хэл бол бас нэг хэл.», the existing lead text, the mini-lesson («Нэг үг сураад үзье.», the 3 steps of «Сайн байна уу?», «Та одоо нэг дохио мэддэг боллоо. 🙌») and the SDGBE source link for the 7,800 figure all stay, with the same wording, restyled in direction B. The mockup's lead sentence «Нэг дохио сураад, анхны яриагаа эхлүүлээрэй.» is **not** used. The photo stack is decoration above the lesson, not a replacement for it.
- **Home, desktop** (top to bottom): centered headline with the yellow highlight, the existing lead text, a tilted stack of three step photos (left −5°, middle straight, right +5°, white border, soft purple shadow), the mini-lesson restyled, the main button «Сурч эхлэх →», the sentence card preview grid (3 columns), the comments section, and the source/credit footer.
- **Home, phone**: same order in one column, photos smaller, 2-column cards. The headline and photo stack are visible without scrolling on a typical phone, and the lesson starts right after them.
- **Cards**: white, rounded (~22px), soft purple shadow, image cropped to the top of the step picture (the existing `object-top` crop that hides baked-in captions), title plus a small badge like «3 алхам».
- **Catalog page (`/learn`)**: same header, background and cards; tabs as rounded pills.
- **Step viewer**: stays dark and full-screen so photos stand out; gets GIP, rounder corners and purple/yellow touches. Behavior unchanged.
- **Not-found page**: matching friendly look.

### 4.2 Comments

- **Where**: a section on the home page titled «Хүмүүс юу гэж хэлж байна» with id `comments` (the nav link «Сэтгэгдэл» jumps there).
- **Form**: name (optional, shown as «Зочин» when blank) and message (required), button «Илгээх». No login.
- **After sending**: a warm thank-you that makes clear it waits for approval, e.g. «Баярлалаа! Таны сэтгэгдлийг удахгүй нийтэлнэ.»
- **Public list**: approved comments only, as speech-bubble cards (white, rounded with one smaller corner), newest first.
- **Moderation**: nothing appears until the owner approves. Private page `/admin`, protected by a password stored as a Vercel environment variable. It lists pending comments with **Approve** and **Delete**.
- **Storage**: a Supabase table. The site talks to Supabase only from the server, with a server-only key. The browser never talks to Supabase directly.
- **Spam protection**: a hidden honeypot field plus a per-visitor rate limit. No captcha.

## 5. Left to the builder (my calls; the owner may override)

- Exact table schema. Suggested: `comments(id uuid pk, name text null, body text not null, created_at timestamptz default now(), approved_at timestamptz null, ip_hash text)`. Row Level Security on with no public policies, since only the server (service role key) touches it.
- Limits: name ≤ 40 characters, message 3–500 characters, trimmed. Plain text only, rendered escaped.
- Rate limit: at most 3 submissions per IP hash per 10 minutes, checked against the table (in-memory limits don't work across Vercel serverless instances). Hash the IP with a server secret; never store raw IPs.
- Admin auth: password compared server-side, then an httpOnly, secure, signed cookie (e.g. HMAC with a server secret) valid for 7 days. `/admin` is `noindex` and excluded from the sitemap. Approve/Delete are server actions that re-check the cookie.
- Public list freshness: approved comments may be cached; approving should refresh them (tag-based revalidation or equivalent in this Next.js version). Show the latest ~12 approved comments; no pagination for now.
- Env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_PASSWORD`, `COMMENTS_SECRET`. Document them in the README with setup steps for Supabase and Vercel. If Supabase env vars are missing (local dev, tests), the comments section shows an empty state, the form explains it isn't available, and the rest of the site still builds and works.
- Phone nav pattern (compact pill row vs menu button). Prefer whatever keeps the first screen clean.
- Which three photos go in the hero stack (suggested: Баярлалаа, Сайн байна уу?, Би чамд хайртай).
- Empty state when no comments are approved yet: a friendly line inviting the first comment.
- Dependency: `@supabase/supabase-js` (or plain `fetch` to the Supabase REST API, if that is lighter).
- «Сурч эхлэх →» opens `/learn`. The home card grid is a short preview (6 sentences) with a «Бүгдийг үзэх (40) →» link to `/learn`, not all 40, to keep the phone load light. Letters are not on home.
- `/admin` also lists approved comments with **Unpublish/Delete**, so a mistaken approval can be undone. Delete refreshes the public list too.
- Image credit: card and hero crops cut off the baked-in «Эх сурвалж: mnsl.mn» label, so a site-wide footer line «Зургийн эх сурвалж: mnsl.mn» (linked) appears on every page with the header, and the step viewer shows a small credit as well.
- One shared header on home, `/learn` and the not-found page. «Сэтгэгдэл» links to `/#comments`. The step viewer keeps no site header.
