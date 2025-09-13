import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import MainLayout from "./MainLayout";

vi.mock("../footer/footer", () => ({
  default: ({ calendarMessage, feedbackMessage }: any) => (
    <div data-testid="footer">
      <span data-testid="calendar-message">{calendarMessage}</span>
      <span data-testid="feedback-message">{feedbackMessage}</span>
    </div>
  )
}));

vi.mock("../header/header", () => ({
  default: () => <div data-testid="header">Header Component</div>
}));

describe("MainLayout Component", () => {
  describe("Component Structure and Integration", () => {
    it("should render all components with correct props and hierarchy", () => {
      const { container } = render(
        <MainLayout>
          <div data-testid="test-content">Test Content</div>
        </MainLayout>
      );

      const header = screen.getByTestId("header");
      const content = screen.getByTestId("test-content");
      const footer = screen.getByTestId("footer");

      expect(header).toBeInTheDocument();
      expect(content).toBeInTheDocument();
      expect(footer).toBeInTheDocument();
      expect(screen.getByTestId("calendar-message")).toHaveTextContent("Criar um novo calendário");
      expect(screen.getByTestId("feedback-message")).toHaveTextContent("Achou algo ou quer dar uma sugestão?");

      const containerHTML = container.innerHTML;
      const headerPosition = containerHTML.indexOf('data-testid="header"');
      const contentPosition = containerHTML.indexOf('data-testid="test-content"');
      const footerPosition = containerHTML.indexOf('data-testid="footer"');

      expect(headerPosition).toBeLessThan(contentPosition);
      expect(contentPosition).toBeLessThan(footerPosition);
    });

    it("should handle different children types correctly", () => {
      render(<MainLayout />);
      expect(screen.getByTestId("header")).toBeInTheDocument();
      expect(screen.getByTestId("footer")).toBeInTheDocument();

      const { rerender } = render(<MainLayout><span>Simple child</span></MainLayout>);
      expect(screen.getByText("Simple child")).toBeInTheDocument();

      rerender(
        <MainLayout>
          <h1>Title</h1>
          <p>Content</p>
        </MainLayout>
      );
      expect(screen.getByRole("heading")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });
  });

  describe("Layout Structure", () => {
    it("should maintain React Fragment structure without extra wrappers", () => {
      const { container } = render(
        <MainLayout>
          <main>Main content</main>
        </MainLayout>
      );

      const directChildren = Array.from(container.children);
      expect(directChildren.length).toBeGreaterThan(0);
      
      expect(screen.getByRole("main")).toBeInTheDocument();
      expect(screen.getByText("Main content")).toBeInTheDocument();
    });
  });
});
