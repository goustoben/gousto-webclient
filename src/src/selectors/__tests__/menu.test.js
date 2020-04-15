import Immutable from 'immutable'
import { getMenuAccessToken, getMenuFetchVariant, getMenuLimits } from '../menu'

describe('menu selectors', () => {
  const state = {}

  describe('getMenuAccessToken', () => {
    beforeEach(() => {
      state.menu = Immutable.fromJS({
        accessToken: 'access-token',
      })
    })

    test('should return access token', () => {
      expect(getMenuAccessToken(state)).toEqual('access-token')
    })
  })

  describe('getMenuFetchVariant', () => {
    beforeEach(() => {
      state.menu = Immutable.fromJS({
        menuVariant: 'menu-A',
      })
    })

    test('should return menuVariant', () => {
      expect(getMenuFetchVariant(state)).toEqual('menu-A')
    })
  })

  describe('getMenuLimits', () => {
    beforeEach(() => {
      state.menu = Immutable.fromJS({
        menuLimits: {
          321: []
        }
      })
    })

    test('should return menuLimits', () => {
      expect(getMenuLimits(state)).toEqual(Immutable.fromJS({
        321: []
      }))
    })
  })
})
