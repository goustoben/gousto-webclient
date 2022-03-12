import Immutable from 'immutable'
import { processCookies } from 'utils/processCookies'

describe('given processCookies util function', () => {
  let cookies
  let store
  let state

  beforeEach(() => {
    cookies = Immutable.Map({})
    state = {
      basket: Immutable.Map({}),
    }
    store = {
      dispatch: jest.fn(),
      getState: jest.fn(() => state)
    }
  })

  describe('when cookies are empty', () => {
    beforeEach(() => {
      processCookies(cookies, store)
    })

    test('then dispatch should not be invoked', () => {
      expect(store.dispatch).not.toBeCalled()
    })
  })
})
