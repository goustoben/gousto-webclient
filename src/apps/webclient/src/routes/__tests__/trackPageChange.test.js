import { documentLocation } from 'utils/window'
import { trackPageChange } from '../trackPageChange'

jest.mock('utils/window', () => ({
  documentLocation: jest.fn(),
}))

describe('given trackPageChange is called', () => {
  const dispatch = jest.fn()
  const store = {
    dispatch,
  }

  beforeEach(() => {
    documentLocation.mockReturnValue({
      href: 'test-location',
    })
  })

  test('then it should dispatch the pageChange action', () => {
    trackPageChange(store)
    expect(dispatch).toHaveBeenCalledWith({
      type: 'PAGE_CHANGED',
      newLocation: 'test-location',
      trackingData: { actionType: 'PAGE_CHANGED', newLocation: 'test-location' },
    })
  })
})
