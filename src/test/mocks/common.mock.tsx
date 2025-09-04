import { vi } from "vitest";
import React from "react";

export const mockReactRouterDom = {
  BrowserRouter: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="browser-router">{children}</div>
  ),
  useNavigate: () => vi.fn(),
  useLocation: () => ({ pathname: "/", state: null }),
  Navigate: ({ to }: { to: string }) => <div data-testid={`navigate-to-${to.replace("/", "")}`} />,
};

export const mockAppContext = {
  AppProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="app-provider">{children}</div>
  ),
  useAppContext: () => ({
    storedClasses: [],
    setStoredClasses: vi.fn(),
    currentWeekday: 1,
    setCurrentWeekday: vi.fn(),
  }),
};

export const mockLayoutComponents = {
  Header: () => <div data-testid="header">Header Component</div>,
  Footer: ({ calendarMessage, feedbackMessage }: any) => (
    <div data-testid="footer">
      <span data-testid="calendar-message">{calendarMessage}</span>
      <span data-testid="feedback-message">{feedbackMessage}</span>
    </div>
  ),
  MainLayout: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="main-layout">
      <div data-testid="header">Header</div>
      {children}
      <div data-testid="footer">Footer</div>
    </div>
  ),
};

export const mockPages = {
  App: () => <div data-testid="app-component">Mocked App Component</div>,
  AppRouter: () => <div data-testid="app-router">App Router Content</div>,
};

export const mockReactDOM = {
  default: {
    createRoot: vi.fn(() => ({
      render: vi.fn()
    }))
  }
};

export const mockStyles = () => ({});
