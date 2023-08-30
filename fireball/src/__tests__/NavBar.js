//npm t -- --environment=jsdom  // to run on browser-like environment
import React from "react";
import { render, screen } from "@testing-library/react";
import { test, expect } from "vitest";
import Navbar from "../components/layout/Navbar";
import userEvent from "@testing-library/user-event";

// import "@testing-library/jest-dom";

// test("should first", () => {
//   const user = userEvent.setup();
//   render(<Navbar headerHeight={100} />);

//   const titleElement = screen.getByRole("heading");
//   expect(titleElement).toBeInTheDocument();
// });

test("renders without errors", () => {
  render(<Navbar headerHeight={100} />);

  // Assert that the component renders without errors
  expect(screen.getByTestId("navbar")).toBeInTheDocument();
});
