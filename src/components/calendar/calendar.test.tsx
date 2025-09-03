import { describe, it, expect } from "vitest";
import { render, screen } from "../../test/utils/renderWithProviders";
import { Calendar } from "./calendar";
import { 
  mockCalendarProps,
  mockCalendarPropsWithTeacher,
  mockCalendarPropsWithDescription,
  mockCalendarPropsWithWeekend,
  mockCalendarPropsWithConflicts,
  mockCalendarPropsWithExtended,
  mockEmptyCalendarProps,
  mockMultipleConflicts,
  mockGreveProps,
  mockUnsortedProps,
  mockEmptyProps,
  mockWithMissingInfo
} from "../../test/mocks/calendar.mock";

describe("Calendar Component", () => {
  describe("Rendering", () => {
    it("should render calendar with basic structure and time periods", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const calendar = container.querySelector(".calendar");
      expect(calendar).toHaveClass("calendar");
      
      const calendarContainer = container.querySelector(".calendar__container");
      expect(calendarContainer).toHaveClass("calendar__container");
      
      const periodContainer = container.querySelector(".calendar__period");
      expect(periodContainer).toHaveClass("calendar__period");
      
      expect(screen.getByText("17h")).toBeInTheDocument();
      expect(screen.getAllByText("17h50").length).toBeGreaterThan(0);
      expect(screen.getAllByText("18h40").length).toBeGreaterThan(0);
      expect(screen.getAllByText("19h30").length).toBeGreaterThan(0);
      expect(screen.getAllByText("20h20").length).toBeGreaterThan(0);
      expect(screen.getAllByText("21h10").length).toBeGreaterThan(0);
      expect(screen.getByText("22h")).toBeInTheDocument();
      
      expect(screen.getAllByText("Matemática Básica").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Programação I").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Lab 01").length).toBeGreaterThan(0);
      expect(screen.getAllByText("Lab 02").length).toBeGreaterThan(0);
      
      const periodDays = container.querySelectorAll(".calendar__period__day");
      expect(periodDays.length).toBeGreaterThan(0);
      
      const classInfo = container.querySelectorAll(".calendar__class__info");
      expect(classInfo.length).toBeGreaterThan(0);
      
      const classItems = container.querySelectorAll(".calendar__class__info-item");
      expect(classItems.length).toBeGreaterThan(0);
    });

    it("should handle different display modes and edge cases", () => {
      render(<Calendar {...mockCalendarPropsWithTeacher} />);
      expect(screen.getAllByText("Prof. João Silva").length).toBeGreaterThan(0);
      
      render(<Calendar {...mockCalendarPropsWithDescription} />);
      expect(screen.getAllByText(/Aula de/).length).toBeGreaterThan(0);
      
      render(<Calendar {...mockEmptyCalendarProps} />);
      expect(screen.getAllByText("Vazio").length).toBeGreaterThan(0);
      
      const { container: emptyContainer } = render(<Calendar {...mockEmptyProps} />);
      expect(screen.getAllByText("17h").length).toBeGreaterThan(0);
      const dayClasses = emptyContainer.querySelectorAll(".calendar__class");
      expect(dayClasses.length).toBe(0);
      
      render(<Calendar {...mockWithMissingInfo} />);
      expect(screen.getByText("-----")).toBeInTheDocument();
    });
  });

  describe("Special Features", () => {
    it("should handle weekend filtering, conflicts, and special states", () => {
      render(<Calendar {...mockCalendarPropsWithWeekend} />);
      expect(screen.queryByText("Sábado")).not.toBeInTheDocument();
      expect(screen.queryByText("Domingo")).not.toBeInTheDocument();
      expect(screen.getByText("Segunda")).toBeInTheDocument();
      
      const { container: conflictContainer } = render(<Calendar {...mockCalendarPropsWithConflicts} />);
      const classItems = screen.getAllByText(/Matemática|Química/);
      expect(classItems.length).toBeGreaterThan(1);
      const fullItems = conflictContainer.querySelectorAll(".calendar__class__info-item--full");
      expect(fullItems.length).toBeGreaterThan(0);
      
      render(<Calendar {...mockMultipleConflicts} />);
      expect(screen.getAllByText("... mais 1").length).toBeGreaterThan(0);
      
      render(<Calendar {...mockCalendarPropsWithExtended} />);
      const extendedClass = screen.getAllByText("Banco de Dados");
      expect(extendedClass.length).toBeGreaterThan(1);
      
      render(<Calendar {...mockUnsortedProps} />);
      const timeElements = screen.getAllByText(/^\d{2}h/);
      expect(timeElements.length).toBeGreaterThan(0);
      expect(screen.getByText("História")).toBeInTheDocument();
      expect(screen.getByText("Matemática")).toBeInTheDocument();
      expect(screen.getByText("Física")).toBeInTheDocument();
    });

    it("should handle strike (greve) display and CSS classes", () => {
      const { container } = render(<Calendar {...mockGreveProps} />);
      
      const greveElements = screen.getAllByText("GREVE");
      expect(greveElements.length).toBeGreaterThan(0);
      
      const greveCSS = container.querySelectorAll(".calendar__class__info-item--greve");
      expect(greveCSS.length).toBeGreaterThan(0);
    });
  });

  describe("CSS Classes and Structure", () => {
    it("should apply day-specific and state-specific CSS classes", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const segundaClass = container.querySelector(".calendar__class--Segunda");
      expect(segundaClass).toBeInTheDocument();
      
      const tercaClass = container.querySelector(".calendar__class--Terça");
      expect(tercaClass).toBeInTheDocument();
      
      const emptyItems = container.querySelectorAll(".calendar__class__info-item--empty");
      expect(emptyItems.length).toBeGreaterThan(0);
    });
  });

  describe("Integration", () => {
    it("should forward ref correctly", () => {
      const ref = { current: null as HTMLDivElement | null };
      
      render(<Calendar {...mockCalendarProps} ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass("calendar");
    });
  });
});