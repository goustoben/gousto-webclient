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

    test('payment method should be set to card', () => {
      const result = initialState()

      expect(result.get('paymentMethod')).toBe(PaymentMethod.Card)
    })

    test('PayPal client token should not be defined', () => {
      const result = initialState()

      expect(result.get('paypalClientToken')).toBeFalsy()
    })

    test('PayPal nonce should not be defined', () => {
      const result = initialState()

      expect(result.get('paypalNonce')).toBeFalsy()
    })

    test('PayPal device data should not be defined', () => {
      const result = initialState()

      expect(result.get('paypalDeviceData')).toBeFalsy()
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

  describe('when action type is PAYMENT_SET_PAYMENT_METHOD', () => {
    let state
    let result
    const deviceData = JSON.stringify({ correlationId: 'dfasdfs' })

    beforeEach(() => {
      state = initialState()
        .set('paypalNonce', 'kdbfksjfjsbfjgbksdfjh')
        .set('paypalDeviceData', deviceData)

      result = payment(state, {
        type: actionTypes.PAYMENT_SET_PAYMENT_METHOD,
        paymentMethod: PaymentMethod.PayPal
      })
    })

    test('should update paymentMethod', () => {
      expect(result.get('paymentMethod')).toBe(PaymentMethod.PayPal)
    })

    test('should reset PayPal nonce', () => {
      expect(result.get('paypalNonce')).toBeFalsy()
    })

    test('should not reset PayPal device data', () => {
      expect(result.get('paypalDeviceData')).toBe(deviceData)
    })
  })

  describe('when action type is PAYMENT_SET_PAYPAL_CLIENT_TOKEN', () => {
    let state
    let result
    const token = 'ewrtwerdsdssdf'

    beforeEach(() => {
      state = initialState()

      result = payment(state, {
        type: actionTypes.PAYMENT_SET_PAYPAL_CLIENT_TOKEN,
        token
      })
    })

    test('should update PayPal client token', () => {
      expect(result.get('paypalClientToken')).toBe(token)
    })
  })

  describe('when action type is PAYMENT_SET_PAYPAL_NONCE', () => {
    let state
    let result
    const nonce = 'kdbfksjfjsbfjgbksdfjh'

    beforeEach(() => {
      state = initialState()

      result = payment(state, {
        type: actionTypes.PAYMENT_SET_PAYPAL_NONCE,
        nonce
      })
    })

    test('should update PayPal client token', () => {
      expect(result.get('paypalNonce')).toBe(nonce)
    })
  })

  describe('when action type is PAYMENT_SET_PAYPAL_DEVICE_DATA', () => {
    let state
    let result
    const deviceData = JSON.stringify({ correlationId: 'dfasdfs' })

    beforeEach(() => {
      state = initialState()

      result = payment(state, {
        type: actionTypes.PAYMENT_SET_PAYPAL_DEVICE_DATA,
        deviceData
      })
    })

    test('should update PayPal client token', () => {
      expect(result.get('paypalDeviceData')).toBe(deviceData)
    })
  })
})
