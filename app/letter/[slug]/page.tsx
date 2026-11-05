import type { Metadata } from "next";
import { SignPage, signMetadata, signStaticParams } from "@/lib/sign-page";

export function generateStaticParams() {
  return signStaticParams("letter");
}

export async function generateMetadata({
  params,
}: PageProps<"/letter/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  return signMetadata("letter", slug);
}

export default async function Page({ params }: PageProps<"/letter/[slug]">) {
  const { slug } = await params;
  return <SignPage kind="letter" slug={slug} />;
}
