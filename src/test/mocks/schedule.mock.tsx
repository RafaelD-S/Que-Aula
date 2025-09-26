import { vi } from "vitest";
import React from "react";

export const mockScheduleClasses = [
  { day: "Domingo", classes: [] },
  {
    day: "seg",
    classes: [
      {
        weekDay: "1",
        period: ["0", "1"],
        teacher: "Prof. João Silva",
        selected: true,
        classroom: "Lab 01",
        whichClass: "Turma A",
        classDescription: "Aula prática de programação",
        className: "Programação I"
      }
    ]
  },
  {
    day: "ter",
    classes: [
      {
        weekDay: "2",
        period: ["2", "3"],
        teacher: "Prof. Maria Santos",
        selected: true,
        classroom: "Sala 202",
        whichClass: "Turma A",
        classDescription: "Conceitos fundamentais",
        className: "Matemática Básica"
      }
    ]
  },
  { day: "qua", classes: [] },
  { day: "qui", classes: [] },
  { day: "sex", classes: [] },
  { day: "Sábado", classes: [] }
];

export const mockScheduleClassesEmpty = [
  { day: "Domingo", classes: [] },
  { day: "seg", classes: [] },
  { day: "ter", classes: [] },
  { day: "qua", classes: [] },
  { day: "qui", classes: [] },
  { day: "sex", classes: [] },
  { day: "Sábado", classes: [] }
];

export const mockUseAppContextSchedule = vi.fn();

export const MockCalendar = React.forwardRef<HTMLDivElement, { classes: any[] }>(
  ({ classes }, ref) => (
    <div ref={ref} data-testid="calendar">
      Calendar with {classes.length} days
      {classes.map((day: any, index: number) => (
        <div key={index} data-testid={`day-${day.day}`}>
          {day.day}: {day.classes.length} classes
        </div>
      ))}
    </div>
  )
);

export const MockWarning = ({ message, type, opened, children }: any) => {
  if (opened === false) return null;
  return (
    <div data-testid={`warning-${type}`}>
      <div>{message}</div>
      {children}
    </div>
  );
};

export const mockHtml2Canvas = vi.fn().mockImplementation(() => {
  const mockCanvas = document.createElement('canvas');
  mockCanvas.width = 420;
  mockCanvas.height = 300;
  
  const mockContext = {
    fillStyle: '',
    font: '',
    textAlign: 'left',
    fillText: vi.fn(),
    drawImage: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn()
  };
  
  mockCanvas.getContext = vi.fn().mockReturnValue(mockContext);
  mockCanvas.toDataURL = vi.fn().mockReturnValue('data:image/png;base64,mock-image-data');
  
  return Promise.resolve(mockCanvas);
});

export const setupScheduleDOMMocks = () => {
  (globalThis as any).URL = {
    createObjectURL: vi.fn().mockReturnValue('mock-blob-url'),
    revokeObjectURL: vi.fn()
  };
  
  const mockLink = {
    href: '',
    download: '',
    click: vi.fn(),
    style: {}
  };
  
  const originalCreateElement = document.createElement;
  document.createElement = vi.fn().mockImplementation((tagName) => {
    if (tagName === 'a') {
      return mockLink as any;
    }
    if (tagName === 'canvas') {
      const canvas = originalCreateElement.call(document, 'canvas') as HTMLCanvasElement;
      const mockContext = {
        fillStyle: '',
        font: '',
        textAlign: 'left',
        fillText: vi.fn(),
        drawImage: vi.fn(),
        clearRect: vi.fn(),
        fillRect: vi.fn()
      };
      (canvas as any).getContext = vi.fn().mockReturnValue(mockContext);
      (canvas as any).toDataURL = vi.fn().mockReturnValue('data:image/png;base64,mock');
      return canvas;
    }
    return originalCreateElement.call(document, tagName);
  });
};

export const getDefaultScheduleContextValue = () => ({
  storedClasses: mockScheduleClasses,
  currentWeekday: 1,
  setWeekday: vi.fn(),
  weekDays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
  allDays: [],
  setClasses: vi.fn()
});
