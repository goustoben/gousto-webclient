import { getPaymentDetails } from 'selectors/payment'
import Immutable from "immutable"

describe('getPaymentDetails', () => {
  let state = {}

  describe('when checkout payment feature is enabled', () => {
    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          checkoutPayment: {
            value: true
          },
        })
      }
    })

    describe('and token is present', () => {
      beforeEach(() => {
        state = {
          ...state,
          form: {
            payment: {
              values: {
                payment: {
                  payment_provider: 'checkout',
                  active: 1,
                  token: 'test-token'
                }
              }
            }
          }
        }
      })

      it('should return payment details for checkout', () => {
        expect(getPaymentDetails(state)).toEqual({
          payment_provider: 'checkout',
          active: 1,
          card_token: 'test-token'
        })
      })
    })
  })
})
