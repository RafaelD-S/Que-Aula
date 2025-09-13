import { describe, it, expect } from 'vitest'
import { classNames } from './classNames'

describe('classNames', () => {
  it('should return an empty string when the object is empty', () => {
    const result = classNames({})
    expect(result).toBe('')
  })

  it('should return only classes with truthy values', () => {
    const result = classNames({
      'class-a': true,
      'class-b': false,
      'class-c': true,
      'class-d': null,
      'class-e': undefined
    })
    expect(result).toBe('class-a class-c')
  })

  it('should handle various truthy/falsy values', () => {
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

  it('should return an empty string when all classes are falsy', () => {
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