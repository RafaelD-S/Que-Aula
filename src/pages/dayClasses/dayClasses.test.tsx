import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {
  setupDayClassesMocks,
  setupTestScenario,
  resetDayClassesMocks
} from "../../test/mocks/dayClasses.mock";

setupDayClassesMocks();

import { useAppContext } from '../../context/AppContext';
import DayClasses from "./dayClasses";

const mockUseAppContext = vi.mocked(useAppContext);

beforeEach(() => {
  resetDayClassesMocks(mockUseAppContext);
});

const renderComponent = () => render(
  <MemoryRouter>
    <DayClasses />
  </MemoryRouter>
);

const expectClassContent = (container: HTMLElement, className: string, teacher: string, classroom: string) => {
  expect(container.textContent).toContain(className);
  expect(container.textContent).toContain(teacher);
  expect(screen.getByText(classroom)).toBeInTheDocument();
};

describe('DayClasses', () => {
  
  describe('Initial Render', () => {
    it('renders Monday with correct title and main structure', () => {
      setupTestScenario('withData', 1, mockUseAppContext);
      const { container } = renderComponent();

      expect(screen.getByText('Segunda-feira')).toBeInTheDocument();
      expect(screen.getByRole('main')).toHaveClass('dayClasses');
      expect(container.querySelector('.dayClasses__title')).toBeInTheDocument();
      expect(container.querySelector('.dayClasses__container')).toBeInTheDocument();
    });

    it('renders different weekdays correctly', () => {
      setupTestScenario('withData', 3, mockUseAppContext);
      renderComponent();

      expect(screen.getByText('Quarta-feira')).toBeInTheDocument();
    });
  });

  describe('Classes Display', () => {
    it('displays class information correctly', () => {
      setupTestScenario('withData', 1, mockUseAppContext);
      const { container } = renderComponent();

      expectClassContent(container, 'Programação I', 'Prof. João Silva', 'Lab 01');
      expect(screen.getByText('Aula prática de programação')).toBeInTheDocument();
    });

    it('displays multiple classes', () => {
      setupTestScenario('withData', 1, mockUseAppContext);
      const { container } = renderComponent();

      expectClassContent(container, 'Programação I', 'Prof. João Silva', 'Lab 01');
      expectClassContent(container, 'Matemática Básica', 'Prof. Maria Santos', 'Sala 202');
    });

    it('shows correct time periods', () => {
      setupTestScenario('withData', 1, mockUseAppContext);
      renderComponent();

      expect(screen.getByText('17h 18h40')).toBeInTheDocument();
      expect(screen.getByText('19h30 21h10')).toBeInTheDocument();
    });
  });

  describe('Empty State', () => {
    it('handles empty classes gracefully', () => {
      setupTestScenario('empty', 1, mockUseAppContext);
      renderComponent();

      expect(screen.getByText('Segunda-feira')).toBeInTheDocument();
      expect(screen.queryByText((_, node) => {
        return node?.textContent?.includes('Programação I') || false;
      })).not.toBeInTheDocument();
    });

    it('maintains basic structure when empty', () => {
      setupTestScenario('empty', 1, mockUseAppContext);
      const { container } = renderComponent();

      expect(container.querySelector('.dayClasses__title')).toBeInTheDocument();
    });
  });

  describe('Time Period Formatting', () => {
    it('formats extended class periods correctly', () => {
      setupTestScenario('extended', 1, mockUseAppContext);
      renderComponent();

      expect(screen.getByText('17h 20h20')).toBeInTheDocument();
    });

    it('handles single period classes', () => {
      setupTestScenario('singlePeriod', 1, mockUseAppContext);
      renderComponent();

      expect(screen.getByText('18h40 19h30')).toBeInTheDocument();
    });
  });

  describe('Class Information Display', () => {
    it('displays complete class information with proper CSS classes', () => {
      setupTestScenario('withData', 1, mockUseAppContext);
      const { container } = renderComponent();

      expectClassContent(container, 'Programação I', 'Prof. João Silva', 'Lab 01');
      expect(screen.getByText('Aula prática de programação')).toBeInTheDocument();

      expect(container.querySelectorAll('.dayClasses__info-item')).toHaveLength(2);
      expect(container.querySelectorAll('.dayClasses__info-item-title').length).toBeGreaterThan(0);
      expect(container.querySelectorAll('.dayClasses__info-item-classroom').length).toBeGreaterThan(0);
      expect(container.querySelectorAll('.dayClasses__info-item-description').length).toBeGreaterThan(0);
    });
  });

  describe('Context Integration', () => {
    it('reacts to currentWeekday changes', () => {
      setupTestScenario('withData', 1, mockUseAppContext);
      const { rerender } = renderComponent();

      expect(screen.getByText('Segunda-feira')).toBeInTheDocument();

      setupTestScenario('withData', 2, mockUseAppContext);
      rerender(
        <MemoryRouter>
          <DayClasses />
        </MemoryRouter>
      );

      expect(screen.getByText('Terça-feira')).toBeInTheDocument();
    });

    it('handles context data changes', () => {
      setupTestScenario('withData', 1, mockUseAppContext);
      const { rerender } = renderComponent();

      expect(screen.getByText((_, element) => {
        return element?.tagName === 'MAIN' && element?.textContent?.includes('Programação I') || false;
      })).toBeInTheDocument();

      setupTestScenario('empty', 1, mockUseAppContext);
      rerender(
        <MemoryRouter>
          <DayClasses />
        </MemoryRouter>
      );

      expect(screen.queryByText((_, element) => {
        return element?.tagName === 'MAIN' && element?.textContent?.includes('Programação I') || false;
      })).not.toBeInTheDocument();
    });
  });

  describe('Conflict Handling', () => {
    it('handles overlapping class periods', () => {
      setupTestScenario('conflicts', 1, mockUseAppContext);
      const { container } = renderComponent();

      expect(container.textContent).toContain('Programação I');
      expect(container.textContent).toContain('Algoritmos');
    });

    it('maintains structure with conflicting classes', () => {
      setupTestScenario('conflicts', 1, mockUseAppContext);
      const { container } = renderComponent();

      const sections = container.querySelectorAll('.dayClasses__item');
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('handles missing optional class properties', () => {
      setupTestScenario('missingData', 1, mockUseAppContext);
      const { container } = renderComponent();

      expect(container.textContent).toContain('Prof. Teste');
      expect(screen.getByText('Sala 101')).toBeInTheDocument();
    });

    it('handles invalid period formats gracefully', () => {
      setupTestScenario('invalidPeriod', 1, mockUseAppContext);

      expect(() => {
        renderComponent();
      }).not.toThrow();
    });
  });
});
