import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home page", () => {
  it("renders the MINERAL DB heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /mineral\s+db/i,
      }),
    ).toBeInTheDocument();
  });

  it("renders the navigation bar with MineralDB brand", () => {
    render(<Home />);

    expect(screen.getByText("MineralDB")).toBeInTheDocument();
  });

  it("links to the database page from nav", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: /database/i }),
    ).toHaveAttribute("href", "/data_input");
  });
});
