import { getPaymentDetails } from 'selectors/payment'
import Immutable from "immutable";

describe('getPaymentDetails', () => {
  let state = {}

  describe('when checkout payment feature is enabled', () => {
    beforeEach(() => {
      state = {
        features: Immutable.fromJS({
          checkoutPayment: {
            value: true
          }
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

  describe('when checkout payment feature is not enabled', () => {
    beforeEach(() => {
      state = {
        form: {
          checkout: {
            values: {
              payment: {
                cardType: 'VISA',
                cardNumber: '4242424242424242',
                cv2: 123,
                cardName: 'Test Card',
                cardExpiryMonth: 12,
                cardExpiryYear: 23,
              }
            }
          }
        }
      }
    })

    it('should return payment details for sage pay', () => {
      expect(getPaymentDetails(state)).toEqual({
        type: 'VISA',
        number: '4242424242424242',
        cvv2: 123,
        holder: 'Test Card',
        expiry_month: 12,
        expiry_year: '2023',
        active: 1,
      })
    })

  })
})
