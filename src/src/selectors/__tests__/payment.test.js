import Immutable from 'immutable'
import { getPaymentDetails, getChallengeUrl, isModalOpen } from 'selectors/payment'

describe('payment selectors', () => {
  let state = {}

  beforeEach(() => {
    state = {
      features: Immutable.fromJS({
        checkoutPayment: {
          value: true
        },
      }),
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
      },
      payment: Immutable.fromJS({
        challengeUrl: 'https://bank.uk/3dschallenge',
        isModalVisible: false
      }),
    }
  })

  describe('given getPaymentDetails method', () => {
    describe('when checkout payment feature is enabled', () => {
      describe('and token is present', () => {
        test('then should return payment details for checkout', () => {
          const expected = {
            payment_provider: 'checkout',
            active: 1,
            card_token: 'test-token'
          }
          const result = getPaymentDetails(state)

          expect(result).toEqual(expected)
        })
      })
    })
  })

  describe('given getChallengeUrl method', () => {
    describe('when called', () => {
      test('then should return 3DS challenge url from the store', () => {
        const result = getChallengeUrl(state)

        expect(result).toEqual('https://bank.uk/3dschallenge')
      })
    })
  })

  describe('given isModalOpen method', () => {
    describe('when called', () => {
      test('then should return the state of 3DS modal', () => {
        const result = isModalOpen(state)

        expect(result).toEqual(false)
      })
    })
  })
})
