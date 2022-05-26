import Immutable from 'immutable'

import { getCheckoutUrgencyCurrentStatus } from '../checkoutSelectors'

describe('checkoutSelectors', () => {
  let state

  describe('given getCheckoutUrgencyCurrentStatus is called', () => {
    beforeEach(() => {
      state = {
        checkoutUrgency: Immutable.fromJS({
          currentStatus: 'running',
        }),
      }
    })

    test('then it should return current status', () => {
      expect(getCheckoutUrgencyCurrentStatus(state)).toBe('running')
    })
  })
})
