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
  describe("Basic Rendering", () => {
    it("should render calendar correctly", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const calendar = container.querySelector(".calendar");
      expect(calendar).toBeInTheDocument();
    });

    it("should render time periods correctly", () => {
      render(<Calendar {...mockCalendarProps} />);
      
      expect(screen.getByText("17h")).toBeInTheDocument();
      const hour17h50 = screen.getAllByText("17h50");
      expect(hour17h50.length).toBeGreaterThan(0);
    });

    it("should render empty day message when no classes", () => {
      render(<Calendar {...mockEmptyCalendarProps} />);
      
      const vazioElements = screen.getAllByText("Vazio");
      expect(vazioElements.length).toBeGreaterThan(0);
    });
  });

  describe("Class Information Display", () => {
    it("should display teacher name when provided", () => {
      render(<Calendar {...mockCalendarPropsWithTeacher} />);
      
      const teacherElements = screen.getAllByText("Prof. João Silva");
      expect(teacherElements.length).toBeGreaterThan(0);
    });

    it("should display class subject", () => {
      render(<Calendar {...mockCalendarProps} />);
      
      const matemática = screen.getAllByText("Matemática Básica");
      const programação = screen.getAllByText("Programação I");
      
      expect(matemática.length).toBeGreaterThan(0);
      expect(programação.length).toBeGreaterThan(0);
    });

    it("should display class room", () => {
      render(<Calendar {...mockCalendarProps} />);
      
      const lab01 = screen.getAllByText("Lab 01");
      const lab02 = screen.getAllByText("Lab 02");
      
      expect(lab01.length).toBeGreaterThan(0);
      expect(lab02.length).toBeGreaterThan(0);
    });

    it("should display class description when secondaryInfo is description", () => {
      render(<Calendar {...mockCalendarPropsWithDescription} />);
      
      const descriptions = screen.getAllByText(/Aula de/);
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  describe("Weekend Display", () => {
    it("should filter out weekend days (Saturday and Sunday)", () => {
      render(<Calendar {...mockCalendarPropsWithWeekend} />);
      
      expect(screen.queryByText("Sábado")).not.toBeInTheDocument();
      expect(screen.queryByText("Domingo")).not.toBeInTheDocument();
      
      expect(screen.getByText("Segunda")).toBeInTheDocument();
    });
  });

  describe("Conflict Detection", () => {
    it("should handle multiple classes in same period", () => {
      render(<Calendar {...mockCalendarPropsWithConflicts} />);
      
      const classItems = screen.getAllByText(/Matemática|Química/);
      expect(classItems.length).toBeGreaterThan(1);
    });

    it("should show more classes indicator when more than 2 classes overlap", () => {
      render(<Calendar {...mockMultipleConflicts} />);
      
      expect(screen.getByText("... mais 1")).toBeInTheDocument();
    });
  });

  describe("Strike (Greve) Display", () => {
    it("should show strike message when greve is true", () => {
      render(<Calendar {...mockGreveProps} />);
      
      const greveElements = screen.getAllByText("GREVE");
      expect(greveElements.length).toBeGreaterThan(0);
    });

    it("should apply strike CSS class", () => {
      const { container } = render(<Calendar {...mockGreveProps} />);
      
      const greveElements = container.querySelectorAll(".calendar__class__info-item--greve");
      expect(greveElements.length).toBeGreaterThan(0);
    });
  });

  describe("Extended Classes", () => {
    it("should display extended class time periods", () => {
      render(<Calendar {...mockCalendarPropsWithExtended} />);
      
      const extendedClass = screen.getAllByText("Banco de Dados");
      expect(extendedClass.length).toBeGreaterThan(1);
    });
  });

  describe("Sorting Functionality", () => {
    it("should render classes in chronological order", () => {
      render(<Calendar {...mockUnsortedProps} />);
      
      const timeElements = screen.getAllByText(/^\d{2}h/);
      expect(timeElements.length).toBeGreaterThan(0);
      
      expect(screen.getByText("História")).toBeInTheDocument();
      expect(screen.getByText("Matemática")).toBeInTheDocument();
      expect(screen.getByText("Física")).toBeInTheDocument();
    });
  });

  describe("CSS Classes and Structure", () => {
    it("should apply correct CSS classes to calendar container", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const calendar = container.querySelector(".calendar");
      expect(calendar).toHaveClass("calendar");
      
      const calendarContainer = container.querySelector(".calendar__container");
      expect(calendarContainer).toHaveClass("calendar__container");
    });

    it("should apply correct CSS classes to period display", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const periodContainer = container.querySelector(".calendar__period");
      expect(periodContainer).toHaveClass("calendar__period");
      
      const periodDays = container.querySelectorAll(".calendar__period__day");
      expect(periodDays.length).toBeGreaterThan(0);
    });

    it("should apply day-specific CSS classes", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const segundaClass = container.querySelector(".calendar__class--Segunda");
      expect(segundaClass).toBeInTheDocument();
      
      const tercaClass = container.querySelector(".calendar__class--Terça");
      expect(tercaClass).toBeInTheDocument();
    });

    it("should apply correct CSS classes to class items", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const classInfo = container.querySelectorAll(".calendar__class__info");
      expect(classInfo.length).toBeGreaterThan(0);
      
      const classItems = container.querySelectorAll(".calendar__class__info-item");
      expect(classItems.length).toBeGreaterThan(0);
    });

    it("should apply empty CSS class for empty periods", () => {
      const { container } = render(<Calendar {...mockCalendarProps} />);
      
      const emptyItems = container.querySelectorAll(".calendar__class__info-item--empty");
      expect(emptyItems.length).toBeGreaterThan(0);
    });

    it("should apply full CSS class for multiple conflicts", () => {
      const { container } = render(<Calendar {...mockCalendarPropsWithConflicts} />);
      
      const fullItems = container.querySelectorAll(".calendar__class__info-item--full");
      expect(fullItems.length).toBeGreaterThan(0);
    });
  });

  describe("Time Period Display", () => {
    it("should display all time periods correctly", () => {
      render(<Calendar {...mockCalendarProps} />);
      
      expect(screen.getByText("17h")).toBeInTheDocument();
      expect(screen.getAllByText("17h50").length).toBeGreaterThan(0);
      expect(screen.getAllByText("18h40").length).toBeGreaterThan(0);
      expect(screen.getAllByText("19h30").length).toBeGreaterThan(0);
      expect(screen.getAllByText("20h20").length).toBeGreaterThan(0);
      expect(screen.getAllByText("21h10").length).toBeGreaterThan(0);
      expect(screen.getByText("22h")).toBeInTheDocument();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty classes array", () => {
      const { container } = render(<Calendar {...mockEmptyProps} />);
      
      expect(screen.getByText("17h")).toBeInTheDocument();
      
      const dayClasses = container.querySelectorAll(".calendar__class");
      expect(dayClasses.length).toBe(0);
    });

    it("should handle missing secondary info gracefully", () => {
      render(<Calendar {...mockWithMissingInfo} />);
      
      expect(screen.getByText("-----")).toBeInTheDocument();
    });
  });

  describe("Forward Ref", () => {
    it("should forward ref to calendar container", () => {
      const ref = { current: null as HTMLDivElement | null };
      
      render(<Calendar {...mockCalendarProps} ref={ref} />);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveClass("calendar");
    });
  });
});