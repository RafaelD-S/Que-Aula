import { vi } from 'vitest';
import React from 'react';
import { mockClassesData } from './classData.mock';

export const mockSelectedClasses = [
  {
    ...mockClassesData[0],
    classes: mockClassesData[0].classes.map(classItem => ({ 
      ...classItem, 
      selected: true 
    }))
  }
];

export const createMockClassesState = (loading = false, error: string | null = null) => ({
  classes: error ? [] : mockClassesData,
  loading,
  error
});

export const createMockAppContext = (classes = [], currentWeekday = 1) => ({
  setClasses: vi.fn(),
  classes,
  currentWeekday,
  setWeekday: vi.fn()
});

export const MockModal = ({ children }: { children: React.ReactNode }) => (
  <div data-testid="modal">{children}</div>
);

export const MockWarning = ({ message, opened, onClickButton, buttonLabel }: any) => 
  opened ? (
    <div data-testid="warning">
      {message}
      {onClickButton && buttonLabel && (
        <button onClick={onClickButton}>{buttonLabel}</button>
      )}
    </div>
  ) : null;

export const MockClassTag = ({ title, selected, loading, onClick }: any) => {
  if (loading) {
    return <div data-testid="class-tag-loading" className="shimmer">Loading...</div>;
  }
  return (
    <button 
      data-testid="class-tag"
      className={selected ? 'form__classes__tag--selected' : 'form__classes__tag'}
      onClick={(e) => {
        Object.defineProperty(e.currentTarget, 'innerText', {
          value: title,
          writable: true
        });
        onClick?.(e);
      }}
    >
      {title}
    </button>
  );
};

export const setupFormMocks = (mockUseClasses: any, mockUseNavigate: any, mockUseAppContext: any) => {
  const navigateFunction = vi.fn();
  
  mockUseClasses.mockReturnValue(createMockClassesState());
  mockUseAppContext.mockReturnValue(createMockAppContext());
  mockUseNavigate.mockReturnValue(navigateFunction);
  
  return { navigateFunction };
};

export const setupFormTestMocks = () => {
  vi.mock('../../hooks/useClasses', () => ({
    useClasses: vi.fn()
  }));

  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
      ...actual,
      useNavigate: vi.fn()
    };
  });

  vi.mock('../../context/AppContext', () => ({
    useAppContext: vi.fn()
  }));

  vi.mock('../../components/modal/modal', () => ({
    Modal: MockModal
  }));

  vi.mock('../../components/warning/warning', () => ({
    default: MockWarning
  }));

  vi.mock('../views/classTag', () => ({
    ClassTag: MockClassTag
  }));
};
