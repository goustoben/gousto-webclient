
import Immutable from 'immutable'
import { menuLoadDays, redirect } from 'actions'
import { loadMenuServiceDataIfDeepLinked } from 'utils/menuService'

import Signup from 'routes/Signup/Signup'

jest.mock('actions', () => ({
  signupStepsReceive: jest.fn().mockReturnValue(Promise.resolve()),
  signupSetStep: jest.fn().mockReturnValue(Promise.resolve()),
  redirect: jest.fn().mockReturnValue(Promise.resolve()),
  menuLoadDays: jest.fn().mockReturnValue(Promise.resolve()),
}))

jest.mock('utils/menuService')

describe('Signup', () => {
  let store
  let context
  let dispatch
  let getState
  let subscribe

  beforeEach(() => {
    store = {
      features: Immutable.List(),
      signup: Immutable.List(),
    }

    getState = jest.fn().mockReturnValue(store)
    dispatch = jest.fn().mockReturnValue(Promise.resolve())

    context = {
      store: {
        getState,
        subscribe,
        dispatch,
      },
    }
  })

  afterEach(() => {
    redirect.mockClear()
    menuLoadDays.mockClear()
    menuLoadDays.mockReset()
    loadMenuServiceDataIfDeepLinked.mockClear()
  })

  describe('fetchData', () => {
    test('loadMenuServiceDataIfDeepLinked', async () => {
      await Signup.fetchData({
        store: context.store,
        query: { },
        params: { },
      })
      expect(loadMenuServiceDataIfDeepLinked).toHaveBeenCalled()
      expect(dispatch).toHaveBeenCalled()
      expect(menuLoadDays).toHaveBeenCalledTimes(1)
    })
  })
})
