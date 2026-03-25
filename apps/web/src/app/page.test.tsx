import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import Home from "./page";

vi.mock("@/components/halftone-hero", () => ({
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="halftone-hero">{children}</div>
  ),
}));

describe("Home page", () => {
  it("renders the current homepage heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /narpisa platform/i,
      }),
    ).toBeInTheDocument();
  });

  it("links to the pdf link tester page", () => {
    render(<Home />);

    const links = screen.getAllByRole("link", {
      name: /open pdf link tester/i,
    });
    expect(links[0]).toHaveAttribute("href", "/data_input");
  });
});
