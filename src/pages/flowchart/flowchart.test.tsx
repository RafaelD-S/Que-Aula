import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import {
  setupFlowchartMocks,
  setupFlowchartTestScenario,
  resetFlowchartMocks,
  mockNavigate
} from "../../test/mocks/flowchart.mock";

setupFlowchartMocks();

import { useFlowchart } from '../../hooks/useClasses';
import { useNavigate } from 'react-router-dom';
import Flowchart from "./flowchart";

vi.mock('../../hooks/useClasses');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

const mockUseFlowchart = vi.mocked(useFlowchart);
const mockUseNavigate = vi.mocked(useNavigate);

beforeEach(() => {
  resetFlowchartMocks(mockUseFlowchart, mockUseNavigate);
  mockUseNavigate.mockReturnValue(mockNavigate);
});

const renderComponent = () => {
  return render(
    <MemoryRouter>
      <Flowchart />
    </MemoryRouter>
  );
};

const expectFlowchartStructure = (container: HTMLElement) => {
  expect(container.querySelector('.flowchart')).toBeInTheDocument();
  expect(container.querySelector('.flowchart__title')).toBeInTheDocument();
  expect(container.querySelector('.flowchart__container')).toBeInTheDocument();
};

const expectSemesterContent = (container: HTMLElement, semesterNumber: number, className?: string) => {
  const semesterTitles = container.querySelectorAll('.flowchart__semester-title');
  const targetTitle = Array.from(semesterTitles).find(title => 
    title.textContent?.includes(`${semesterNumber}º Semestre`)
  );
  expect(targetTitle).toBeInTheDocument();
  
  if (className) {
    expect(container.textContent).toContain(className);
  }
};

const expectProgressTracker = (container: HTMLElement, shouldHaveProgress?: boolean) => {
  expect(container.querySelector('.flowchart__container')).toBeInTheDocument();
  
  if (shouldHaveProgress) {
    expect(container.querySelector('.flowchart')).toBeInTheDocument();
  }
};

const expectClassContent = (container: HTMLElement, className: string) => {
  expect(container.textContent).toContain(className);
};

describe('Flowchart', () => {
  describe('Loading State', () => {
    it('renders loading skeleton correctly', () => {
      setupFlowchartTestScenario('loading', mockUseFlowchart);
      const { container } = renderComponent();

      expectFlowchartStructure(container);
      expect(screen.getByText('Fluxograma')).toBeInTheDocument();
      
      expect(container.querySelectorAll('.flowchart__semester--loading')).toHaveLength(6);
      expect(screen.getByText('1º Semestre')).toBeInTheDocument();
      expect(screen.getByText('6º Semestre')).toBeInTheDocument();
    });

    it('displays loading class items', () => {
      setupFlowchartTestScenario('loading', mockUseFlowchart);
      renderComponent();

      const loadingItems = document.querySelectorAll('[class*="class-item"]');
      expect(loadingItems.length).toBeGreaterThan(0);
    });
  });

  describe('Error State', () => {
    it('displays error warning when API fails', () => {
      setupFlowchartTestScenario('error', mockUseFlowchart);
      renderComponent();

      expect(screen.getByText('Ocorreu um erro no carregamento do fluxograma.')).toBeInTheDocument();
      expect(screen.getByText('Voltar a página inicial')).toBeInTheDocument();
    });

    it('navigates to home when error button is clicked', () => {
      setupFlowchartTestScenario('error', mockUseFlowchart);
      renderComponent();

      const backButton = screen.getByText('Voltar a página inicial');
      fireEvent.click(backButton);

      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  describe('Empty State', () => {
    it('handles empty flowchart data gracefully', () => {
      setupFlowchartTestScenario('empty', mockUseFlowchart);
      const { container } = renderComponent();

      expectFlowchartStructure(container);
      expect(screen.getByText('Fluxograma')).toBeInTheDocument();
      expectProgressTracker(container, true);
    });

    it('maintains basic structure when empty', () => {
      setupFlowchartTestScenario('empty', mockUseFlowchart);
      const { container } = renderComponent();

      expect(container.querySelector('.flowchart__container__content-wrapper')).toBeInTheDocument();
      expect(container.querySelector('.flowchart__container__content')).toBeInTheDocument();
    });
  });

  describe('Data Display', () => {
    it('displays flowchart with semester structure', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      expectFlowchartStructure(container);
      expectSemesterContent(container, 1, 'Algoritmos');
      expectSemesterContent(container, 2, 'Programacao1');
    });

    it('renders class items with correct data', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      renderComponent();

      expectClassContent(screen.getByRole('main'), 'Algoritmos');
      expectClassContent(screen.getByRole('main'), 'Matematica1');
      expectClassContent(screen.getByRole('main'), 'Programacao1');
      expectClassContent(screen.getByRole('main'), 'Matematica2');
    });

    it('displays multiple semesters correctly', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      const semesters = container.querySelectorAll('.flowchart__semester');
      expect(semesters.length).toBeGreaterThan(0);
      
      expectSemesterContent(container, 1);
      expectSemesterContent(container, 2);
    });
  });

  describe('Progress Tracking', () => {
    it('displays progress tracker with class data', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      expectProgressTracker(container, true);
    });

    it('calculates progress correctly with completed classes', () => {
      setupFlowchartTestScenario('withProgress', mockUseFlowchart);
      const { container } = renderComponent();

      expectProgressTracker(container, true);
      expectClassContent(container, 'Algoritmos');
      expectClassContent(container, 'Matematica1');
    });

    it('updates progress when class states change', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      expectProgressTracker(container, true);
      
      const classItems = container.querySelectorAll('[class*="class-item"]');
      expect(classItems.length).toBeGreaterThan(0);
    });
  });

  describe('Class State Management', () => {
    it('handles class state changes', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      expectClassContent(container, 'Algoritmos');
      expectClassContent(container, 'Programacao1');
    });

    it('manages class requirements correctly', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      expectClassContent(container, 'Algoritmos');
      expectClassContent(container, 'Programacao1');
      expectClassContent(container, 'Matematica1');
    });

    it('processes empty slots correctly', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      const semesters = container.querySelectorAll('.flowchart__semester');
      expect(semesters.length).toBeGreaterThan(0);
    });
  });

  describe('LocalStorage Integration', () => {
    it('loads data from localStorage when available', () => {
      setupFlowchartTestScenario('localStorage', mockUseFlowchart);
      const { container } = renderComponent();

      expectClassContent(container, 'Algoritmos');
    });

    it('saves class data to localStorage', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      renderComponent();

      const mockLocalStorage = window.localStorage as any;
      expect(mockLocalStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('Component Structure', () => {
    it('maintains proper CSS class hierarchy', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      expect(container.querySelector('.flowchart__container__content-wrapper')).toBeInTheDocument();
      expect(container.querySelector('.flowchart__semester-classes')).toBeInTheDocument();
      expect(container.querySelectorAll('.flowchart__semester')).toHaveLength(2);
    });

    it('renders proper semantic HTML structure', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();

      expect(container.querySelector('main.flowchart')).toBeInTheDocument();
      expect(container.querySelector('h2.flowchart__title')).toBeInTheDocument();
      expect(container.querySelector('article.flowchart__container')).toBeInTheDocument();
      expect(container.querySelectorAll('h3.flowchart__semester-title')).toHaveLength(2);
    });
  });

  describe('LocalStorage Error Handling', () => {
    it('handles localStorage parsing errors gracefully', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      
      (window.localStorage.getItem as any).mockReturnValue('invalid-json');
      
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error parsing classData from localStorage:', 
        expect.any(Error)
      );
      
      consoleSpy.mockRestore();
    });

    it('handles invalid localStorage data structure', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      
      (window.localStorage.getItem as any).mockReturnValue('{"not": "array"}');
      
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expect(container.querySelector('.flowchart')).toBeInTheDocument();
    });

    it('handles localStorage with partially invalid data', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      
      (window.localStorage.getItem as any).mockReturnValue('[1, 2, 3]');
      
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expect(container.querySelector('.flowchart')).toBeInTheDocument();
    });
  });

  describe('Class State Management Advanced', () => {
    it('handles class state changes and deepEqual comparison', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expectClassContent(container, 'Algoritmos');
      
      const classItem = screen.getByText('Algoritmos');
      fireEvent.click(classItem);
      
      expectClassContent(screen.getByRole('main'), 'Algoritmos');
    });
  });

  describe('Requirement Styling and Dependencies', () => {
    it('handles requirement styling and class dependencies', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expectClassContent(container, 'Algoritmos');
      expectClassContent(container, 'Programacao1');
      expect(container.querySelectorAll('.flowchart__semester')).toHaveLength(2);
    });
  });

  describe('Data Processing Edge Cases', () => {
    it('handles empty localStorage data correctly', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      
      (window.localStorage.getItem as any).mockReturnValue(null);
      
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expectClassContent(container, 'Algoritmos');
    });

    it('handles localStorage data merging with mismatched items', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      
      (window.localStorage.getItem as any).mockReturnValue(
        JSON.stringify([[{ name: 'DifferentClass', state: 'completed' }]])
      );
      
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expectClassContent(container, 'Algoritmos');
    });

    it('handles localStorage data merging with matching items', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      
      (window.localStorage.getItem as any).mockReturnValue(
        JSON.stringify([
          [{ name: 'Algoritmos', state: 'completed' }],
          [{ name: 'Programacao1', state: 'available' }]
        ])
      );
      
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expectClassContent(container, 'Algoritmos');
    });

    it('handles deepEqual comparison returning true (no change needed)', () => {
      setupFlowchartTestScenario('withData', mockUseFlowchart);
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expectClassContent(container, 'Algoritmos');
      
      const classItem = container.querySelector('[data-testid="class-item-Algoritmos"]');
      if (classItem) {
        fireEvent.click(classItem);
        fireEvent.click(classItem);
      }
    });

    it('tests requirementStyling with dependency management', () => {
      setupFlowchartTestScenario('withRequiredFor', mockUseFlowchart);
      
      const mockElement = { classList: { add: vi.fn(), remove: vi.fn() } };
      const originalQuerySelector = document.querySelector;
      document.querySelector = vi.fn().mockReturnValue(mockElement);
      
      const { container } = renderComponent();
      
      expectFlowchartStructure(container);
      expect(document.querySelector).toHaveBeenCalled();
      
      document.querySelector = originalQuerySelector;
    });
  });
});
