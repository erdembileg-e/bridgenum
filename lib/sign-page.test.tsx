import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { SignPage, signMetadata, signStaticParams } from "./sign-page";

const notFound = vi.fn(() => {
  throw new Error("NEXT_NOT_FOUND");
});
vi.mock("next/navigation", () => ({
  notFound: () => notFound(),
  useRouter: () => ({ push: vi.fn() }),
}));

describe("sign pages", () => {
  it("prerenders published sentences", () => {
    expect(signStaticParams("sentence")).toEqual([{ slug: "sain-baina-uu" }]);
  });

  it("falls back to one letter slug while no letter is published", () => {
    expect(signStaticParams("letter")).toEqual([{ slug: "a" }]);
  });

  it("describes a sentence for sharing", () => {
    const meta = signMetadata("sentence", "sain-baina-uu");
    expect(meta.title).toBe("Сайн байна уу?");
    expect(meta.description).toBe("«Сайн байна уу?» дохиог 3 алхмаар сураарай.");
    expect(meta.openGraph).toMatchObject({
      locale: "mn_MN",
      images: ["/signs/sain-baina-uu/steps.png"],
    });
  });

  it("has no metadata for unpublished signs", () => {
    expect(signMetadata("sentence", "saikhan-amarsan-uu")).toEqual({});
  });

  it("is not found for unpublished or unknown signs", () => {
    expect(() => SignPage({ kind: "sentence", slug: "saikhan-amarsan-uu" })).toThrow(
      "NEXT_NOT_FOUND",
    );
    expect(() => SignPage({ kind: "letter", slug: "a" })).toThrow("NEXT_NOT_FOUND");
    expect(() => SignPage({ kind: "sentence", slug: "xyz" })).toThrow("NEXT_NOT_FOUND");
  });

  it("renders the viewer with its position and close link", () => {
    render(SignPage({ kind: "sentence", slug: "sain-baina-uu" }));
    expect(screen.getByText("1 / 1")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Хаах" })).toHaveAttribute("href", "/learn");
  });
});
