import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("links home and to sentences, letters and comments", () => {
    render(<SiteHeader />);
    expect(screen.getByRole("link", { name: "🤟 Дохионы хэл" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Өгүүлбэр" })).toHaveAttribute("href", "/learn");
    expect(screen.getByRole("link", { name: "Цагаан толгой" })).toHaveAttribute(
      "href",
      "/learn#letters",
    );
    expect(screen.getByRole("link", { name: "Сэтгэгдэл" })).toHaveAttribute("href", "/#comments");
  });
});

describe("SiteFooter", () => {
  it("credits mnsl.mn for the images", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Зургийн эх сурвалж: mnsl.mn" })).toHaveAttribute(
      "href",
      "https://mnsl.mn",
    );
  });
});
