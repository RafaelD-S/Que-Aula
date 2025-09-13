import { vi } from 'vitest';

interface IClassItem {
  id: number;
  name: string;
  semester: number;
  code: string;
  optionalClass: boolean;
  requirements: number[];
  workload: number;
  state?: string;
  requiredFor?: string[];
}

export const mockFlowchartData: IClassItem[][] = [
  [
    {
      id: 1,
      name: "Algoritmos",
      semester: 1,
      code: "ALG001",
      optionalClass: false,
      requirements: [],
      workload: 60
    },
    {
      id: 2,
      name: "Matematica1",
      semester: 1,
      code: "MAT001",
      optionalClass: false,
      requirements: [],
      workload: 60
    }
  ],
  [
    {
      id: 3,
      name: "Programacao1",
      semester: 2,
      code: "PRG001",
      optionalClass: false,
      requirements: [1],
      workload: 60
    },
    {
      id: 4,
      name: "Matematica2",
      semester: 2,
      code: "MAT002",
      optionalClass: false,
      requirements: [2],
      workload: 60
    }
  ]
];

export const mockFlowchartDataWithRequiredFor: IClassItem[][] = [
  [
    {
      id: 1,
      name: "Algoritmos",
      semester: 0,
      code: "ALG001",
      optionalClass: false,
      requirements: [],
      workload: 60,
      state: "available",
      requiredFor: ["Programacao1"]
    },
    {
      id: 2,
      name: "Matematica1",
      semester: 0,
      code: "MAT001",
      optionalClass: false,
      requirements: [],
      workload: 60,
      state: "available",
      requiredFor: ["Matematica2"]
    }
  ],
  [
    {
      id: 5,
      name: "EmptyClass",
      semester: 1,
      code: "",
      optionalClass: false,
      requirements: [],
      workload: 0,
      state: "empty"
    },
    {
      id: 6,
      name: "AnotherEmpty",
      semester: 1,
      code: "",
      optionalClass: false,
      requirements: [],
      workload: 0,
      state: "empty"
    }
  ],
  [
    {
      id: 3,
      name: "Programacao1",
      semester: 2,
      code: "PRG001",
      optionalClass: false,
      requirements: [1],
      workload: 60,
      state: "available"
    },
    {
      id: 4,
      name: "Matematica2",
      semester: 2,
      code: "MAT002",
      optionalClass: false,
      requirements: [2],
      workload: 60,
      state: "available"
    }
  ]
];

export const mockNavigate = vi.fn();

export const setupFlowchartMocks = () => {
  const mockLocalStorage = {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  };
  
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true
  });
};

export const resetFlowchartMocks = (mockUseFlowchart: any, mockUseNavigate: any) => {
  vi.clearAllMocks();
  mockUseNavigate.mockReturnValue(mockNavigate);
  if (mockUseFlowchart) {
    mockUseFlowchart.mockClear();
  }
};

export const setupFlowchartTestScenario = (scenario: string, mockUseFlowchart?: any) => {
  if (!mockUseFlowchart) return;

  switch (scenario) {
    case 'loading':
      mockUseFlowchart.mockReturnValue({
        flowchart: [],
        loading: true,
        error: false
      });
      break;
      
    case 'error':
      mockUseFlowchart.mockReturnValue({
        flowchart: [],
        loading: false,
        error: true
      });
      break;
      
    case 'empty':
      mockUseFlowchart.mockReturnValue({
        flowchart: [],
        loading: false,
        error: false
      });
      break;
      
    case 'withData':
      mockUseFlowchart.mockReturnValue({
        flowchart: mockFlowchartData,
        loading: false,
        error: false
      });
      break;
      
    case 'withProgress':
      mockUseFlowchart.mockReturnValue({
        flowchart: mockFlowchartData,
        loading: false,
        error: false
      });
      (window.localStorage.getItem as any).mockReturnValue(
        JSON.stringify({ completedClasses: [1, 2], currentSemester: 2 })
      );
      break;
      
    case 'localStorage':
      mockUseFlowchart.mockReturnValue({
        flowchart: mockFlowchartData,
        loading: false,
        error: false
      });
      (window.localStorage.getItem as any).mockReturnValue(
        JSON.stringify({ completedClasses: [1], currentSemester: 1 })
      );
      break;
      
    case 'withRequirements':
      const dataWithRequirements: IClassItem[][] = [
        [
          {
            id: 1,
            name: "Algoritmos",
            semester: 1,
            code: "ALG001",
            optionalClass: false,
            requirements: [],
            workload: 60
          }
        ],
        [
          {
            id: 3,
            name: "Programacao1",
            semester: 2,
            code: "PRG001",
            optionalClass: false,
            requirements: [1],
            workload: 60
          }
        ]
      ];
      
      mockUseFlowchart.mockReturnValue({
        flowchart: dataWithRequirements,
        loading: false,
        error: false
      });
      break;
      
    case 'withRequiredFor':
      mockUseFlowchart.mockReturnValue({
        flowchart: mockFlowchartDataWithRequiredFor,
        loading: false,
        error: false
      });
      break;
      
    default:
      mockUseFlowchart.mockReturnValue({
        flowchart: [],
        loading: false,
        error: false
      });
  }
};