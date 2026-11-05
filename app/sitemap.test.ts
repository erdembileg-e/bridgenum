import { describe, expect, it } from "vitest";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("lists only published pages with absolute URLs", () => {
    const urls = sitemap().map((entry) => entry.url);
    expect(urls).toContain("http://localhost:3000/");
    expect(urls).toContain("http://localhost:3000/learn");
    expect(urls).toContain("http://localhost:3000/sentence/sain-baina-uu");
    expect(urls.some((u) => u.includes("saikhan-amarsan-uu"))).toBe(false);
    expect(urls.some((u) => u.includes("/letter/"))).toBe(false);
  });
});
