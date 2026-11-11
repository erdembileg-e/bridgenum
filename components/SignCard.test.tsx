import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { sentences } from "@/content/sentences";
import { SignCard } from "./SignCard";

describe("SignCard", () => {
  it("links to the sentence with its title and step count", () => {
    const sign = sentences.find((s) => s.slug === "bi-chamd-khairtai")!;
    render(<SignCard sign={sign} sizes="50vw" />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/sentence/bi-chamd-khairtai");
    expect(link).toHaveTextContent("Би чамд хайртай.");
    expect(screen.getByText(`${sign.steps.length} алхам`)).toBeInTheDocument();
  });
});
