import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  it("links home and to sentences, letters and comments", () => {
    render(<SiteHeader showLetters />);
    const home = screen.getByRole("link", { name: "Дохионы хэл" });
    expect(home).toHaveAttribute("href", "/");
    expect(home.querySelector("img")).toHaveAttribute("src", expect.stringContaining("logo"));
    expect(screen.getByRole("link", { name: "Өгүүлбэр" })).toHaveAttribute("href", "/learn");
    expect(screen.getByRole("link", { name: "Цагаан толгой" })).toHaveAttribute(
      "href",
      "/learn#letters",
    );
    expect(screen.getByRole("link", { name: "Сэтгэгдэл" })).toHaveAttribute("href", "/#comments");
  });

  it("hides the alphabet link while no letter has images", () => {
    render(<SiteHeader showLetters={false} />);
    expect(screen.queryByRole("link", { name: "Цагаан толгой" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Өгүүлбэр" })).toBeInTheDocument();
  });
});
