import { RootStateOrAny, useSelector } from 'react-redux'
import { useLocation } from './useLocation'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}))

const mockedUseLocation = useLocation as jest.MockedFunction<typeof useLocation>
const mockedUseSelector = useSelector as jest.MockedFunction<typeof useSelector>

describe('useLocation', () => {
  let state: RootStateOrAny

  beforeEach(() => {
    jest.clearAllMocks()

    state = {
      routing: {
        locationBeforeTransitions: {
          query: {},
        },
      },
    }

    mockedUseSelector.mockImplementation((selector) => selector(state))
  })

  test('should return location from state', () => {
    const result = mockedUseLocation()

    expect(result).toEqual(state.routing.locationBeforeTransitions)
  })
})
