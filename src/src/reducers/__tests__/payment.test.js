import { actionTypes } from 'actions/actionTypes'
import { PaymentMethod } from 'config/signup'
import { payment, initialState } from '../payment'

describe('Payment state', () => {
  const challengeUrl = 'https://bank.uk/3dschallenge'

  describe('initial state', () => {
    test('modal should be hidden', () => {
      const result = initialState()

      expect(result.get('isModalVisible')).toBe(false)
    })

    test('challenge URL should not be defined', () => {
      const result = initialState()

      expect(result.get('challengeUrl')).toBeFalsy()
    })
  })

  describe('when action type is PAYMENT_SHOW_MODAL', () => {
    let state = null
    let result

    beforeEach(() => {
      state = initialState()
      result = payment(
        state,
        {
          type: actionTypes.PAYMENT_SHOW_MODAL,
          challengeUrl,
        }
      )
    })

    test('should show modal', () => {
      expect(result.get('isModalVisible')).toBe(true)
    })

    test('should set challenge URL', () => {
      expect(result.get('challengeUrl')).toEqual(challengeUrl)
    })
  })

  describe('when action type is PAYMENT_HIDE_MODAL', () => {
    let state = null
    let result

    beforeEach(() => {
      state = initialState()
        .set('isModalVisible', true)
        .set('challengeUrl', challengeUrl)
      result = payment(state, { type: actionTypes.PAYMENT_HIDE_MODAL })
    })

    test('should hide modal', () => {
      expect(result.get('isModalVisible')).toBe(false)
    })

    test('should reset challenge URL', () => {
      expect(result.get('challengeUrl')).toBeFalsy()
    })
  })

  describe('when action type is PAYMENT_SET_CURRENT_PAYMENT_METHOD', () => {
    let state

    beforeEach(() => {
      state = initialState()
    })

    test('and Card is chosen: then it should set currentPaymentMethod to card', () => {
      const result = payment(state, {
        type: actionTypes.PAYMENT_SET_CURRENT_PAYMENT_METHOD,
        paymentMethod: PaymentMethod.Card
      })
      expect(result.get('currentPaymentMethod')).toBe(PaymentMethod.Card)
    })

    test('and Paypal is chosen: then it should set currentPaymentMethod to Paypal', () => {
      const result = payment(state, {
        type: actionTypes.PAYMENT_SET_CURRENT_PAYMENT_METHOD,
        paymentMethod: PaymentMethod.Paypal
      })
      expect(result.get('currentPaymentMethod')).toBe(PaymentMethod.Paypal)
    })
  })
})
