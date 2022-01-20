import Immutable from 'immutable'
import { getShouldBannerTastePreferencesShow } from '../tastePreferences'

describe('tastePreferences', () => {
  let state
  describe('when feature is enable', () => {
    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          tastePreferences: {
            value: true
          }
        })
      }
    })
    describe('when user is not authentificated', () => {
      beforeEach(() => {
        state = {
          ...state,
          auth: Immutable.fromJS({
            isAuthenticated: false
          })
        }
      })
      test('should return true', () => {
        const result = getShouldBannerTastePreferencesShow(state)
        expect(result).toBe(true)
      })
    })

    describe('when user is authentificated', () => {
      beforeEach(() => {
        state = {
          ...state,
          auth: Immutable.fromJS({
            isAuthenticated: true
          })
        }
      })
      test('should return false', () => {
        const result = getShouldBannerTastePreferencesShow(state)
        expect(result).toBe(false)
      })
    })
  })

  describe('when feature is not enable', () => {
    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          tastePreferences: {
            value: false
          }
        })
      }
    })
    describe('when user is authentificated', () => {
      beforeEach(() => {
        state = {
          ...state,
          auth: Immutable.fromJS({
            isAuthenticated: true
          })
        }
      })
      test('should return false', () => {
        const result = getShouldBannerTastePreferencesShow(state)
        expect(result).toBe(false)
      })
    })
  })
})
