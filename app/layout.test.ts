import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

vi.mock("next/font/google", () => ({ Nunito: () => ({ variable: "font" }) }));
vi.mock("next/font/local", () => ({ default: () => ({ variable: "gip" }) }));

describe("root metadata", () => {
  it("gives shared links to / and /learn a default image", async () => {
    const { metadata } = await import("./layout");
    expect(metadata.openGraph).toMatchObject({
      locale: "mn_MN",
      images: ["/signs/sain-baina-uu/steps.png"],
    });
  });
});

describe("root layout", () => {
  it("includes Vercel Web Analytics on every page", async () => {
    vi.resetModules();
    vi.doMock("@vercel/analytics/next", () => ({
      Analytics: () => createElement("i", { "data-testid": "vercel-analytics" }),
    }));
    const { default: RootLayout } = await import("./layout");
    const html = renderToStaticMarkup(
      RootLayout({ children: null, params: Promise.resolve({}) } as never),
    );
    expect(html).toContain('data-testid="vercel-analytics"');
  });
});
