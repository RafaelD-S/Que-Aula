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

  describe('Estado quando NÃO há classes salvas', () => {
    it('deve retornar hasSavedClasses como false quando localStorage está vazio', () => {
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(false)
      expect(result.current.token).toBe(null)
    })

    it('deve retornar hasSavedClasses como false quando chosenClasses é null', () => {
      localStorage.removeItem('chosenClasses')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(false)
      expect(result.current.token).toBe(null)
    })
  })

  describe('Estado quando HÁ classes salvas', () => {
    it('deve retornar hasSavedClasses como true quando há dados no localStorage', () => {
      const mockClassesData = JSON.stringify([
        { name: 'Matemática', selected: true }
      ])
      localStorage.setItem('chosenClasses', mockClassesData)
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(true)
      expect(result.current.token).toBe(mockClassesData)
    })

    it('deve retornar hasSavedClasses como true mesmo com string vazia', () => {
      localStorage.setItem('chosenClasses', '')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.hasSavedClasses).toBe(false)
      expect(result.current.token).toBe(null)
    })

    it('deve retornar o valor exato do localStorage como token', () => {
      const testData = '{"classes": [{"name": "Programação"}]}'
      localStorage.setItem('chosenClasses', testData)
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe(testData)
      expect(result.current.hasSavedClasses).toBe(true)
    })
  })

  describe('Casos extremos', () => {
    it('deve tratar dados corrompidos no localStorage', () => {
      localStorage.setItem('chosenClasses', 'dados-corrompidos-não-json')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe('dados-corrompidos-não-json')
      expect(result.current.hasSavedClasses).toBe(true)
    })

    it('deve funcionar com números como string', () => {
      localStorage.setItem('chosenClasses', '123')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe('123')
      expect(result.current.hasSavedClasses).toBe(true)
    })

    it('deve funcionar com espaços em branco', () => {
      localStorage.setItem('chosenClasses', '   ')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.token).toBe('   ')
      expect(result.current.hasSavedClasses).toBe(true)
    })
  })

  describe('Consistência entre chamadas', () => {
    it('deve retornar os mesmos valores em múltiplas chamadas', () => {
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