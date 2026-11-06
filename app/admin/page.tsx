import type { Metadata } from "next";
import { Suspense } from "react";
import { isAdmin } from "@/lib/comments/admin-session";
import { displayName, type Comment } from "@/lib/comments/rules";
import { commentsConfigured, getStore } from "@/lib/comments/server";
import { AdminLogin } from "./AdminLogin";
import { approveComment, deleteComment, logout, unpublishComment } from "./actions";

export const metadata: Metadata = {
  title: "Сэтгэгдэл удирдах",
  robots: { index: false, follow: false },
};

const dateFormat = new Intl.DateTimeFormat("mn-MN", { dateStyle: "medium", timeStyle: "short" });

const button = "rounded-full px-4 py-2 text-sm font-bold";

function Row({ comment, approved }: { comment: Comment; approved: boolean }) {
  return (
    <li className="rounded-[20px] bg-white p-4 shadow-sm">
      <p className="text-sm font-bold text-accent">
        {displayName(comment.name)}{" "}
        <span className="font-normal text-ink/50">
          · {dateFormat.format(new Date(comment.createdAt))}
        </span>
      </p>
      <p className="mt-1 whitespace-pre-line break-words">{comment.body}</p>
      <div className="mt-3 flex gap-2">
        {approved ? (
          <form action={unpublishComment.bind(null, comment.id)}>
            <button className={`${button} bg-primary-light text-accent`}>Нуух</button>
          </form>
        ) : (
          <form action={approveComment.bind(null, comment.id)}>
            <button className={`${button} bg-accent text-white`}>Зөвшөөрөх</button>
          </form>
        )}
        <form action={deleteComment.bind(null, comment.id)}>
          <button className={`${button} bg-[#fde8e6] text-[#c0392b]`}>Устгах</button>
        </form>
      </div>
    </li>
  );
}

function Section({ title, comments, approved }: { title: string; comments: Comment[]; approved: boolean }) {
  return (
    <section className="mt-8">
      <h2 className="mb-3 text-xl font-extrabold">
        {title} ({comments.length})
      </h2>
      {comments.length === 0 ? (
        <p className="text-ink/60">Одоогоор алга.</p>
      ) : (
        <ul className="grid gap-3">
          {comments.map((c) => (
            <Row key={c.id} comment={c} approved={approved} />
          ))}
        </ul>
      )}
    </section>
  );
}

async function AdminPanel() {
  // Read the session first so this panel is always rendered per request, never prerendered.
  const admin = await isAdmin();
  if (!commentsConfigured() || !process.env.ADMIN_PASSWORD)
    return <p className="mt-8">Supabase тохируулаагүй байна. README-г үзнэ үү.</p>;
  if (!admin) return <AdminLogin />;

  const store = getStore()!;
  const [pending, approved] = await Promise.all([store.listPending(), store.listApproved(100)]);
  return (
    <>
      <form action={logout} className="mt-4">
        <button className={`${button} bg-white`}>Гарах</button>
      </form>
      <Section title="Хүлээгдэж буй" comments={pending} approved={false} />
      <Section title="Нийтлэгдсэн" comments={approved} approved />
    </>
  );
}

export default function AdminPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
      <h1 className="text-3xl font-extrabold">Сэтгэгдэл удирдах</h1>
      <Suspense fallback={<p className="mt-8 text-ink/60">Ачаалж байна…</p>}>
        <AdminPanel />
      </Suspense>
    </main>
  );
}
