import { getWindow, canUseWindow } from 'utils/browserEnvironment'
import { loadFeatures } from '../loadFeatures'

jest.mock('utils/browserEnvironment')

let win: typeof window

const mockStore = {
  // eslint-disable-next-line
  dispatch: () => {},
}

const mockSnowplow = jest.fn()

describe('loadFeatures util', () => {
  beforeAll(() => {
    win = window
  })

  beforeEach(() => {
    jest.clearAllMocks()
    ;(getWindow as jest.Mock).mockReturnValue({
      __snowPlowGetOptimizelyExperimentsData: () => [
        { data: { experiment_id: 'mock-experiment-id' } },
      ],
      snowplow: mockSnowplow,
    })
  })

  afterAll(() => {
    window = win
  })

  describe('when window is available', () => {
    beforeEach(() => {
      ;(canUseWindow as jest.Mock).mockReturnValue(true)

      loadFeatures(
        // This data structure just enables the fn to run without error,
        // It is not an accurate representation
        {
          enable: ['something'],
          disable: ['something else'],
          set: { setSomething: 123 },
          features: { someFeatures: 456 },
        },
        mockStore,
      )
    })

    test('the snowplow method on window is invoked', () => {
      expect(mockSnowplow).toHaveBeenCalledTimes(1)
    })
  })

  describe('when window is not available', () => {
    beforeEach(() => {
      ;(canUseWindow as jest.Mock).mockReturnValue(false)

      loadFeatures(
        // This data structure just enables the fn to run without error,
        // It is not an accurate representation
        {
          enable: ['something'],
          disable: ['something else'],
          set: { setSomething: 123 },
          features: { someFeatures: 456 },
        },
        mockStore,
      )
    })

    test('the snowplow method on window is not invoked', () => {
      expect(mockSnowplow).not.toHaveBeenCalled()
    })
  })
})
