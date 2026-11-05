import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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
});
