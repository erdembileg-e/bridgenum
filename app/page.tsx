import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { StepStrip } from "@/components/StepStrip";
import { getSign } from "@/lib/signs";

const SOURCE_URL =
  "https://www.sdgbeproject.mn/en/posts/today-is-the-international-day-of-sign-languages-according-to-2023-statistics-there-are-111228-people-with-disabilities-in-mongolia-including-7800-who-are-deaf";

export default function Home() {
  const hello = getSign("sentence", "sain-baina-uu");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-md px-4 pb-10 pt-6">
        <h1 className="text-3xl font-extrabold leading-tight">Дохионы хэл бол бас нэг хэл.</h1>
        <p className="mt-4 text-lg">
          Монголд 7,800 орчим сонсголгүй хүн бий. Тэд гараар ярьдаг, нүдээрээ сонсдог. Харин
          бидний ихэнх нь тэдэнтэй ярилцаж чаддаггүй.
        </p>

        {hello && (
          <section className="mt-8">
            <h2 className="mb-3 text-xl font-bold">Нэг үг сураад үзье.</h2>
            <p className="mb-3 text-2xl font-extrabold text-primary">{hello.title}</p>
            <StepStrip steps={hello.steps} />
            <p className="mt-6 text-center text-lg font-bold">Та одоо нэг дохио мэддэг боллоо. 🙌</p>
          </section>
        )}

        <Link
          href="/learn"
          className="mt-6 block rounded-xl bg-primary px-5 py-4 text-center text-lg font-bold text-white"
        >
          Цааш үзэх →
        </Link>

        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 block text-center text-xs text-ink/60 underline"
        >
          Эх сурвалж: SDGBE төсөл, 2023
        </a>
      </main>
    </>
  );
}
