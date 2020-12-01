import { renderHook } from '@testing-library/react-hooks'
import { useSubscriptionToast } from '../useSubscriptionToast'

const mockDispatch = jest.fn()

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react')

  return {
    ...ActualReact,
    useContext: () => ({ dispatch: mockDispatch })
  }
})

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
  })

  afterAll(() => {
    jest.resetAllMocks()
  })

  describe('Given a successful response is passed', () => {
    test('Then an action to add toast is dispatched', () => {
      renderHook(() => useSubscriptionToast(mockSuccessfulResponse, undefined))

      expect(mockDispatch).toHaveBeenCalledWith({
        type: 'ADD_TOAST',
        payload: {
          body: 'Your subscription details have been successfully updated',
          canDismiss: false,
          displayTime: 'long',
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
          canDismiss: false,
          displayTime: 'long',
          id: 'some-uuid',
          title: 'Oops, something went wrong',
          variant: 'error'
        },
      })
    })
  })
})
