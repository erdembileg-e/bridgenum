import type { Metadata } from "next";
import { SignPage, signMetadata, signStaticParams } from "@/lib/sign-page";

// Unlisted slugs must wait for the full render so notFound() can send a 404.
export const ensureStatic = "navigation";

export function generateStaticParams() {
  return signStaticParams("sentence");
}

export async function generateMetadata({
  params,
}: PageProps<"/sentence/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return signMetadata("sentence", slug);
}

export default async function Page({ params }: PageProps<"/sentence/[slug]">) {
  const { slug } = await params;
  return <SignPage kind="sentence" slug={slug} />;
}
