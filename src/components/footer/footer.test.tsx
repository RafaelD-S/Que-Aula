import { describe, expect, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "../../test/utils/renderWithProviders";
import Footer from "./footer";

beforeEach(() => {
  localStorage.clear();
});

describe("Footer", () => {
  it("renders feedback, credits and the calendar action", () => {
    render(<Footer feedbackMessage="Envie seu" />);

    expect(screen.getByText("Envie seu", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Made By")).toBeInTheDocument();
    expect(screen.getByText("Rafael Dantas Silva")).toBeInTheDocument();
    expect(screen.getByText("Apagar calendário")).toBeInTheDocument();
  });

  it("supports custom text and hiding credits", () => {
    render(<Footer calendarMessage="Novo calendário" hasCredits={false} />);

    expect(screen.getByText("Novo calendário")).toBeInTheDocument();
    expect(screen.queryByText("Made By")).not.toBeInTheDocument();
    expect(screen.queryByText("Rafael Dantas Silva")).not.toBeInTheDocument();
  });

  it("opens the confirmation and erases the saved calendar", () => {
    localStorage.setItem("version", "1");
    localStorage.setItem("SelectedClasses", "[]");
    render(<Footer />);

    fireEvent.click(screen.getByText("Apagar calendário"));
    expect(
      screen.getByText("Você tem certeza que quer apagar seu calendário?"),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "sim" }));
    expect(localStorage.getItem("version")).toBeNull();
    expect(localStorage.getItem("SelectedClasses")).toBeNull();
  });

  it("renders the external feedback link", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Feedback" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "Feedback" })).toHaveAttribute(
      "href",
      expect.stringContaining("docs.google.com"),
    );
  });
});
