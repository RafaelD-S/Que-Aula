import { describe, it, expect } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('deve retornar string vazia quando objeto estiver vazio', () => {
    const result = classNames({})
    expect(result).toBe('')
  })

  it('deve retornar apenas classes com valores truthy', () => {
    const result = classNames({
      'class-a': true,
      'class-b': false,
      'class-c': true,
      'class-d': null,
      'class-e': undefined
    })
    expect(result).toBe('class-a class-c')
  })

  it('deve lidar com valores diversos de truthy/falsy', () => {
    const result = classNames({
      'active': true,
      'disabled': false,
      'loading': true,
      'error': false,
      'success': true,
      'warning': false,
      'info': null,
      'primary': undefined
    })
    expect(result).toBe('active loading success')
  })

  it('deve retornar string vazia quando todas as classes são falsy', () => {
    const result = classNames({
      'class-a': false,
      'class-b': null,
      'class-c': undefined,
      'class-d': false,
      'class-e': false
    })
    expect(result).toBe('')
  })
})
