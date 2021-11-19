import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../pages/Home";

describe("Home page test cases", () => {
  it("Render snapshot to be expected", () => {
    expect(<Home />).toMatchSnapshot();
  });
  it("should show a button", () => {
    render(<Home />);
    expect(screen.getByRole("button", { name: "Submit" }));
  });
});
