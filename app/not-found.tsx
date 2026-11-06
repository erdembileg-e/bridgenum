import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center gap-5 px-4 py-16 text-center">
        <p className="text-5xl" aria-hidden>
          🤔
        </p>
        <p className="text-2xl font-extrabold">Энэ хуудас олдсонгүй.</p>
        <Link
          href="/learn"
          className="rounded-full bg-accent px-6 py-3 font-bold text-white shadow-[0_8px_20px_rgba(123,79,214,0.25)]"
        >
          Бүх дохиог үзэх
        </Link>
      </main>
      <SiteFooter />
    </>
  );
}
