import { RootStateOrAny } from 'react-redux'
import Immutable from 'immutable'
import { getIsSimplifyBasketBarEnabled } from '../features'

describe('getIsSimplifyBasketBarEnabled', () => {
  let state: RootStateOrAny

  describe('when feature is off', () => {
    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          isSimplifyBasketBarEnabled: { value: false },
        }),
      }
    })

    test('then it should return false', () => {
      expect(getIsSimplifyBasketBarEnabled(state)).toBe(false)
    })
  })

  describe('when feature is on', () => {
    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          isSimplifyBasketBarEnabled: { value: true },
        }),
      }
    })

    test('then it should return true', () => {
      expect(getIsSimplifyBasketBarEnabled(state)).toBe(true)
    })
  })
})
