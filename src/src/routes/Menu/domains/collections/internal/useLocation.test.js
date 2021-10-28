import { useSelector } from 'react-redux'
import { useLocation } from './useLocation'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn()
}))

describe('useLocation', () => {
  let state

  beforeEach(() => {
    jest.clearAllMocks()

    state = {
      routing: {
        locationBeforeTransitions: {
          query: {}
        }
      }
    }

    useSelector.mockImplementation(selector => selector(state))
  })

  test('should return location from state', () => {
    const result = useLocation()

    expect(result).toEqual(state.routing.locationBeforeTransitions)
  })
})
