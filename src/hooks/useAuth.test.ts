import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { useAuth } from './useAuth'

describe('useAuth Hook', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  afterEach(() => {
    localStorage.clear()
  })

  describe('State when there are NO saved classes', () => {
    it('should return hasSavedClasses as false when localStorage is empty', () => {
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(false)
      expect(result.current.token).toBe(null)
    })

    it('should return hasSavedClasses as false when chosenClasses is null', () => {
      localStorage.removeItem('chosenClasses')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(false)
      expect(result.current.token).toBe(null)
    })
  })

  describe('State when there ARE saved classes', () => {
    it('should return hasSavedClasses as true when there is data in localStorage', () => {
      const mockClassesData = JSON.stringify([
        { name: 'Mathematics', selected: true }
      ])
      localStorage.setItem('chosenClasses', mockClassesData)
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(true)
      expect(result.current.token).toBe(mockClassesData)
    })

    it('should return hasSavedClasses as false for an empty string', () => {
      localStorage.setItem('chosenClasses', '')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(false)
      expect(result.current.token).toBe(null)
    })

    it('should return the exact value from localStorage as the token', () => {
      const testData = '{"classes": [{"name": "Programming"}]}'
      localStorage.setItem('chosenClasses', testData)
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe(testData)
      expect(result.current.hasSavedClasses).toBe(true)
    })
  })

  describe('Edge cases', () => {
    it('should handle corrupted data in localStorage', () => {
      localStorage.setItem('chosenClasses', 'corrupted-non-json-data')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe('corrupted-non-json-data')
      expect(result.current.hasSavedClasses).toBe(true)
    })

    it('should work with numbers as a string', () => {
      localStorage.setItem('chosenClasses', '123')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe('123')
      expect(result.current.hasSavedClasses).toBe(true)
    })

    it('should work with whitespace', () => {
      localStorage.setItem('chosenClasses', '   ')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe('   ')
      expect(result.current.hasSavedClasses).toBe(true)
    })
  })

  describe('Consistency between calls', () => {
    it('should return the same values on multiple calls', () => {
      const testData = JSON.stringify({ test: 'data' })
      localStorage.setItem('chosenClasses', testData)
      
      const { result: result1 } = renderHook(() => useAuth())
      const { result: result2 } = renderHook(() => useAuth())
      
      expect(result1.current.hasSavedClasses).toBe(result2.current.hasSavedClasses)
      expect(result1.current.token).toBe(result2.current.token)
      expect(result1.current.hasSavedClasses).toBe(true)
      expect(result1.current.token).toBe(testData)
    })
  })
})