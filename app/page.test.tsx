import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

// Async server pieces are covered by their own tests.
vi.mock("@/components/CommentsFeed", () => ({ CommentsFeed: () => null }));
vi.mock("@/app/actions/comments", () => ({ submitComment: vi.fn() }));
import Home from "./page";

const SOURCE =
  "https://www.sdgbeproject.mn/en/posts/today-is-the-international-day-of-sign-languages-according-to-2023-statistics-there-are-111228-people-with-disabilities-in-mongolia-including-7800-who-are-deaf";

describe("landing page", () => {
  it("uses the approved copy", () => {
    render(<Home />);
    expect(
      screen.getByRole("heading", { level: 1, name: "Дохионы хэл бол бас нэг хэл." }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Монголд 7,800 орчим сонсголгүй хүн бий. Тэд гараар ярьдаг, нүдээрээ сонсдог. Харин бидний ихэнх нь тэдэнтэй ярилцаж чаддаггүй.",
      ),
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Нэг үг сураад үзье." })).toBeInTheDocument();
    expect(screen.getByText("Та одоо нэг дохио мэддэг боллоо. 🙌")).toBeInTheDocument();
  });

  it("teaches the three steps of «Сайн байна уу?»", () => {
    render(<Home />);
    for (const caption of [
      "Баруун гарын алгаа нүүрнийхээ өмнө, нүдний түвшинд байрлуулна.",
      "Гараа доош буулгаж, алгаа цээжин дээрээ тавина.",
      "Алгаа дээш харуулан, гараа урагш хүн рүү сунгана.",
    ])
      expect(screen.getByText(caption, { selector: "p" })).toBeInTheDocument();
  });

  it("leads to the catalog and cites the source", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: "Цааш үзэх →" })).toHaveAttribute("href", "/learn");
    expect(screen.getByRole("link", { name: "Эх сурвалж: SDGBE төсөл, 2023" })).toHaveAttribute(
      "href",
      SOURCE,
    );
  });

  it("previews six sentences and links to all of them", () => {
    render(<Home />);
    const cards = screen
      .getAllByRole("link")
      .filter((a) => a.getAttribute("href")?.startsWith("/sentence/"));
    expect(cards).toHaveLength(6);
    expect(screen.getByRole("link", { name: "Бүгдийг үзэх (40) →" })).toHaveAttribute(
      "href",
      "/learn",
    );
  });

  it("has a comments section the header can jump to", () => {
    const { container } = render(<Home />);
    const section = container.querySelector("#comments");
    expect(section).not.toBeNull();
    expect(section).toHaveTextContent("Хүмүүс юу гэж хэлж байна");
  });
});
