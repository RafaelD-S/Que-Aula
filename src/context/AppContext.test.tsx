import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, act } from '@testing-library/react'
import { AppProvider } from './AppContext'
import { BrowserRouter } from 'react-router-dom'
import { 
  mockLocalStorage, 
  setupLocalStorageMock, 
  mockStoredDataSimple, 
  mockStoredDataComplex,
  setupTimeMocks,
  clearAllMocks 
} from '../test/mocks/appContext.mocks'
import { 
  TestComponent, 
  TestComponentOutsideProvider 
} from '../test/components/appContext.testComponents'

setupLocalStorageMock()

const SimpleWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>{children}</BrowserRouter>
)

describe('AppContext', () => {
  beforeEach(() => {
    clearAllMocks()
    setupTimeMocks()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  describe('AppProvider', () => {
    it('should provide context values correctly', () => {
      mockLocalStorage.getItem.mockReturnValue('[]')
      
      render(
        <BrowserRouter>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </BrowserRouter>
      )

      expect(screen.getByTestId('current-weekday')).toHaveTextContent('2')
      expect(screen.getByTestId('weekdays')).toHaveTextContent(
        'Segunda-feira,Terça-feira,Quarta-feira,Quinta-feira,Sexta-feira'
      )
      expect(screen.getByTestId('stored-classes-count')).toHaveTextContent('7')
    })

    it('should handle setWeekday function correctly', () => {
      mockLocalStorage.getItem.mockReturnValue('[]')
      
      render(
        <BrowserRouter>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </BrowserRouter>
      )

      const setWeekdayButton = screen.getByTestId('set-weekday')
      act(() => {
        setWeekdayButton.click()
      })

      expect(screen.getByTestId('current-weekday')).toHaveTextContent('3')
    })

    it('should handle setClasses function and trigger useEffect', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockStoredDataSimple))
      
      render(
        <BrowserRouter>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </BrowserRouter>
      )

      const setClassesButton = screen.getByTestId('set-classes')
      act(() => {
        setClassesButton.click()
      })

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('chosenClasses')
    })

    it('should handle localStorage data processing correctly (covers lines 28-31)', () => {
      mockLocalStorage.getItem.mockReturnValue(JSON.stringify(mockStoredDataComplex))
      
      render(
        <BrowserRouter>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </BrowserRouter>
      )

      const setClassesButton = screen.getByTestId('set-classes')
      act(() => {
        setClassesButton.click()
      })

      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('chosenClasses')
    })

    it('should handle empty localStorage gracefully', () => {
      mockLocalStorage.getItem.mockReturnValue(null)
      
      render(
        <BrowserRouter>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </BrowserRouter>
      )

      expect(screen.getByTestId('stored-classes-count')).toHaveTextContent('7')
      expect(mockLocalStorage.getItem).toHaveBeenCalledWith('chosenClasses')
    })
  })

  describe('useAppContext Hook', () => {
    it('should throw error when used outside AppProvider (covers lines 50-51)', () => {
      render(<TestComponentOutsideProvider />, { wrapper: SimpleWrapper })
      
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'useAppContext deve ser usado dentro de <AppProvider>'
      )
    })

    it('should return context when used inside AppProvider', () => {
      mockLocalStorage.getItem.mockReturnValue('[]')
      
      render(
        <BrowserRouter>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </BrowserRouter>
      )

      expect(screen.queryByTestId('no-error')).not.toBeInTheDocument()
      expect(screen.getByTestId('current-weekday')).toBeInTheDocument()
    })
  })

  describe('Context Integration', () => {
    it('should maintain state consistency across interactions', () => {
      mockLocalStorage.getItem.mockReturnValue('[]')
      
      render(
        <BrowserRouter>
          <AppProvider>
            <TestComponent />
          </AppProvider>
        </BrowserRouter>
      )

      expect(screen.getByTestId('current-weekday')).toHaveTextContent('2')

      act(() => {
        screen.getByTestId('set-weekday').click()
      })

      expect(screen.getByTestId('current-weekday')).toHaveTextContent('3')
      
      act(() => {
        screen.getByTestId('set-classes').click()
      })

      expect(screen.getByTestId('current-weekday')).toHaveTextContent('3')
    })
  })
})
