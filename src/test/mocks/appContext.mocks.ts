import { vi } from 'vitest'

export const mockLocalStorage = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

export const setupLocalStorageMock = () => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  })
}

export const mockStoredDataSimple = [
  {
    id: 1,
    greve: false,
    classes: [
      {
        id: 1,
        name: 'Test Class',
        selected: true,
        weekDay: '0',
        time: '08:00'
      }
    ]
  }
]

export const mockStoredDataComplex = [
  {
    id: 1,
    greve: true,
    classes: [
      {
        id: 1,
        name: 'Class 1',
        selected: true,
        weekDay: '0',
        time: '08:00'
      },
      {
        id: 2,
        name: 'Class 2',
        selected: false,
        weekDay: '1',
        time: '10:00'
      }
    ]
  },
  {
    id: 2,
    greve: false,
    classes: [
      {
        id: 3,
        name: 'Class 3',
        selected: true,
        weekDay: '2',
        time: '14:00'
      }
    ]
  }
]

export const setupTimeMocks = () => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2023-11-14T10:00:00Z'))
}

export const clearAllMocks = () => {
  vi.clearAllMocks()
}
