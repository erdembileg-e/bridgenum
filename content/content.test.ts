import { describe, expect, it } from "vitest";
import { publicFileExists } from "@/lib/files";
import { letters } from "./letters";
import { sentences } from "./sentences";

const all = [...sentences, ...letters];

describe("content", () => {
  it("has 40 sentences and 35 letters", () => {
    expect(sentences).toHaveLength(40);
    expect(letters).toHaveLength(35);
  });

  it("numbers each kind 1..N in order", () => {
    expect(sentences.map((s) => s.order)).toEqual(
      Array.from({ length: 40 }, (_, i) => i + 1),
    );
    expect(letters.map((s) => s.order)).toEqual(
      Array.from({ length: 35 }, (_, i) => i + 1),
    );
  });

  it("uses unique URL-safe slugs per kind", () => {
    for (const list of [sentences, letters]) {
      const slugs = list.map((s) => s.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
      for (const slug of slugs) expect(slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("starts with «Сайн байна уу?» in 3 steps", () => {
    expect(sentences[0]).toMatchObject({
      kind: "sentence",
      slug: "sain-baina-uu",
      title: "Сайн байна уу?",
    });
    expect(sentences[0].steps).toHaveLength(3);
  });

  it("lists the letters А..Я with the fixed slugs", () => {
    expect(letters.map((l) => l.title).join("")).toBe(
      "АБВГДЕЁЖЗИЙКЛМНОӨПРСТУҮФХЦЧШЩЪЫЬЭЮЯ",
    );
    expect(letters.find((l) => l.title === "Ө")?.slug).toBe("oe");
    expect(letters.find((l) => l.title === "Ү")?.slug).toBe("ue");
  });

  it("points every image at a file that exists in public/", () => {
    for (const sign of all) {
      const images = [...sign.steps.map((s) => s.image), sign.ogImage].filter(
        (i): i is string => Boolean(i),
      );
      for (const image of images) {
        expect(image.startsWith("/signs/")).toBe(true);
        expect(image).not.toMatch(/mnsl/i);
        expect(publicFileExists(image), image).toBe(true);
      }
    }
  });

  it("gives every step a caption", () => {
    for (const sign of all)
      for (const step of sign.steps) expect(step.caption.trim()).not.toBe("");
  });
});
