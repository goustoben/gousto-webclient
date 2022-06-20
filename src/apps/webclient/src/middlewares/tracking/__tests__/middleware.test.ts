import { canUseWindow, getWindow } from 'utils/browserEnvironment'

import { trackingMiddleware } from '../middleware'

jest.mock('utils/browserEnvironment')

type MockStore = {
  getState: () => {
    routing: {
      locationBeforeTransitions: {
        pathname: string
      }
    }
  }
}

let mockStore: MockStore
const mockNext = () => {}
const mockAction = {
  trackingData: 'mock-tracking-data',
}
const mockTracker = jest.fn()

let win: typeof window

const invokeMiddleware = () => trackingMiddleware(mockTracker)(mockStore)(mockNext)(mockAction)

describe('trackingMiddleware', () => {
  beforeAll(() => {
    win = window
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterAll(() => {
    window = win
  })

  describe('when the window is available', () => {
    beforeEach(() => {
      ;(canUseWindow as jest.Mock).mockReturnValue(true)
      ;(getWindow as jest.Mock).mockReturnValue({
        location: {
          pathname: 'pathname-from-window',
        },
      })
      mockStore = {
        // Store must throw in order to retrieve pathname from window
        getState: () => {
          throw new Error('some error')
        },
      }

      invokeMiddleware()
    })

    test('tracker is invoked with the pathname from window', () => {
      expect(mockTracker).toHaveBeenCalledWith('mock-tracking-data', {
        pathname: 'pathname-from-window',
      })
    })
  })

  describe('when the window is not available', () => {
    beforeEach(() => {
      ;(canUseWindow as jest.Mock).mockReturnValue(false)
      mockStore = {
        getState: () => ({
          routing: {
            locationBeforeTransitions: {
              pathname: 'pathname-from-store',
            },
          },
        }),
      }
      invokeMiddleware()
    })

    test('tracker is invoked with the pathname value from store', () => {
      expect(mockTracker).toHaveBeenCalledWith('mock-tracking-data', {
        pathname: 'pathname-from-store',
      })
    })
  })
})
