import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Sign } from "@/lib/signs";
import { StoryViewer } from "./StoryViewer";

const push = vi.fn();
vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const sign: Sign = {
  kind: "sentence",
  slug: "sain-baina-uu",
  order: 1,
  title: "Сайн байна уу?",
  steps: [
    { image: "/signs/sain-baina-uu/step-1.png", caption: "Алхам нэг" },
    { image: "/signs/sain-baina-uu/step-2.png", caption: "Алхам хоёр" },
    { image: "/signs/sain-baina-uu/step-3.png", caption: "Алхам гурав" },
  ],
};

function renderViewer(props: Partial<Parameters<typeof StoryViewer>[0]> = {}) {
  return render(
    <StoryViewer
      sign={sign}
      position={1}
      count={40}
      nextHref="/sentence/next"
      prevHref="/sentence/prev"
      closeHref="/learn"
      {...props}
    />,
  );
}

const right = () => fireEvent.keyDown(window, { key: "ArrowRight" });
const left = () => fireEvent.keyDown(window, { key: "ArrowLeft" });

beforeEach(() => push.mockReset());

describe("StoryViewer", () => {
  it("shows the first step with its progress", () => {
    renderViewer();
    expect(screen.getByRole("heading", { name: "Сайн байна уу?" })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Алхам нэг" })).toBeInTheDocument();
    expect(screen.getByText("Алхам нэг", { selector: "p" })).toBeInTheDocument();
    expect(screen.getByText("1 / 40")).toBeInTheDocument();
    const bars = screen.getAllByTestId("progress-bar");
    expect(bars).toHaveLength(3);
    expect(bars[0]).toHaveAttribute("aria-current", "step");
    expect(bars[1]).not.toHaveAttribute("aria-current");
  });

  it("advances with the forward tap zone and the right arrow", () => {
    renderViewer();
    fireEvent.click(screen.getByRole("button", { name: "Дараах" }));
    expect(screen.getByText("Алхам хоёр", { selector: "p" })).toBeInTheDocument();
    right();
    expect(screen.getByText("Алхам гурав", { selector: "p" })).toBeInTheDocument();
  });

  it("pushes the next sign after the last step", () => {
    renderViewer();
    right();
    right();
    right();
    expect(push).toHaveBeenCalledWith("/sentence/next");
  });

  it("offers the catalog after the last step of the last sign", () => {
    renderViewer({ nextHref: null });
    right();
    right();
    right();
    expect(push).not.toHaveBeenCalled();
    expect(screen.getByRole("link", { name: "Бүх дохиог үзэх" })).toHaveAttribute(
      "href",
      "/learn",
    );
  });

  it("pushes the previous sign from the first step", () => {
    renderViewer();
    left();
    expect(push).toHaveBeenCalledWith("/sentence/prev");
  });

  it("goes back a step with the back tap zone", () => {
    renderViewer();
    right();
    fireEvent.click(screen.getByRole("button", { name: "Өмнөх" }));
    expect(screen.getByText("Алхам нэг", { selector: "p" })).toBeInTheDocument();
  });

  it("advances on a left swipe and ignores vertical drags", () => {
    renderViewer();
    const stage = screen.getByTestId("story-stage");
    fireEvent.pointerDown(stage, { clientX: 300, clientY: 300 });
    fireEvent.pointerUp(stage, { clientX: 300, clientY: 100 });
    expect(screen.getByText("Алхам нэг", { selector: "p" })).toBeInTheDocument();
    fireEvent.pointerDown(stage, { clientX: 300, clientY: 300 });
    fireEvent.pointerUp(stage, { clientX: 200, clientY: 310 });
    expect(screen.getByText("Алхам хоёр", { selector: "p" })).toBeInTheDocument();
  });

  it("preloads the next step at the size the stage shows", () => {
    const { container } = renderViewer();
    const shown = screen.getByRole("img", { name: "Алхам нэг" });
    const preload = [...container.querySelectorAll("img")].find((img) =>
      img.getAttribute("src")?.includes("step-2"),
    );
    expect(preload).toBeDefined();
    expect(preload?.getAttribute("sizes")).toBe(shown.getAttribute("sizes"));
  });

  it("links the close button to the catalog", () => {
    renderViewer();
    expect(screen.getByRole("link", { name: "Хаах" })).toHaveAttribute("href", "/learn");
  });
});
