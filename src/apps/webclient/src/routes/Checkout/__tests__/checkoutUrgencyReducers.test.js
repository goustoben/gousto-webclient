import { checkoutUrgencySetCurrentStatus } from '../checkoutActions'
import { getCheckoutUrgencyCurrentStatus } from '../checkoutSelectors'
import { checkoutUrgencyStatuses } from '../checkoutUrgencyConfig'
import { checkoutUrgencyReducers } from '../checkoutUrgencyReducers'

describe('checkoutUrgencyReducers', () => {
  const reducer = checkoutUrgencyReducers.checkoutUrgency
  let checkoutUrgency = reducer(null)

  describe('when forming initial state', () => {
    test('then it should initialize current status to inactive', () => {
      expect(getCheckoutUrgencyCurrentStatus({ checkoutUrgency })).toBe(
        checkoutUrgencyStatuses.inactive,
      )
    })
  })

  describe('when checkoutUrgencySetCurrentStatus is handled', () => {
    beforeEach(() => {
      checkoutUrgency = reducer(
        checkoutUrgency,
        checkoutUrgencySetCurrentStatus(checkoutUrgencyStatuses.running),
      )
    })

    test('then it should set current status', () => {
      expect(getCheckoutUrgencyCurrentStatus({ checkoutUrgency })).toBe(
        checkoutUrgencyStatuses.running,
      )
    })
  })
})
