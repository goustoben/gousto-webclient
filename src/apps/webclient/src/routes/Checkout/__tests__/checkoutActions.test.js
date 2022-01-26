import Immutable from 'immutable'
import { trackCheckoutUrgencyAction } from '../checkoutActions'

describe('checkoutActions', () => {
  describe('given trackCheckoutUrgencyAction is called', () => {
    const state = {
      basket: Immutable.fromJS({
        promoCode: 'promo1',
      }),
      tracking: Immutable.Map({
        utmSource: {
          referral: '123',
        },
      }),
    }

    const dispatch = jest.fn()
    const getState = () => state

    test('then it should track utm, promo code, and additional data', () => {
      const type = 'checkout_urgency_modal_displayed'

      trackCheckoutUrgencyAction(type, { time_remaining: 3 })(dispatch, getState)

      expect(dispatch).toHaveBeenCalledWith({
        type,
        trackingData: expect.objectContaining({
          actionType: type,
          promoCode: 'promo1',
          referral: '123',
          time_remaining: 3,
        }),
      })
    })
  })
})
