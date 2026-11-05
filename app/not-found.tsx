import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-4 py-16 text-center">
      <p className="text-xl font-bold">Энэ хуудас олдсонгүй.</p>
      <Link href="/learn" className="rounded-xl bg-primary px-5 py-3 font-bold text-white">
        Бүх дохиог үзэх
      </Link>
    </main>
  );
}
