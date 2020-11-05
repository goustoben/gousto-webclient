import fetch from 'utils/fetch'
import {
  authPayment,
  checkPayment,
  fetchPayPalToken,
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

jest.mock('utils/fetch', () => (
  jest.fn().mockImplementation( (token, url) => {
    const getData = async () => {
      if (url.indexOf('/token') >= 0) {
        return mockPayPalTokenResponse
      } else {
        return url.indexOf('payment-auth') >= 0 ? mockPaymentAuthResponse : mockPaymentCheckResponse
      }
    }

    return getData()
  })
))

jest.mock('config/endpoint', () =>
  jest.fn().mockImplementation((service, version = '') => `/${service}/${version}`)
)

describe('Payments API', () => {
  const expectedHeaders = { 'Content-Type': 'application/json'}

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

    test('should send payment auth request', async () => {
      await authPayment(request)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, '/payments/v1/payments/payment-auth', request, 'POST', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await authPayment(request)

      expect(result).toEqual(mockPaymentAuthResponse)
    })
  })

  describe('checkPayment', () => {
    const sessionId = 'sid_uc5jwt6ox4ue7bi2l5tpcnvr4i'

    test('should fetch payment auth request status', async () => {
      await checkPayment(sessionId)

      expect(fetch).toHaveBeenCalledTimes(1)
      expect(fetch).toHaveBeenCalledWith(null, `/payments/v1/payments/payments/${sessionId}`, null, 'GET', undefined, expectedHeaders)
    })

    test('should return the results of the fetch unchanged', async () => {
      const result = await checkPayment(sessionId)

      expect(result).toEqual(mockPaymentCheckResponse)
    })
  })

  describe('fetchPayPalToken', () => {
    test('should fetch PayPal client token', async () => {
      const expectedUrl = '/payments/v1/payments/token'
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
})
