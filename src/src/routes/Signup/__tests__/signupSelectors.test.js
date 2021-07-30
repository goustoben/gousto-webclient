import Immutable from 'immutable'
import { getIsSocialBelongingEnabled } from '../signupSelectors'

describe('given getIsSocialBelongingEnabled', () => {
  describe('when getIsSocialBelongingEnabled is called', () => {
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
})
