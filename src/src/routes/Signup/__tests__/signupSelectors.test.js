import Immutable from 'immutable'
import { getIsSocialBelongingEnabled, getIsBoxSizeVerticalLayoutEnabled } from '../signupSelectors'

describe('signupSelectors', () => {
  describe('given getIsSocialBelongingEnabled is called', () => {
    let state

    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          isSocialBelongingEnabled: {
            value: true,
          },
        }),
      }
    })

    test('then it should return true', () => {
      expect(getIsSocialBelongingEnabled(state)).toBeTruthy()
    })
  })

  describe('given getIsBoxSizeVerticalLayoutEnabled is called', () => {
    let state

    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          isBoxSizeVerticalLayoutEnabled: {
            value: true,
          },
        }),
      }
    })

    test('then it should return true', () => {
      expect(getIsBoxSizeVerticalLayoutEnabled(state)).toBeTruthy()
    })
  })
})
