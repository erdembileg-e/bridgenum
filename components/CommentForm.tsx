"use client";

import { useActionState } from "react";
import { submitComment } from "@/app/actions/comments";
import { initialSubmitState } from "@/lib/comments/submit-state";

const field =
  "w-full rounded-xl bg-page px-4 py-3 text-base outline-none ring-accent/40 placeholder:text-ink/40 focus:ring-2";

export function CommentForm() {
  const [state, action, pending] = useActionState(submitComment, initialSubmitState);

  return (
    <form
      action={action}
      className="mt-5 rounded-[22px] border-2 border-dashed border-[#d9c8fb] bg-white p-4 sm:p-5"
    >
      <p className="mb-3 font-bold">Та сайтыг хэрхэн ашигласан бэ? Бидэнтэй хуваалцаарай.</p>
      <div className="grid gap-3 sm:grid-cols-[1fr_2fr_auto] sm:items-start">
        <label className="block">
          <span className="sr-only">Нэр (заавал биш)</span>
          <input name="name" maxLength={40} placeholder="Нэр (заавал биш)" className={field} />
        </label>
        <label className="block">
          <span className="sr-only">Сэтгэгдэл</span>
          <textarea
            name="body"
            required
            minLength={3}
            maxLength={500}
            rows={2}
            placeholder="Сэтгэгдлээ бичээрэй…"
            className={`${field} resize-y`}
          />
        </label>
        {/* Hidden from people; bots that fill it are ignored. */}
        <input
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={pending}
          className="rounded-full bg-accent px-6 py-3 font-bold text-white shadow-[0_8px_20px_rgba(123,79,214,0.25)] transition disabled:opacity-60"
        >
          {pending ? "Илгээж байна…" : "Илгээх"}
        </button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-6 text-sm font-semibold">
        {state.status === "sent" && (
          <span className="text-accent">Баярлалаа! Таны сэтгэгдлийг удахгүй нийтэлнэ.</span>
        )}
        {state.status === "closed" && (
          <span className="text-ink/70">Сэтгэгдэл одоогоор хаалттай байна.</span>
        )}
        {state.status === "error" && <span className="text-[#c0392b]">{state.message}</span>}
      </p>
    </form>
  );
}
