import { vi } from 'vitest';
import { IClasses } from '../../context/appContext.interface';

export const mockClassesWithData: IClasses[] = [
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
      },
      {
        weekDay: "1",
        period: ["3", "4"],
        teacher: "Prof. Maria Santos",
        selected: true,
        classroom: "Sala 202",
        whichClass: "Turma A",
        classDescription: "Conceitos fundamentais",
        className: "Matemática Básica"
      }
    ]
  },
  { day: "ter", classes: [] },
  { day: "qua", classes: [] },
  { day: "qui", classes: [] },
  { day: "sex", classes: [] },
  { day: "Sábado", classes: [] }
];

export const mockClassesEmpty: IClasses[] = [
  { day: "Domingo", classes: [] },
  { day: "seg", classes: [] },
  { day: "ter", classes: [] },
  { day: "qua", classes: [] },
  { day: "qui", classes: [] },
  { day: "sex", classes: [] },
  { day: "Sábado", classes: [] }
];

export const mockClassesWithConflicts: IClasses[] = [
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
      },
      {
        weekDay: "1",
        period: ["1", "2"],
        teacher: "Prof. Ana Costa",
        selected: true,
        classroom: "Sala 101",
        whichClass: "Turma B",
        classDescription: "Aula teórica",
        className: "Algoritmos"
      }
    ]
  },
  { day: "ter", classes: [] },
  { day: "qua", classes: [] },
  { day: "qui", classes: [] },
  { day: "sex", classes: [] },
  { day: "Sábado", classes: [] }
];

export const mockClassesExtended: IClasses[] = [
  { day: "Domingo", classes: [] },
  {
    day: "seg",
    classes: [
      {
        weekDay: "1",
        period: ["0", "1", "2", "3"],
        teacher: "Prof. Carlos Mendes",
        selected: true,
        classroom: "Auditório",
        whichClass: "Turma Única",
        classDescription: "Aula magna de apresentação",
        className: "Projeto Integrador"
      }
    ]
  },
  { day: "ter", classes: [] },
  { day: "qua", classes: [] },
  { day: "qui", classes: [] },
  { day: "sex", classes: [] },
  { day: "Sábado", classes: [] }
];

export const createMockAppContext = (
  currentWeekday = 1,
  storedClasses = mockClassesWithData,
  weekDays = ["Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira"],
  allDays = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"]
) => ({
  currentWeekday,
  storedClasses,
  weekDays,
  allDays,
  setWeekday: vi.fn(),
  setClasses: vi.fn()
});

export const setupDayClassesMocks = () => {
  vi.mock('../../context/AppContext', () => ({
    useAppContext: vi.fn()
  }));
};

export const setupDayClassesTestMocks = (mockUseAppContext: any) => {
  mockUseAppContext.mockReturnValue(createMockAppContext());
  
  return { mockUseAppContext };
};

export const resetDayClassesMocks = (mockUseAppContext: any) => {
  vi.clearAllMocks();
  mockUseAppContext.mockReturnValue(createMockAppContext());
};

export const mockClassesWithMissingData: IClasses[] = [
  { day: "Domingo", classes: [] },
  {
    day: "seg",
    classes: [{
      weekDay: "1",
      period: ["0"],
      teacher: "Prof. Teste",
      classroom: "Sala 101",
    }]
  },
  ...mockClassesEmpty.slice(2)
];

export const mockClassesWithInvalidPeriod: IClasses[] = [
  { day: "Domingo", classes: [] },
  {
    day: "seg",
    classes: [{
      weekDay: "1",
      period: [],
      teacher: "Prof. Teste",
      classroom: "Sala 101",
      className: "Teste"
    }]
  },
  ...mockClassesEmpty.slice(2)
];

export const mockClassesForSinglePeriod: IClasses[] = [
  { day: "Domingo", classes: [] },
  {
    day: "seg",
    classes: [{
      weekDay: "1",
      period: ["2"],
      teacher: "Prof. Teste",
      selected: true,
      classroom: "Sala 101",
      whichClass: "Turma X",
      classDescription: "Descrição teste",
      className: "Matéria Teste"
    }]
  },
  ...mockClassesEmpty.slice(2)
];

export const setupTestScenario = (
  scenario: 'withData' | 'empty' | 'conflicts' | 'extended' | 'missingData' | 'invalidPeriod' | 'singlePeriod',
  weekday = 1,
  mockUseAppContext: any
) => {
  const scenarioMap = {
    withData: mockClassesWithData,
    empty: mockClassesEmpty,
    conflicts: mockClassesWithConflicts,
    extended: mockClassesExtended,
    missingData: mockClassesWithMissingData,
    invalidPeriod: mockClassesWithInvalidPeriod,
    singlePeriod: mockClassesForSinglePeriod
  };

  mockUseAppContext.mockReturnValue(
    createMockAppContext(weekday, scenarioMap[scenario])
  );
};
