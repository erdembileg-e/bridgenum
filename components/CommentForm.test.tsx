import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommentForm } from "./CommentForm";

const submitComment = vi.fn();
vi.mock("@/app/actions/comments", () => ({
  submitComment: (...args: unknown[]) => submitComment(...args),
}));

beforeEach(() => submitComment.mockReset());

function fill() {
  fireEvent.change(screen.getByLabelText("Сэтгэгдэл"), { target: { value: "Сайхан сайт" } });
  fireEvent.click(screen.getByRole("button", { name: "Илгээх" }));
}

describe("CommentForm", () => {
  it("has an optional name, a required message and a hidden honeypot", () => {
    const { container } = render(<CommentForm />);
    const name = screen.getByLabelText("Нэр (заавал биш)");
    expect(name).not.toBeRequired();
    expect(name).toHaveAttribute("maxLength", "40");
    const body = screen.getByLabelText("Сэтгэгдэл");
    expect(body).toBeRequired();
    expect(body).toHaveAttribute("maxLength", "500");
    const trap = container.querySelector('input[name="website"]');
    expect(trap).toHaveAttribute("tabIndex", "-1");
    expect(trap).toHaveAttribute("autoComplete", "off");
  });

  it("disables the button while sending", async () => {
    let finish: (value: unknown) => void = () => {};
    submitComment.mockReturnValue(new Promise((resolve) => (finish = resolve)));
    render(<CommentForm />);
    fill();
    await waitFor(() => expect(screen.getByRole("button", { name: /Илгээж/ })).toBeDisabled());
    finish({ status: "sent" });
    expect(await screen.findByRole("button", { name: "Илгээх" })).toBeEnabled();
  });

  it("thanks the visitor once sent", async () => {
    submitComment.mockResolvedValue({ status: "sent" });
    render(<CommentForm />);
    fill();
    expect(
      await screen.findByText("Баярлалаа! Таны сэтгэгдлийг удахгүй нийтэлнэ."),
    ).toBeInTheDocument();
  });

  it("says when comments are closed", async () => {
    submitComment.mockResolvedValue({ status: "closed" });
    render(<CommentForm />);
    fill();
    expect(await screen.findByText("Сэтгэгдэл одоогоор хаалттай байна.")).toBeInTheDocument();
  });

  it("shows the error message", async () => {
    submitComment.mockResolvedValue({ status: "error", message: "Сэтгэгдэл хэт богино байна." });
    render(<CommentForm />);
    fill();
    expect(await screen.findByText("Сэтгэгдэл хэт богино байна.")).toBeInTheDocument();
  });

  it("keeps what the visitor typed when sending fails", async () => {
    submitComment.mockResolvedValue({
      status: "error",
      message: "Түр хүлээгээд дахин оролдоорой.",
      values: { name: "Бат", body: "Сайхан сайт" },
    });
    render(<CommentForm />);
    fireEvent.change(screen.getByLabelText("Нэр (заавал биш)"), { target: { value: "Бат" } });
    fill();
    await screen.findByText("Түр хүлээгээд дахин оролдоорой.");
    expect(screen.getByLabelText("Сэтгэгдэл")).toHaveValue("Сайхан сайт");
    expect(screen.getByLabelText("Нэр (заавал биш)")).toHaveValue("Бат");
  });

  it("clears the form once sent", async () => {
    submitComment.mockResolvedValue({ status: "sent" });
    render(<CommentForm />);
    fill();
    await screen.findByText("Баярлалаа! Таны сэтгэгдлийг удахгүй нийтэлнэ.");
    expect(screen.getByLabelText("Сэтгэгдэл")).toHaveValue("");
  });
});
