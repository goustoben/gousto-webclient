import Immutable from 'immutable'

import { referAFriend } from 'apis/user'
import { customerSignup, customerSignupV2 } from 'apis/customers'

import { userReferAFriend, userSubscribe, userFetchReferralOffer } from 'actions/user'
import actionTypes from 'actions/actionTypes'

jest.mock('apis/user', () => ({
  referAFriend: jest.fn(),
  fetchReferralOffer: () => Promise.resolve({
    data: {
      creditFormatted: '£15',
      firstBoxDiscountFormatted: '50%',
      firstMonthDiscountFormatted: '30%',
      expiry: ''
    }
  })
}))

jest.mock('apis/customers', () => ({
  customerSignup: jest.fn(),
  customerSignupV2: jest.fn()
}))

describe('user actions', () => {
  const [dispatch, getState] = [jest.fn(), jest.fn()]

  describe('userReferAFriend action', () => {
    const email = 'test@test.com'

    afterEach(() => {
      referAFriend.mockClear()
    })

    describe('when an accessToken is not present in state', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({
            accessToken: ''
          })
        })
      })

      it('should not dispatch a referAFriend request', () => {
        userReferAFriend(email)(dispatch, getState)

        expect(referAFriend).not.toHaveBeenCalled()
      })
    })

    describe('when an accessToken is present in state', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'user-access-token'
          })
        })
      })

      it('should dispatch a referAFriend request with the given email and accessToken', () => {
        userReferAFriend(email)(dispatch, getState)

        expect(referAFriend).toHaveBeenCalledWith('user-access-token', email)
      })
    })
  })

  describe('userSubscribe action', () => {
    let state
    beforeEach(() => {
      state = {
        basket: Immutable.fromJS({}),
        pricing: Immutable.fromJS({
          prices: {
            total: '24.55',
            promoCode: false,
          }
        }),
        tracking: Immutable.fromJS({
          asource: null,
        }),
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
        form: {
          aboutyou: {
            values: {
              aboutyou: {
                email: 'test_email@test.com',
              },
            },
          },
          delivery: {
            values: {
              delivery: {
                companyName: 'My Address',
                houseNo: '',
                street: '',
                line3: '',
                town: '',
                county: '',
                postcode: '',
              }
            }
          },
          payment: {
            values: {
              payment: {
                companyName: 'My Address',
                houseNo: '',
                street: '',
                line3: '',
                town: '',
                county: '',
                postcode: '',
              }
            }
          }
        }
      }
      getState.mockReturnValue(state)
      customerSignup.mockReturnValue(new Promise(resolve => {
        resolve({
          data: {
            customer: {
              goustoReference: '123'
            },
            addresses: {},
            subscription: {},
            orderId: '12345',
            paymentMethod: {
              card: {
                paymentProvider: 'sagepay'
              }
            }
          }
        })
      }))

      customerSignupV2.mockReturnValue(new Promise(resolve => {
        resolve({
          data: {
            customer: {
              goustoReference: '123'
            },
            addresses: {},
            subscription: {},
            orderId: '12345',
            paymentMethod: {
              card: {
                paymentProvider: 'checkout'
              }
            }
          }
        })
      }))
    })
    describe('checkoutPaymentFeature is enabled', () => {
      beforeEach(() => {
        state = {
          ...state,
          features: Immutable.fromJS({
            checkoutPayment: {
              value: true,
            }
          })
        }
        getState.mockReturnValue(state)
      })
      it('should call customerSignupV2', async () => {
        await userSubscribe()(dispatch, getState)
        expect(customerSignupV2).toHaveBeenCalled()
      })
    })

    describe('checkoutPaymentFeature is not enabled', () => {
      it('should call customerSignup', async () => {
        await userSubscribe()(dispatch, getState)
        expect(customerSignup).toHaveBeenCalled()
      })
    })
  })

  describe('userGetRafOffer', () => {
    const dispatchSpy = jest.fn()
    const getStateSpy = jest.fn()
    getStateSpy.mockReturnValue({
      auth: Immutable.fromJS({
        accessToken: 'test-token'
      })
    })
    const response = {
      creditFormatted: '£15',
      firstBoxDiscountFormatted: '50%',
      firstMonthDiscountFormatted: '30%',
      expiry: ''
    }

    test('should dispatch action for USER_LOAD_REFERRAL_OFFER', async () => {
      await userFetchReferralOffer()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_LOAD_REFERRAL_OFFER,
        referralOffer: response,
      })
    })
  })
})
