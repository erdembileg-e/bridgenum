import { act, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import type { Sign } from "@/lib/signs";
import { CatalogTabs } from "./CatalogTabs";

const step = (slug: string) => ({ image: `/signs/${slug}/step-1.png`, caption: "c" });
const sentence: Sign = {
  kind: "sentence",
  slug: "sain-baina-uu",
  order: 1,
  title: "Сайн байна уу?",
  steps: [step("sain-baina-uu")],
};
const letters: Sign[] = [
  { kind: "letter", slug: "a", order: 1, title: "А", steps: [step("a")] },
  { kind: "letter", slug: "b", order: 2, title: "Б", steps: [step("b")] },
];

afterEach(() => {
  window.location.hash = "";
});

describe("CatalogTabs", () => {
  it("shows sentence cards and hides the letters tab while no letter has images", () => {
    const pending: Sign = { kind: "letter", slug: "v", order: 3, title: "В", steps: [] };
    window.location.hash = "#letters";
    render(<CatalogTabs sentences={[sentence]} letters={[pending]} />);
    expect(screen.getByRole("tab", { name: "Өгүүлбэр 1" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    expect(screen.queryByRole("tab", { name: /Үсэг/ })).not.toBeInTheDocument();
    const card = screen.getByRole("link", { name: /Сайн байна уу\?/ });
    expect(card).toHaveAttribute("href", "/sentence/sain-baina-uu");
    expect(card.querySelector("img")).not.toBeNull();
  });

  it("shows letters without images greyed out and not linked, with a coming-soon note", () => {
    const pending: Sign = { kind: "letter", slug: "v", order: 3, title: "В", steps: [] };
    render(<CatalogTabs sentences={[sentence]} letters={[...letters, pending]} />);
    fireEvent.click(screen.getByRole("tab", { name: "Үсэг 3" }));
    expect(screen.getByRole("link", { name: "А" })).toHaveAttribute("href", "/letter/a");
    expect(screen.getByText("В").closest("a")).toBeNull();
    expect(screen.getByText(/удахгүй/i)).toBeInTheDocument();
  });

  it("follows a later change of the hash to #letters", () => {
    render(<CatalogTabs sentences={[sentence]} letters={letters} />);
    act(() => {
      window.location.hash = "#letters";
      window.dispatchEvent(new HashChangeEvent("hashchange"));
    });
    expect(screen.getByRole("tab", { name: "Үсэг 2" })).toHaveAttribute("aria-selected", "true");
  });

  it("switches to the letters grid", () => {
    render(<CatalogTabs sentences={[sentence]} letters={letters} />);
    fireEvent.click(screen.getByRole("tab", { name: "Үсэг 2" }));
    expect(screen.getByRole("link", { name: /А/ })).toHaveAttribute("href", "/letter/a");
    expect(screen.queryByRole("link", { name: /Сайн байна уу\?/ })).not.toBeInTheDocument();
  });

  it("opens on the letters tab from #letters", () => {
    window.location.hash = "#letters";
    render(<CatalogTabs sentences={[sentence]} letters={letters} />);
    expect(screen.getByRole("tab", { name: "Үсэг 2" })).toHaveAttribute("aria-selected", "true");
  });
});
