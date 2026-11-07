import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
