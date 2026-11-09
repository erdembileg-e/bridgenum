import type { Metadata } from "next";
import { CatalogTabs } from "@/components/CatalogTabs";
import { SiteHeader } from "@/components/SiteHeader";
import { getAll, getPublished } from "@/lib/signs";

export const metadata: Metadata = {
  title: "Бүх дохио",
  description: "Монгол дохионы хэлний өгүүлбэр, үсгийг алхам алхмаар үзээрэй.",
};

export default function LearnPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-10 pt-6 sm:px-6">
        <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">Бүх дохио</h1>
        <CatalogTabs sentences={getPublished("sentence")} letters={getAll("letter")} />
      </main>
    </>
  );
}
