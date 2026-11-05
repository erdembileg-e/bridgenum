import { describe, expect, it } from "vitest";
import { move } from "./story";

describe("move", () => {
  it("goes to the next step", () => {
    expect(move(0, 3, 1, true, true)).toEqual({ type: "step", index: 1 });
  });

  it("goes to the next sign after the last step", () => {
    expect(move(2, 3, 1, true, true)).toEqual({ type: "next-sign" });
  });

  it("finishes after the last step of the last sign", () => {
    expect(move(2, 3, 1, false, true)).toEqual({ type: "finished" });
  });

  it("goes to the previous sign from the first step", () => {
    expect(move(0, 3, -1, true, true)).toEqual({ type: "prev-sign" });
  });

  it("stays on the first step when there is no previous sign", () => {
    expect(move(0, 3, -1, true, false)).toEqual({ type: "step", index: 0 });
  });

  it("goes back a step", () => {
    expect(move(2, 3, -1, true, true)).toEqual({ type: "step", index: 1 });
  });
});
