import Immutable from 'immutable'
import { getSubscriptionState } from '../subscription'

describe('given getSubscriptionState is called', () => {
  let customerSubscriptionState

  beforeEach(() => {
    const state = {
      subscription: Immutable.fromJS({
        subscription: {
          reason: 'lifestyle_plan_advance',
          pauseDate: 'ul',
          interval: '1',
          deliverySlotId: '6',
          updatedAt: '2019-07-22 12:35:33',
          state: 'inactive',
          paymentFailedAt: 'ul',
          nextDeliveryWeekId: '287',
          currentBoxNumber: '46',
        }
      })
    }

    customerSubscriptionState = getSubscriptionState(state)
  })
  test('returns user id from the store', () => {
    expect(customerSubscriptionState).toBe('inactive')
  })
})
