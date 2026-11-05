import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StoryViewer } from "@/components/StoryViewer";
import { allSlugs, getNeighbors, getPublished, getSign, signHref, type SignKind } from "./signs";

const closeHrefs: Record<SignKind, string> = {
  sentence: "/learn",
  letter: "/learn#letters",
};

export function signStaticParams(kind: SignKind): { slug: string }[] {
  const published = getPublished(kind).map((sign) => ({ slug: sign.slug }));
  // Cache Components rejects an empty list; this one page renders as not found.
  return published.length > 0 ? published : [{ slug: allSlugs(kind)[0] }];
}

export function signMetadata(kind: SignKind, slug: string): Metadata {
  const sign = getSign(kind, slug);
  if (!sign) return {};
  const description = `«${sign.title}» дохиог ${sign.steps.length} алхмаар сураарай.`;
  const image = sign.ogImage ?? sign.steps[0].image;
  return {
    title: sign.title,
    description,
    alternates: { canonical: signHref(sign) },
    openGraph: {
      title: sign.title,
      description,
      url: signHref(sign),
      locale: "mn_MN",
      type: "article",
      images: [image],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function SignPage({ kind, slug }: { kind: SignKind; slug: string }) {
  const sign = getSign(kind, slug);
  if (!sign) notFound();
  const { prev, next, index, total } = getNeighbors(kind, slug);
  return (
    <StoryViewer
      key={sign.slug}
      sign={sign}
      position={index + 1}
      count={total}
      nextHref={next ? signHref(next) : null}
      prevHref={prev ? signHref(prev) : null}
      closeHref={closeHrefs[kind]}
    />
  );
}
