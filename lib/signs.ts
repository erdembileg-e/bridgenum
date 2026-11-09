import { letters } from "@/content/letters";
import { sentences } from "@/content/sentences";

export type SignKind = "sentence" | "letter";

export type Step = {
  /** Public path, e.g. "/signs/sain-baina-uu/step-1.png". */
  image: string;
  caption: string;
  video?: string;
};

export type Sign = {
  kind: SignKind;
  slug: string;
  order: number;
  title: string;
  /** Empty until the owner adds images; such signs are not published. */
  steps: Step[];
  ogImage?: string;
};

function all(kind: SignKind): Sign[] {
  return kind === "sentence" ? sentences : letters;
}

export function getPublished(kind: SignKind): Sign[] {
  return all(kind)
    .filter((sign) => sign.steps.length > 0)
    .sort((a, b) => a.order - b.order);
}

/** Every sign of a kind in order, including ones still waiting for images. */
export function getAll(kind: SignKind): Sign[] {
  return [...all(kind)].sort((a, b) => a.order - b.order);
}

export function getSign(kind: SignKind, slug: string): Sign | null {
  return getPublished(kind).find((sign) => sign.slug === slug) ?? null;
}

export function getNeighbors(kind: SignKind, slug: string) {
  const published = getPublished(kind);
  const index = published.findIndex((sign) => sign.slug === slug);
  return {
    prev: index > 0 ? published[index - 1] : null,
    next: index >= 0 && index < published.length - 1 ? published[index + 1] : null,
    index,
    total: published.length,
  };
}

export function signHref(sign: Pick<Sign, "kind" | "slug">): string {
  return `/${sign.kind}/${sign.slug}`;
}

export function allSlugs(kind: SignKind): string[] {
  return all(kind).map((sign) => sign.slug);
}
