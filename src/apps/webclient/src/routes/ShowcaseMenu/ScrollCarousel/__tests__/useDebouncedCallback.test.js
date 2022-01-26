import React from 'react'
import { useDebouncedCallback } from '../useDebouncedCallback'

jest.spyOn(React, 'useRef').mockReturnValue({ current: null })
jest.spyOn(React, 'useCallback').mockImplementation((f) => f)

jest.useFakeTimers()

describe('given useDebouncedCallback is called', () => {
  beforeEach(() => {})

  test('then it should return a callback that is invoked only once immediately, then once after the timeout', () => {
    let count = 0
    const testFn = () => {
      count += 1
    }

    const callback = useDebouncedCallback(testFn, 200, [count])

    for (let i = 0; i < 10; ++i) {
      callback()
    }

    expect(count).toBe(1)

    jest.runAllTimers()

    expect(count).toBe(2)

    jest.runAllTimers()

    expect(count).toBe(2)
  })
})
