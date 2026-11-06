import { displayName, type Comment } from "@/lib/comments/rules";

export function CommentList({ comments }: { comments: Comment[] }) {
  if (comments.length === 0)
    return (
      <p className="rounded-[20px] bg-white/70 px-5 py-6 text-center font-semibold text-ink/70">
        Эхний сэтгэгдлийг та үлдээгээрэй 🙌
      </p>
    );

  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {comments.map((comment) => (
        <li
          key={comment.id}
          className="rounded-[20px] rounded-bl-md bg-white p-4 shadow-[0_4px_14px_rgba(123,79,214,0.08)]"
        >
          <p className="text-sm font-bold text-accent">{displayName(comment.name)}</p>
          <p className="mt-1 whitespace-pre-line break-words leading-relaxed">{comment.body}</p>
        </li>
      ))}
    </ul>
  );
}
