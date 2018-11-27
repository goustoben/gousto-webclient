import Immutable from 'immutable'

import { referAFriend } from 'apis/user'
import { customerSignup, customerSignupV2 } from 'apis/customers'

import { userReferAFriend, userSubscribe } from 'actions/user'

jest.mock('apis/user', () => ({
  referAFriend: jest.fn()
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
        form: {
          checkout: {
            values: {
              aboutyou: {
                email: 'test_email@test.com',
              },
              delivery: {
                companyName: 'My Address',
                houseNo: '',
                street: '',
                line3: '',
                town: '',
                county: '',
                postcode: '',
              },
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
            orderId: {}
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
            orderId: {}
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
})
