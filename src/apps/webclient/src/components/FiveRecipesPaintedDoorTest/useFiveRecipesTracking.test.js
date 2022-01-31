import '@testing-library/jest-dom'
import { renderHook } from '@testing-library/react-hooks'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFiveRecipesTracking } from './useFiveRecipesTracking'
import { use5RecipesPaintedDoorTest } from './use5RecipesPaintedDoorTest'

const setState = jest.fn()
const useStateSpy = jest.spyOn(React, 'useState')
useStateSpy.mockImplementation((init) => [init, setState])
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))
jest.mock('./use5RecipesPaintedDoorTest', () => ({
  use5RecipesPaintedDoorTest: jest.fn(),
}))

const dispatch = jest.fn()

describe('useFiveRecipesTracking', () => {
  beforeEach(() => {
    useSelector.mockReturnValue('test-user-id')
    useDispatch.mockReturnValue(dispatch)
    use5RecipesPaintedDoorTest.mockReturnValue({
      experimentId: 'test-experiment',
    })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return tracking function', () => {
    const { result } = renderHook(() => useFiveRecipesTracking())
    expect(typeof result.current).toBe('function')
  })

  it('should pass the test data to the tracking function', () => {
    const { result } = renderHook(() => useFiveRecipesTracking())

    result.current('type-test', { props: 'prop-test' })
    expect(dispatch).toHaveBeenCalledWith({
      trackingData: {
        actionType: 'type-test',
        props: 'prop-test',
        experiment_id: 'test-experiment',
        experiment_name: 'test-experiment',
        session_id: undefined,
        user_id: 'test-user-id',
        user_logged_in: true,
      },
      type: 'TRACKING',
    })
  })
})
