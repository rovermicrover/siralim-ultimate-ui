import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(
    /Welcome To The Siralim Ultimate Unofficial Codex/i
  );
  expect(linkElement).toBeInTheDocument();
});
