import { fetch } from 'utils/fetch'
import {
  authPayment,
  checkPayment,
  fetchPayPalToken,
  signupPayment,
  get3DSCompliantToken,
} from '../payments'

const mockPaymentAuthResponse = {
  status: 'ok',
  data: {
    id: '1bdec6e2-0287-4c40-9862-0051615a701b',
    cardToken: 'tok_r6ypmsowikzutmdbmjevwo55ym',
    reference: 'pay_c574pto6na4urgn4yv2v4435bq',
    status: 'challenge-pending',
    value: 3499,
    message: 'Requested redirect link for 3ds authorisation',
    responsePayload: {
      transactionId: 'pay_c574pto6na4urgn4yv2v4435bq',
      reference: '1bdec6e2-0287-4c40-9862-0051615a701b',
      redirectLink: 'https://3ds2-sandbox.ckotech.co/interceptor/3ds_m2hx5mjrgtiupbyng3oxugwbz4',
      message: 'Requested redirect link for 3ds authorisation',
      paymentStatus: 'challenge-pending',
    },
    createdAt: '2020-07-15 09:17:15.974891+00:00',
    updatedAt: '2020-07-15 09:17:19.217302+00:00',
  }
}
const mockPaymentCheckResponse = {
  status: 'ok',
  data: {
    id: 'pay_c574pto6na4urgn4yv2v4435bq',
    amount: 3499,
    approved: true,
    status: 'Authorized',
    sourceId: 'src_hu7vs255rzwebo2nnccyugkiv4'
  }
}
const mockPayPalTokenResponse = {
  status: 'ok',
  data: {
    clientToken: 'dashdasdfaskdfajs'
  }
}
const mockSignupPaymentResponse = {
  status: 'ok',
  data: {
    amount: 2499,
    status: 'authorized'
  }
}

const mock3dsCompliantTokenResponse = {
  status: 'ok',
  data: {
    displayModal: true
  }
}

jest.mock('utils/fetch', () => ({
  fetch: jest.fn().mockImplementation( (token, url) => {
    const getData = async () => {
      if (url.indexOf('/token') >= 0) {
        return mockPayPalTokenResponse
      }

      if (url.indexOf('/signup-payments') >= 0) {
        return mockSignupPaymentResponse
      }

      if (url.indexOf('/payment-auth') >= 0) {
        return mockPaymentAuthResponse
      }

      return mockPaymentCheckResponse
    }

    return getData()
  })
}))

describe('Payments API', () => {
  const expectedHeaders = { 'Content-Type': 'application/json'}
  const sessionId = 'session_id'

  afterEach(() => {
    fetch.mockClear()
  })

  describe('authPayment', () => {
    const request = {
      order_id: 12345,
      card_token: 'tok_r6ypmsowikzutmdbmjevwo55ym',
      amount: 3499,
      '3ds': true,
      success_url: 'https://goust.co.uk/payments/success',
      failure_url: 'https://goust.co.uk/payments/failure',
    }
    let result

    beforeEach(async () => {
      result = await authPayment(request, sessionId)
    })

    test('should send payment auth request', () => {
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/payments/v1/payments/payment-auth?session_id=session_id', request, 'POST', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', () => {
      expect(result).toEqual(mockPaymentAuthResponse)
    })
  })

  describe('checkPayment', () => {
    const checkoutSessionId = 'sid_uc5jwt6ox4ue7bi2l5tpcnvr4i'
    let result

    beforeEach(async () => {
      result = await checkPayment(checkoutSessionId, sessionId)
    })

    test('should fetch payment auth request status', () => {
      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, `https://production-api.gousto.co.uk/payments/v1/payments/payments/${checkoutSessionId}?session_id=session_id`, null, 'GET', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', () => {
      expect(result).toEqual(mockPaymentCheckResponse)
    })
  })

  describe('fetchPayPalToken', () => {
    test('should fetch PayPal client token', async () => {
      const expectedUrl = 'https://production-api.gousto.co.uk/payments/v1/payments/token'
      const expectedQueryParams = { provider: 'paypal' }

      await fetchPayPalToken()

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, expectedUrl, expectedQueryParams, 'GET', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await fetchPayPalToken()

      expect(result).toEqual(mockPayPalTokenResponse)
    })
  })

  describe('signupPayment', () => {
    const request = {
      order_id: 12345,
      card_token: 'tok_r6ypmsowikzutmdbmjevwo55ym',
      amount: 3499,
    }

    test('should send payment auth request', async () => {
      await signupPayment(request, 'paypal', sessionId)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, 'https://production-api.gousto.co.uk/payments/v1/payments/signup-payments?provider=paypal&session_id=session_id', request, 'POST', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await signupPayment(request)

      expect(result).toEqual(mockSignupPaymentResponse)
    })
  })

  describe('get3DSCompliantToken', () => {
    test('should get 3ds compliant token and receive proper response', async () => {
      const goustoRef = 1000
      const expectedUrl = `https://production-api.gousto.co.uk/payments/v1/payments/3ds-compliant/${goustoRef}`
      fetch.mockImplementationOnce(() => mock3dsCompliantTokenResponse)
      const response = await get3DSCompliantToken(goustoRef)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, expectedUrl, {}, 'GET', undefined, expectedHeaders)
      expect(response).toEqual(mock3dsCompliantTokenResponse)
    })
  })
})
