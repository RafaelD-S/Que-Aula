import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import {
  mockScheduleClassesEmpty,
  mockUseAppContextSchedule,
  MockCalendar,
  MockWarning,
  mockHtml2Canvas,
  setupScheduleDOMMocks,
  getDefaultScheduleContextValue
} from "../../test/mocks/schedule.mock";

vi.mock('../../context/AppContext', () => ({
  useAppContext: mockUseAppContextSchedule
}));

vi.mock('../../components/calendar/calendar', () => ({
  Calendar: MockCalendar
}));

vi.mock('../../components/warning/warning', () => ({
  default: MockWarning
}));

vi.mock('html2canvas', () => ({
  default: mockHtml2Canvas
}));

vi.mock('../../assets/download.svg', () => ({
  default: 'download-icon.svg'
}));

import { useAppContext } from '../../context/AppContext';
import Schedule from "./schedule";

const mockUseAppContext = vi.mocked(useAppContext);

beforeEach(() => {
  vi.clearAllMocks();
  
  setupScheduleDOMMocks();
  
  mockUseAppContext.mockReturnValue(getDefaultScheduleContextValue());
});

const renderComponent = () => render(
  <MemoryRouter>
    <Schedule />
  </MemoryRouter>
);

describe('Schedule', () => {

  describe('Basic Rendering', () => {
    it('renders schedule page correctly', () => {
      renderComponent();

      expect(screen.getByText('Todas as Aulas')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /salvar imagem do calendário/i })).toBeInTheDocument();
      expect(screen.getByRole('main')).toHaveClass('schedule');
    });

    it('displays calendar component', () => {
      renderComponent();

      expect(screen.getByTestId('calendar')).toBeInTheDocument();
      expect(screen.getByText('Calendar with 7 days')).toBeInTheDocument();
    });

    it('shows classes data in calendar', () => {
      renderComponent();

      expect(screen.getByTestId('day-seg')).toBeInTheDocument();
      expect(screen.getByTestId('day-ter')).toBeInTheDocument();
      expect(screen.getByText('seg: 1 classes')).toBeInTheDocument();
      expect(screen.getByText('ter: 1 classes')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('handles empty classes data', () => {
        mockUseAppContext.mockReturnValue({
          storedClasses: mockScheduleClassesEmpty,
          currentWeekday: 1,
          setWeekday: vi.fn(),
          weekDays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
          allDays: [],
          setClasses: vi.fn()
        });

      renderComponent();

      expect(screen.getByTestId('calendar')).toBeInTheDocument();
      expect(screen.getByText('seg: 0 classes')).toBeInTheDocument();
      expect(screen.getByText('ter: 0 classes')).toBeInTheDocument();
    });
  });

  describe('Download Button', () => {
    it('renders download button', () => {
      renderComponent();

      const button = screen.getByRole('button', { name: /salvar imagem do calendário/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass('schedule__button');
    });

    it('button click triggers save function', async () => {
      const user = userEvent.setup();
      renderComponent();

      const downloadButton = screen.getByRole('button', { name: /salvar imagem do calendário/i });
      
      await user.click(downloadButton);
      
      await new Promise(resolve => setTimeout(resolve, 0));
    });

    it('shows warning when canvas context is null', async () => {
      const user = userEvent.setup();
      
      const originalCreateElement = document.createElement;
      document.createElement = vi.fn().mockImplementation((tagName) => {
        if (tagName === 'a') {
          return {
            href: '',
            download: '',
            click: vi.fn(),
            style: {}
          } as any;
        }
        if (tagName === 'canvas') {
          const canvas = originalCreateElement.call(document, 'canvas') as HTMLCanvasElement;
          (canvas as any).getContext = vi.fn().mockReturnValue(null);
          return canvas;
        }
        return originalCreateElement.call(document, tagName);
      });

      renderComponent();

      const downloadButton = screen.getByRole('button', { name: /salvar imagem do calendário/i });
      
      await user.click(downloadButton);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      expect(screen.getByText('Não foi possível fazer o download da imagem. Tente novamente mais tarde.')).toBeInTheDocument();
    });
  });

  describe('Warning Components', () => {
    it('renders info warning component', () => {
      renderComponent();

      expect(screen.getByTestId('warning-info')).toBeInTheDocument();
      expect(screen.getByText('Seu download foi iniciado. Aguarde.')).toBeInTheDocument();
    });
  });

  describe('Context Integration', () => {
    it('uses storedClasses from context', () => {
      const customClasses = [
        { day: "seg", classes: [{ 
          weekDay: "1", 
          period: ["0"], 
          teacher: "Test Teacher", 
          selected: true, 
          classroom: "Test Room",
          whichClass: "Test Class",
          classDescription: "Test Description",
          className: "Test Subject"
        }] },
        { day: "ter", classes: [] }
      ];
      
      mockUseAppContext.mockReturnValue({
        storedClasses: customClasses,
        currentWeekday: 1,
        setWeekday: vi.fn(),
        weekDays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        allDays: [],
        setClasses: vi.fn()
      });
      
      renderComponent();

      expect(screen.getByTestId('calendar')).toBeInTheDocument();
      expect(screen.getByText('Calendar with 2 days')).toBeInTheDocument();
    });

    it('reacts to context changes', () => {
      const { rerender } = renderComponent();

      expect(screen.getByText('seg: 1 classes')).toBeInTheDocument();

      mockUseAppContext.mockReturnValue({
        storedClasses: mockScheduleClassesEmpty,
        currentWeekday: 1,
        setWeekday: vi.fn(),
        weekDays: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        allDays: [],
        setClasses: vi.fn()
      });

      rerender(
        <MemoryRouter>
          <Schedule />
        </MemoryRouter>
      );

      expect(screen.getByText('seg: 0 classes')).toBeInTheDocument();
    });
  });

  describe('Component Structure', () => {
    it('has correct main structure', () => {
      const { container } = renderComponent();

      expect(container.querySelector('.schedule')).toBeInTheDocument();
      expect(container.querySelector('.schedule__title')).toBeInTheDocument();
      expect(container.querySelector('.schedule__warning')).toBeInTheDocument();
      expect(container.querySelector('.schedule__button')).toBeInTheDocument();
    });

    it('renders title correctly', () => {
      renderComponent();

      const title = screen.getByText('Todas as Aulas');
      expect(title).toBeInTheDocument();
      expect(title.tagName).toBe('H2');
    });
  });
});
