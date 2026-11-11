import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Comment } from "@/lib/comments/rules";
import { CommentList } from "./CommentList";

const comment = (over: Partial<Comment>): Comment => ({
  id: "1",
  name: "Сараа",
  body: "Хүүхэдтэйгээ хамт сурлаа!",
  createdAt: "2026-11-07T00:00:00Z",
  approvedAt: "2026-11-07T01:00:00Z",
  ...over,
});

describe("CommentList", () => {
  it("shows each comment with its name, or «Зочин» without one", () => {
    render(<CommentList comments={[comment({}), comment({ id: "2", name: null, body: "Гоё" })]} />);
    expect(screen.getByText("Сараа")).toBeInTheDocument();
    expect(screen.getByText("Хүүхэдтэйгээ хамт сурлаа!")).toBeInTheDocument();
    expect(screen.getByText("Зочин")).toBeInTheDocument();
  });

  it("shows HTML as plain text", () => {
    render(<CommentList comments={[comment({ body: "<b>hi</b>" })]} />);
    expect(screen.getByText("<b>hi</b>")).toBeInTheDocument();
  });

  it("shows all comments in one sliding row", () => {
    render(<CommentList comments={[comment({}), comment({ id: "2" }), comment({ id: "3" })]} />);
    const row = screen.getByRole("list", { name: "Сэтгэгдлүүд" });
    expect(row).toHaveClass("flex", "overflow-x-auto");
    expect(screen.getAllByRole("listitem")).toHaveLength(3);
  });

  describe("when the text is taller than six lines", () => {
    // jsdom has no layout, so fake a body whose full text is taller than its clamped box.
    beforeEach(() => {
      vi.spyOn(HTMLElement.prototype, "scrollHeight", "get").mockReturnValue(300);
      vi.spyOn(HTMLElement.prototype, "clientHeight", "get").mockReturnValue(150);
    });
    afterEach(() => vi.restoreAllMocks());

    it("shortens the comment until «Цааш унших» is pressed", () => {
      render(<CommentList comments={[comment({ body: "а".repeat(300) })]} />);
      const body = screen.getByText("а".repeat(300));
      expect(body).toHaveClass("line-clamp-6");
      fireEvent.click(screen.getByRole("button", { name: "Цааш унших" }));
      expect(body).not.toHaveClass("line-clamp-6");
      fireEvent.click(screen.getByRole("button", { name: "Хураах" }));
      expect(body).toHaveClass("line-clamp-6");
    });
  });

  describe("auto-slide", () => {
    const scrollBy = vi.fn();

    function stubBrowser({ reduceMotion }: { reduceMotion: boolean }) {
      vi.useFakeTimers();
      vi.stubGlobal("matchMedia", () => ({ matches: reduceMotion }));
      vi.stubGlobal(
        "IntersectionObserver",
        class {
          constructor(private callback: IntersectionObserverCallback) {}
          observe() {
            this.callback([{ isIntersecting: true } as IntersectionObserverEntry], this as never);
          }
          disconnect() {}
        },
      );
      // A row wider than its window, scrolled to the start.
      vi.spyOn(HTMLElement.prototype, "scrollWidth", "get").mockReturnValue(1000);
      vi.spyOn(HTMLElement.prototype, "clientWidth", "get").mockReturnValue(300);
      HTMLElement.prototype.scrollBy = scrollBy;
    }

    afterEach(() => {
      vi.useRealTimers();
      vi.unstubAllGlobals();
      vi.restoreAllMocks();
      scrollBy.mockReset();
    });

    it("glides one card to the right every few seconds", () => {
      stubBrowser({ reduceMotion: false });
      render(<CommentList comments={[comment({}), comment({ id: "2" })]} />);
      vi.advanceTimersByTime(4500);
      expect(scrollBy).toHaveBeenCalledTimes(1);
      expect(scrollBy).toHaveBeenCalledWith(expect.objectContaining({ behavior: "smooth" }));
    });

    it("stays still for people who turned on reduced motion", () => {
      stubBrowser({ reduceMotion: true });
      render(<CommentList comments={[comment({}), comment({ id: "2" })]} />);
      vi.advanceTimersByTime(20000);
      expect(scrollBy).not.toHaveBeenCalled();
    });

    it("waits while someone is touching the row", () => {
      stubBrowser({ reduceMotion: false });
      render(<CommentList comments={[comment({}), comment({ id: "2" })]} />);
      fireEvent.pointerDown(screen.getByRole("list", { name: "Сэтгэгдлүүд" }));
      vi.advanceTimersByTime(4500);
      expect(scrollBy).not.toHaveBeenCalled();
    });
  });

  it("offers no «Цааш унших» when the comment already fits", () => {
    render(<CommentList comments={[comment({})]} />);
    expect(screen.queryByRole("button", { name: "Цааш унших" })).not.toBeInTheDocument();
  });

  it("invites the first comment when there are none", () => {
    render(<CommentList comments={[]} />);
    expect(screen.getByText("Эхний сэтгэгдлийг та үлдээгээрэй 🙌")).toBeInTheDocument();
  });
});
