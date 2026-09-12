import { expect, it } from "vitest";
import { render, screen } from "../../test/utils/renderWithProviders";
import Header from "./header";

it("renders the application title and home link", () => {
  render(<Header />);

  expect(screen.getByRole("heading", { name: "Que Aula?" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Que Aula?" })).toHaveAttribute("href", "/");
});

it("renders the weekday navigation closed by default", () => {
  render(<Header />);

  expect(screen.getByRole("button", { name: /Dias da Semana/i })).toBeInTheDocument();
  expect(screen.queryByRole("link", { name: "Segunda-feira" })).not.toBeInTheDocument();
});
