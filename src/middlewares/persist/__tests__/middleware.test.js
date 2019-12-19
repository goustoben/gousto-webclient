import persistenceMiddleware from '../middleware'
import { persist } from '../persistStore'

jest.mock('../persistStore')

describe('persistence middleware', () => {
  const whitelist = { athing: 'anotherthing' }
  const cookies = { cookie1: 'value' }
  const state = { someStateValue: 15 }
  const store = {
    getState: () => state
  }

  const middleware = persistenceMiddleware(whitelist, cookies)

  test('should return the result of the next middleware', () => {
    const action = { type: 'some_mock_action' }

    // need to ensure that the result of `next` is what's returned,
    // so use a symbol
    const nextResult = Symbol()
    const next = (actionArg) => {
      if (actionArg === action) {
        return nextResult
      }
    }

    const result = middleware(store)(next)(action)
    expect(result).toEqual(nextResult)
  })

  test('should call persist with state, whitelist and cookies', () => {
    const next = () => null
    const action = null
    middleware(store)(next)(action)

    expect(persist).toHaveBeenCalledWith(state, whitelist, cookies)
  })
})
