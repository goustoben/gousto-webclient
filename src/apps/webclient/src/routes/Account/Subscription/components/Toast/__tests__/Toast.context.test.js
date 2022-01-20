import { toastReducer, toastActions } from '../Toast.context'

let result

const mockState = [{ id: 'first' }]

const mockDispatch = (action) => {
  result = toastReducer(mockState, action)
}

describe('toastReducer', () => {
  describe('Given ADD_TOAST action is received', () => {
    beforeEach(() => {
      mockDispatch({
        type: toastActions.ADD_TOAST,
        payload: { id: 'second' }
      })
    })

    test('Then payload is prepended to state as expected', () => {
      expect(result).toEqual([{ id: 'second' }, { id: 'first' }])
    })
  })

  describe('Given REMOVE_TOAST action is received', () => {
    beforeEach(() => {
      mockDispatch({
        type: toastActions.REMOVE_TOAST,
        id: 'first'
      })
    })

    test('Then toast is removed as expected', () => {
      expect(result).toEqual([])
    })
  })

  describe('Given REMOVE_ALL_TOAST action is received', () => {
    beforeEach(() => {
      mockDispatch({
        type: toastActions.REMOVE_ALL_TOASTS,
        payload: { id: 'second' }
      })
    })

    test('Then all toasts are removed as expected', () => {
      expect(result).toEqual([])
    })
  })

  describe('Given an unrelated action is received', () => {
    beforeEach(() => {
      mockDispatch({
        type: 'unrelated_action_type'
      })
    })

    test('Then state is returned', () => {
      expect(result).toEqual(mockState)
    })
  })
})
