import { afterEach, describe, expect, it, vi } from "vitest";
import { siteUrl } from "./site";

afterEach(() => vi.unstubAllEnvs());

describe("siteUrl", () => {
  it("uses NEXT_PUBLIC_SITE_URL without a trailing slash", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "https://x.mn/");
    expect(siteUrl()).toBe("https://x.mn");
  });

  it("falls back to the Vercel production URL", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "msl.vercel.app");
    expect(siteUrl()).toBe("https://msl.vercel.app");
  });

  it("falls back to localhost", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    vi.stubEnv("VERCEL_PROJECT_PRODUCTION_URL", "");
    expect(siteUrl()).toBe("http://localhost:3000");
  });
});
