import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent } from "../../test/utils/renderWithProviders";
import Footer from "./footer";

vi.mock("../warning/warning", () => ({
  default: ({ children, message, buttonLabel, onClickButton }: any) => (
    <div data-testid="warning-mock">
      <span data-testid="warning-message">{message}</span>
      <button data-testid="warning-button" onClick={onClickButton}>
        {buttonLabel}
      </button>
      {children}
    </div>
  ),
}));

vi.mock("../../../package.json", () => ({
  version: "2.4.0",
}));

const mockLocalStorage = {
  removeItem: vi.fn(),
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};

const mockLocation = {
  reload: vi.fn(),
};

Object.defineProperty(window, "localStorage", {
  value: mockLocalStorage,
});

Object.defineProperty(window, "location", {
  value: mockLocation,
});

describe("Footer Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe("Rendering and Structure", () => {
    it("should render footer with all components and proper structure", () => {
      const customProps = {
        calendarMessage: "Limpar Calendário",
        feedbackMessage: "Ajude-nos:",
        hasCredits: true,
      };

      render(<Footer {...customProps} />);

      const footer = screen.getByRole("contentinfo");
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass("footer");

      expect(screen.getByTestId("warning-mock")).toBeInTheDocument();
      expect(screen.getByTestId("warning-message")).toHaveTextContent(
        "Você tem certeza que quer apagar seu calendário?"
      );
      expect(screen.getByTestId("warning-button")).toHaveTextContent("sim");
      expect(screen.getByText(customProps.calendarMessage)).toHaveClass("footer__new-calendar");

      const feedbackSection = screen.getByText(/Ajude-nos:/).closest(".footer__feedback");
      expect(feedbackSection).toBeInTheDocument();
      expect(screen.getByTitle("feedback")).toHaveAttribute(
        "href",
        "https://docs.google.com/forms/d/e/1FAIpQLSfkVjykgXE8E3kBQETSRzgBIYWiNX0wNW0aL5av3yZbJN6bEw/viewform?usp=sf_link"
      );

      const creditsSection = screen.getByText("2.4.0").closest(".footer__credits");
      expect(creditsSection).toBeInTheDocument();
      expect(screen.getByTitle("github")).toHaveAttribute("href", "https://github.com/RafaelD-S");
    });

    it("should handle props correctly and render conditionally", () => {
      const { unmount: unmount1 } = render(<Footer hasCredits={false} />);
      expect(screen.queryByText("- Made By Rafael Dantas Silva")).not.toBeInTheDocument();
      expect(screen.getByText("2.4.0")).toBeInTheDocument();
      unmount1();

      const { unmount: unmount2 } = render(<Footer feedbackMessage="" />);
      expect(screen.getByText("Feedback")).toBeInTheDocument();
      unmount2();

      render(<Footer calendarMessage="Resetar" feedbackMessage="Opinião:" hasCredits={true} />);
      expect(screen.getByText("Resetar")).toBeInTheDocument();
      expect(screen.getByText(/Opinião:/)).toBeInTheDocument();
      expect(screen.getByText("Rafael Dantas Silva")).toBeInTheDocument();
    });
  });

  describe("Calendar Erase Functionality", () => {
    it("should clear localStorage and reload page when erase button is clicked", () => {
      render(<Footer />);

      const eraseButton = screen.getByTestId("warning-button");
      fireEvent.click(eraseButton);

      expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(2);
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("version");
      expect(mockLocalStorage.removeItem).toHaveBeenCalledWith("chosenClasses");
      expect(mockLocation.reload).toHaveBeenCalledTimes(1);
    });

    it("should handle multiple erase clicks correctly", () => {
      render(<Footer />);

      const eraseButton = screen.getByTestId("warning-button");

      fireEvent.click(eraseButton);
      fireEvent.click(eraseButton);

      expect(mockLocalStorage.removeItem).toHaveBeenCalledTimes(4);
      expect(mockLocation.reload).toHaveBeenCalledTimes(2);
    });
  });
});
