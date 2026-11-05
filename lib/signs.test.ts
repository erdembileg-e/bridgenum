import { describe, expect, it, vi } from "vitest";
import {
  allSlugs,
  getNeighbors,
  getPublished,
  getSign,
  signHref,
} from "./signs";

vi.mock("@/content/sentences", () => {
  const step = { image: "/signs/x/step-1.png", caption: "c" };
  return {
    sentences: [
      { kind: "sentence", slug: "s1", order: 1, title: "S1", steps: [step] },
      { kind: "sentence", slug: "s2", order: 2, title: "S2", steps: [] },
      { kind: "sentence", slug: "s3", order: 3, title: "S3", steps: [step] },
    ],
  };
});

const slugs = (list: { slug: string }[]) => list.map((s) => s.slug);

describe("signs", () => {
  it("publishes only signs that have steps, in order", () => {
    expect(slugs(getPublished("sentence"))).toEqual(["s1", "s3"]);
  });

  it("returns null for unpublished and unknown slugs", () => {
    expect(getSign("sentence", "s2")).toBeNull();
    expect(getSign("sentence", "nope")).toBeNull();
    expect(getSign("sentence", "s3")?.title).toBe("S3");
  });

  it("finds neighbours among published signs only", () => {
    const first = getNeighbors("sentence", "s1");
    expect(first.prev).toBeNull();
    expect(first.next?.slug).toBe("s3");
    expect(first.index).toBe(0);
    expect(first.total).toBe(2);
    const last = getNeighbors("sentence", "s3");
    expect(last.prev?.slug).toBe("s1");
    expect(last.next).toBeNull();
    expect(last.index).toBe(1);
  });

  it("builds hrefs per kind", () => {
    expect(signHref({ kind: "letter", slug: "oe" })).toBe("/letter/oe");
    expect(signHref({ kind: "sentence", slug: "s1" })).toBe("/sentence/s1");
  });

  it("lists every defined slug", () => {
    expect(allSlugs("sentence")).toEqual(["s1", "s2", "s3"]);
  });
});
