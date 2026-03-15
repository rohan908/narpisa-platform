import { render, screen } from "@testing-library/react";

import Home from "./page";

describe("Home page", () => {
  it("renders the source-led platform heading", () => {
    render(<Home />);

    expect(
      screen.getByRole("heading", {
        name: /source-led document intelligence for mineral value addition/i,
      }),
    ).toBeInTheDocument();
  });

  it("shows the storage model guidance", () => {
    render(<Home />);

    expect(
      screen.getByText(/source url plus attribution, no persistent pdf binaries/i),
    ).toBeInTheDocument();
  });
});
