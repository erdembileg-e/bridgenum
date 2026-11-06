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
