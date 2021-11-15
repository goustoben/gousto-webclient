import { renderHook } from '@testing-library/react-hooks'
import { useSubscriptionToast } from '../useSubscriptionToast'
import { getOpenOrders } from '../../../context/selectors/orders'

const mockOpenOrders = [
  {
    deliveryDate: '1st Jan 2021',
    phase: 'open'
  },
  {
    deliveryDate: '2nd Feb 2021',
    phase: 'open'
  },
]

const mockDispatch = jest.fn()

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')

  return {
    ...ActualReact,
    useContext: () => ({ dispatch: mockDispatch })
  }
})

jest.mock('../../context/selectors/orders')

jest.mock('uuid', () => ({
  v4: () => 'some-uuid'
}))

const mockSuccessfulResponse = {
  success: true
}

const mockErrorResponse = {
  error: true
}

describe('useSubscriptionToast', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    getOpenOrders.mockReturnValue([])
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  describe('Given no response and error passed', () => {
    test('Then no dispatch occurs', () => {
      renderHook(() => useSubscriptionToast(undefined, undefined))

      expect(mockDispatch).not.toHaveBeenCalled()
    })
  })

  describe('Given a successful response is passed', () => {
    test('Then an action to add toast is dispatched', () => {
      renderHook(() => useSubscriptionToast(mockSuccessfulResponse, undefined))

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_TOAST',
        payload: {
          body: 'Your subscription details have been successfully updated',
          canDismiss: true,
          displayTime: 'short',
          id: 'some-uuid',
          title: 'Updated successfully',
          variant: 'success'
        },
      })
    })
  })

  describe('Given an error response is passed', () => {
    test('Then an action to add error toast is dispatched', () => {
      renderHook(() => useSubscriptionToast(undefined, mockErrorResponse))

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_TOAST',
        payload: {
          body: 'Sorry, we couldn’t process your request right now. Please try again.',
          canDismiss: true,
          displayTime: 'short',
          id: 'some-uuid',
          title: 'Oops, something went wrong',
          variant: 'error'
        },
      })
    })

    describe('And there are open orders', () => {
      beforeEach(() => {
        getOpenOrders.mockReturnValue(mockOpenOrders)
      })

      test('Then the deliveries reminder toast is not dispatched', () => {
        renderHook(() => useSubscriptionToast(undefined, mockErrorResponse))

        expect(mockDispatch).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('Given there are multiple open orders', () => {
    beforeEach(() => {
      getOpenOrders.mockReturnValue(mockOpenOrders)
    })

    test('Then the expected deliveries reminder action is dispatched', () => {
      renderHook(() => useSubscriptionToast(mockSuccessfulResponse))

      expect(mockDispatch).toHaveBeenLastCalledWith({
        type: 'ADD_TOAST',
        payload: {
          id: 'some-uuid',
          title: 'You still have upcoming boxes',
          body: 'Your next delivery is due on 1st Jan 2021',
          variant: 'warning',
          renderAnchor: expect.any(Function),
          canDismiss: true,
          displayTime: 'short'
        }
      })
    })
  })

  describe('Given there is a single open order', () => {
    beforeEach(() => {
      getOpenOrders.mockReturnValue([mockOpenOrders[0]])
    })

    test('Then the expected deliveries reminder action is dispatched', () => {
      renderHook(() => useSubscriptionToast(mockSuccessfulResponse))

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_TOAST',
        payload: {
          id: 'some-uuid',
          title: 'You still have an upcoming box',
          body: 'Your next delivery is due on 1st Jan 2021',
          variant: 'warning',
          renderAnchor: expect.any(Function),
          canDismiss: true,
          displayTime: 'short'
        }
      })
    })
  })
})
