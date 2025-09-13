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

export const commonTestData = {
  classNames: {
    algorithms: "Algoritmos",
    programming: "Programação I",
    database: "Banco de Dados",
    math: "Matemática",
    chemistry: "Química",
    physics: "Física",
    clickable: "Clickable",
    multiClick: "Multi Click",
    empty: "Empty Title Test"
  },
  teachers: {
    silva: "Prof. Silva",
    santos: "Prof. Santos",
    oliveira: "Prof. Oliveira"
  },
  classrooms: {
    lab1: "Lab 1",
    lab2: "Lab 2", 
    lab3: "Lab 3",
    sala201: "Sala 201",
    sala202: "Sala 202"
  },
  periods: {
    morning1: ["08:00", "09:40"],
    morning2: ["10:00", "11:40"],
    afternoon1: ["14:00", "15:40"],
    afternoon2: ["16:00", "17:40"],
    evening1: ["17:00", "18:40"],
    evening2: ["19:30", "21:10"]
  },
  weekdays: {
    monday: "Segunda-feira",
    tuesday: "Terça-feira",
    wednesday: "Quarta-feira",
    thursday: "Quinta-feira",
    friday: "Sexta-feira",
    saturday: "Sábado"
  }
};
