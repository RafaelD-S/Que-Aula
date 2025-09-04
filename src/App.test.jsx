import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

vi.mock("./context/AppContext", () => ({
  AppProvider: ({ children }) => (
    <div data-testid="app-provider">{children}</div>
  ),
}));

vi.mock("./routes/AppRouter", () => ({
  default: () => <div data-testid="app-router">App Router Content</div>,
}));

vi.mock("react-router-dom", () => ({
  BrowserRouter: ({ children }) => (
    <div data-testid="browser-router">{children}</div>
  ),
}));

vi.mock("./style/GlobalStyle.scss", () => ({}));

describe("App Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Rendering and Structure", () => {
    it("should render the App component without errors", () => {
      render(<App />);
      
      expect(screen.getByTestId("browser-router")).toBeInTheDocument();
      expect(screen.getByTestId("app-provider")).toBeInTheDocument();
      expect(screen.getByTestId("app-router")).toBeInTheDocument();
    });

    it("should maintain correct component hierarchy", () => {
      render(<App />);
      
      const browserRouter = screen.getByTestId("browser-router");
      const appProvider = screen.getByTestId("app-provider");
      const appRouter = screen.getByTestId("app-router");
      
      expect(browserRouter).toBeInTheDocument();
      expect(browserRouter).toContainElement(appProvider);
      expect(appProvider).toContainElement(appRouter);
    });

    it("should render AppRouter content correctly", () => {
      render(<App />);
      
      expect(screen.getByText("App Router Content")).toBeInTheDocument();
    });
  });

  describe("Provider Integration", () => {
    it("should wrap components with AppProvider context", () => {
      render(<App />);
      
      const appProvider = screen.getByTestId("app-provider");
      expect(appProvider).toBeInTheDocument();
      expect(appProvider).toContainElement(screen.getByTestId("app-router"));
    });

    it("should initialize BrowserRouter for routing functionality", () => {
      render(<App />);
      
      const browserRouter = screen.getByTestId("browser-router");
      expect(browserRouter).toBeInTheDocument();
      
      expect(browserRouter).toContainElement(screen.getByTestId("app-provider"));
      expect(browserRouter).toContainElement(screen.getByTestId("app-router"));
    });
  });

  describe("Component Composition", () => {
    it("should compose all required providers and router correctly", () => {
      const { container } = render(<App />);
      
      expect(container.firstChild).toHaveAttribute("data-testid", "browser-router");
      
      const browserRouter = container.firstChild;
      const appProvider = browserRouter.firstChild;
      
      expect(appProvider).toHaveAttribute("data-testid", "app-provider");
      expect(appProvider.firstChild).toHaveAttribute("data-testid", "app-router");
    });

    it("should not render any unexpected elements", () => {
      const { container } = render(<App />);
      
      const browserRouter = screen.getByTestId("browser-router");
      const appProvider = screen.getByTestId("app-provider");
      const appRouter = screen.getByTestId("app-router");
      
      expect(container.children).toHaveLength(1);
      expect(browserRouter.children).toHaveLength(1);
      expect(appProvider.children).toHaveLength(1);
      expect(appRouter).toBeInTheDocument();
    });
  });
});
