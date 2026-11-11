import Link from "next/link";
import { Suspense } from "react";
import { CommentForm } from "@/components/CommentForm";
import { CommentsFeed } from "@/components/CommentsFeed";
import { PhotoStack } from "@/components/PhotoStack";
import { SignCard } from "@/components/SignCard";
import { SiteHeader } from "@/components/SiteHeader";
import { StepStrip } from "@/components/StepStrip";
import { getPublished, getSign } from "@/lib/signs";

const SOURCE_URL =
  "https://www.sdgbeproject.mn/en/posts/today-is-the-international-day-of-sign-languages-according-to-2023-statistics-there-are-111228-people-with-disabilities-in-mongolia-including-7800-who-are-deaf";

const PREVIEW_COUNT = 6;

function stepImage(slug: string, step: number): string | null {
  return getSign("sentence", slug)?.steps[step]?.image ?? null;
}

export default function Home() {
  const hello = getSign("sentence", "sain-baina-uu");
  const sentences = getPublished("sentence");
  const stack = [
    stepImage("bayarlalaa", 0),
    stepImage("sain-baina-uu", 0),
    stepImage("bi-chamd-khairtai", 1),
  ];

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-6 sm:px-6">
        <section className="mx-auto max-w-2xl pt-8 text-center sm:pt-14">
          <h1 className="text-[2.1rem] font-extrabold leading-[1.1] sm:text-6xl">
            Дохионы хэл бол{" "}
            <mark className="whitespace-nowrap rounded-xl bg-sun px-2 text-ink">бас нэг хэл.</mark>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/75 sm:text-xl">
            Монголд 7,800 орчим сонсголгүй хүн бий. Тэд гараар ярьдаг, нүдээрээ сонсдог. Харин
            бидний ихэнх нь тэдэнтэй ярилцаж чаддаггүй.
          </p>
          {stack.every(Boolean) && (
            <div className="mt-8">
              <PhotoStack images={stack as [string, string, string]} />
            </div>
          )}
        </section>

        {hello && (
          <section className="mx-auto mt-12 max-w-3xl rounded-[28px] bg-white/70 p-4 shadow-[0_8px_30px_rgba(123,79,214,0.08)] sm:p-8">
            <h2 className="text-xl font-extrabold sm:text-2xl">Нэг үг сураад үзье.</h2>
            <p className="mb-4 mt-1 text-2xl font-extrabold text-accent sm:text-3xl">
              {hello.title}
            </p>
            <StepStrip steps={hello.steps} />
            <p className="mt-6 text-center text-lg font-bold">Та одоо нэг дохио мэддэг боллоо. 🙌</p>
            <Link
              href="/learn"
              className="mx-auto mt-5 block w-full max-w-xs rounded-full bg-accent px-6 py-4 text-center text-lg font-bold text-white shadow-[0_10px_24px_rgba(123,79,214,0.30)] transition hover:-translate-y-0.5"
            >
              Цааш үзэх →
            </Link>
          </section>
        )}

        <section className="mt-14">
          <div className="mb-4 flex items-end justify-between gap-4">
            <h2 className="text-2xl font-extrabold sm:text-3xl">{sentences.length} өгүүлбэр</h2>
            <Link href="/learn" className="font-bold text-accent">
              Бүгдийг үзэх ({sentences.length}) →
            </Link>
          </div>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {sentences.slice(0, PREVIEW_COUNT).map((sign) => (
              <li key={sign.slug}>
                <SignCard sign={sign} sizes="(max-width: 640px) 50vw, 360px" />
              </li>
            ))}
          </ul>
        </section>

        <section id="comments" className="mt-14 scroll-mt-6">
          <h2 className="mb-4 text-2xl font-extrabold sm:text-3xl">💬 Хүмүүс юу гэж хэлж байна</h2>
          <Suspense fallback={<div className="h-24 animate-pulse rounded-[20px] bg-white/60" />}>
            <CommentsFeed />
          </Suspense>
          <CommentForm />
        </section>

        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-12 block text-center text-xs text-ink/60 underline"
        >
          Эх сурвалж: SDGBE төсөл, 2023
        </a>
      </main>
    </>
  );
}
