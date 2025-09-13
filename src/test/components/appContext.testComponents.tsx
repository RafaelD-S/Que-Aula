import { useAppContext } from '../../context/AppContext'

export const TestComponent = () => {
  const { currentWeekday, setWeekday, storedClasses, weekDays, setClasses } = useAppContext()
  
  return (
    <div>
      <div data-testid="current-weekday">{currentWeekday}</div>
      <div data-testid="weekdays">{weekDays.join(',')}</div>
      <div data-testid="stored-classes-count">{storedClasses.length}</div>
      <button 
        data-testid="set-weekday" 
        onClick={() => setWeekday(3)}
      >
        Set Wednesday
      </button>
      <button 
        data-testid="set-classes" 
        onClick={() => setClasses([])}
      >
        Set Classes
      </button>
    </div>
  )
}

export const TestComponentOutsideProvider = () => {
  try {
    useAppContext()
    return <div data-testid="no-error">No error</div>
  } catch (error) {
    return <div data-testid="error-message">{(error as Error).message}</div>
  }
}
