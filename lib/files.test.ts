import { describe, expect, it } from "vitest";
import { publicFileExists } from "./files";

describe("publicFileExists", () => {
  it("finds a file with the exact name", () => {
    expect(publicFileExists("/signs/sain-baina-uu/step-1.png")).toBe(true);
  });

  it("rejects a name that differs only in letter case", () => {
    expect(publicFileExists("/signs/sain-baina-uu/Step-1.png")).toBe(false);
    expect(publicFileExists("/signs/Sain-baina-uu/step-1.png")).toBe(false);
  });

  it("rejects a missing file", () => {
    expect(publicFileExists("/signs/nope/step-1.png")).toBe(false);
  });
});
