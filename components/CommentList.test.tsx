import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
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

  it("invites the first comment when there are none", () => {
    render(<CommentList comments={[]} />);
    expect(screen.getByText("Эхний сэтгэгдлийг та үлдээгээрэй 🙌")).toBeInTheDocument();
  });
});
