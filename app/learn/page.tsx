import type { Metadata } from "next";
import { CatalogTabs } from "@/components/CatalogTabs";
import { SiteHeader } from "@/components/SiteHeader";
import { getPublished } from "@/lib/signs";

export const metadata: Metadata = {
  title: "Бүх дохио",
  description: "Монгол дохионы хэлний өгүүлбэр, үсгийг алхам алхмаар үзээрэй.",
};

export default function LearnPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-md px-4 pb-10 pt-4">
        <CatalogTabs sentences={getPublished("sentence")} letters={getPublished("letter")} />
      </main>
    </>
  );
}
