import { describe, it, expect } from 'vitest'
import { qualityClass } from '../quality'

describe('qualityClass', () => {
  it('90 이상이면 quality--high를 반환한다', () => {
    expect(qualityClass(90)).toBe('quality--high')
    expect(qualityClass(100)).toBe('quality--high')
    expect(qualityClass(95)).toBe('quality--high')
  })

  it('70~89이면 quality--mid를 반환한다', () => {
    expect(qualityClass(70)).toBe('quality--mid')
    expect(qualityClass(89)).toBe('quality--mid')
    expect(qualityClass(75)).toBe('quality--mid')
  })

  it('70 미만이면 quality--low를 반환한다', () => {
    expect(qualityClass(69)).toBe('quality--low')
    expect(qualityClass(0)).toBe('quality--low')
    expect(qualityClass(50)).toBe('quality--low')
  })
})
