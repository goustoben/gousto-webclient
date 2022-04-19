import Immutable from 'immutable'
import customersApi, { customerSignup } from 'apis/customers'
import { PaymentMethod } from 'config/signup'
import { actionTypes } from 'actions/actionTypes'
import { deliveryTariffTypes } from 'utils/deliveries'
import {
  trackFirstPurchase,
  trackNewUser,
  trackNewOrder,
  trackUnexpectedSignup,
} from 'actions/tracking'
import { placeOrder } from 'actions/trackingKeys'

import { trackCheckoutUrgencyAction, userSubscribe } from '../checkoutActions'

jest.mock('actions/tracking', () => ({
  trackFirstPurchase: jest.fn(() => ({ action: 'track_first_purchase' })),
  trackNewUser: jest.fn(() => ({ action: 'track_new_user' })),
  trackNewOrder: jest.fn(() => ({ action: 'track_new_order' })),
  trackUnexpectedSignup: jest.fn(() => ({ action: 'track_unexpected_signup' })),
}))

const formValues = {
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
        firstName: 'John',
        lastName: 'Doe',
      },
    },
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
      },
    },
  },
  yourdetails: {
    values: {
      delivery: {
        companyName: 'My Address',
        houseNo: '',
        street: '',
        line3: '',
        town: '',
        county: '',
        postcode: '',
      },
    },
  },
}

jest.mock('apis/customers', () => ({
  customerSignup: jest.fn(),
}))

jest.mock('utils/isomorphicEnvironment', () => ({
  getEnvironment: () => 'local',
}))

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

  describe('userSubscribe action', () => {
    let state
    const dispatch = jest.fn()
    const getState = jest.fn()

    const pricing = {
      total: '24.55',
      promoCode: false,
    }
    beforeEach(() => {
      customerSignup.mockClear()
      state = {
        basket: Immutable.fromJS({
          boxId: 123,
        }),
        checkout: Immutable.fromJS({
          goustoRef: '105979923',
        }),
        tracking: Immutable.fromJS({
          asource: null,
        }),
        payment: Immutable.fromJS({
          paymentMethod: PaymentMethod.Card,
          paypalNonce: 'vbfv_ss8',
          paypalDeviceData: 'test-device-data',
        }),
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
        form: {
          account: {
            values: {
              account: {
                email: 'test_email@test.com',
              },
            },
          },
          ...formValues,
        },
        features: Immutable.fromJS({}),
      }
      getState.mockReturnValue(state)

      customerSignup.mockReturnValue(
        new Promise((resolve) => {
          resolve({
            data: {
              customer: {
                goustoReference: '123',
              },
              addresses: {},
              subscription: {},
              orderId: '12345',
            },
          })
        })
      )
    })

    describe('when card method is selected', () => {
      const goustoRef = '105979923'

      beforeEach(() => {
        state = {
          ...state,
          features: Immutable.fromJS({
            ndd: {
              value: deliveryTariffTypes.NON_NDD,
            },
          }),
        }
        getState.mockReturnValue(state)
      })

      test('should add gousto_ref param for the user signup request', async () => {
        const expected = expect.objectContaining({
          customer: expect.objectContaining({
            gousto_ref: goustoRef,
          }),
        })

        await userSubscribe({ pricing })(dispatch, getState)

        expect(customerSignup).toHaveBeenCalledWith(null, expected)
      })
    })

    describe('Customer signed up successfully', () => {
      describe('Given valid request data', () => {
        beforeEach(() => {
          getState.mockReturnValue({
            ...state,
            features: Immutable.fromJS({}),
            user: Immutable.fromJS({}),
          })
          customerSignup.mockResolvedValue({
            data: {
              customer: {
                id: '22',
                goustoReference: '123',
              },
              addresses: {},
              subscription: {},
              orderId: '12345',
            },
          })
        })

        describe('When userSubscribe got dispatched', () => {
          test('Then new customer should be tracked', async () => {
            await userSubscribe({ pricing })(dispatch, getState)

            expect(dispatch).toHaveBeenNthCalledWith(2, {
              type: actionTypes.ERROR,
              key: actionTypes.USER_SUBSCRIBE,
              value: null,
            })

            expect(dispatch).toHaveBeenNthCalledWith(3, {
              type: actionTypes.PENDING,
              key: actionTypes.USER_SUBSCRIBE,
              value: true,
            })

            expect(trackNewUser).toHaveBeenCalledWith('22')
            expect(dispatch).toHaveBeenNthCalledWith(4, {
              action: 'track_new_user',
            })

            expect(dispatch).toHaveBeenNthCalledWith(5, {
              type: actionTypes.CHECKOUT_ORDER_PLACED,
              trackingData: {
                actionType: placeOrder,
                order_id: '12345',
                order_total: '24.55',
                promo_code: false,
                signup: true,
                subscription_active: true,
                interval_id: 1,
              },
            })

            expect(trackFirstPurchase).toHaveBeenCalledWith('12345', pricing)
            expect(dispatch).toHaveBeenNthCalledWith(6, {
              action: 'track_first_purchase',
            })

            expect(trackNewOrder).toHaveBeenCalledWith('12345', '22')
            expect(dispatch).toHaveBeenNthCalledWith(7, {
              action: 'track_new_order',
            })
          })
        })
      })
    })

    describe('trim function in reqdata', () => {
      let expectedParam
      const trimState = {
        basket: Immutable.fromJS({
          boxId: 123,
        }),
        checkout: Immutable.fromJS({
          goustoRef: '105979923',
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '24.55',
            promoCode: false,
          },
        }),
        tracking: Immutable.fromJS({
          asource: null,
        }),
        request: Immutable.fromJS({
          browser: 'desktop',
        }),
        features: Immutable.fromJS({
          ndd: {
            value: '',
          },
        }),
        form: {
          account: {
            values: {
              account: {
                email: 'test_email@test.com',
              },
            },
          },
          ...formValues,
        },
        payment: Immutable.fromJS({
          paymentMethod: PaymentMethod.Card,
        }),
      }

      beforeEach(() => {
        expectedParam = {
          order_id: undefined,
          promocode: '',
          customer: {
            tariff_id: '',
            phone_number: '',
            email: 'test_email@test.com',
            name_first: 'John',
            name_last: 'Doe',
            promo_code: '',
            password: undefined,
            age_verified: 0,
            marketing_do_allow_email: 0,
            marketing_do_allow_thirdparty: 0,
            delivery_tariff_id: '9037a447-e11a-4960-ae69-d89a029569af',
            gousto_ref: '105979923',
          },
          addresses: {
            billing_address: {
              county: '',
              line1: '',
              line2: '',
              line3: '',
              name: 'My Address',
              postcode: '',
              town: '',
              type: 'billing',
            },
            shipping_address: {
              county: '',
              delivery_instructions: undefined,
              line1: '',
              line2: '',
              line3: '',
              name: 'My Address',
              postcode: '',
              town: '',
              type: 'shipping',
            },
          },
          subscription: {
            interval_id: 1,
            delivery_slot_id: undefined,
            box_id: 123,
          },
          decoupled: {
            payment: 1,
          },
        }
      })

      describe('single word names', () => {
        beforeEach(() => {
          getState.mockReturnValue(trimState)
        })

        test('should trim whitespace from before and after the user name', async () => {
          const customerSignupSpy = jest.spyOn(customersApi, 'customerSignup')

          await userSubscribe({ pricing })(dispatch, getState)

          expect(customerSignupSpy).toHaveBeenCalledWith(null, expectedParam)
        })
      })

      describe('multiple first names', () => {
        const secondTrimState = {
          ...trimState,
          form: {
            account: {
              values: {
                account: {
                  email: 'test_email@test.com',
                  allowEmail: true,
                },
              },
            },
            ...formValues,
          },
        }
        beforeEach(() => {
          getState.mockReturnValue(secondTrimState)
        })

        test('should allow a name to have a space in the middle', async () => {
          expectedParam.customer.name_first = 'John'
          expectedParam.customer.marketing_do_allow_email = 1
          const customerSignupSpy = jest.spyOn(customersApi, 'customerSignup')

          await userSubscribe({ pricing })(dispatch, getState)

          expect(customerSignupSpy).toHaveBeenCalledWith(null, expectedParam)
        })
      })
    })

    describe('signup AB test variant forwarding', () => {
      const getSignupPayload = () => customerSignup.mock.calls[0][1]

      describe('When no signup feature flags active', () => {
        test('Signup payload has no ab_variant', async () => {
          await userSubscribe({ pricing })(dispatch, getState)

          const payload = getSignupPayload()
          expect(payload.ab_variant).toBeUndefined()
        })
      })
    })

    describe('when boxId is missing', () => {
      beforeEach(() => {
        const localState = {
          ...state,
          basket: Immutable.fromJS({
            boxId: null,
          }),
        }
        getState.mockReturnValue(localState)
      })

      test('should track unexpected signup event', async () => {
        await userSubscribe({ pricing })(dispatch, getState)

        expect(trackUnexpectedSignup).toHaveBeenCalled()
      })
    })

    describe('when request fails', () => {
      beforeEach(() => {
        jest.clearAllMocks()
        customerSignup.mockImplementation(() => {
          throw new Error('endpoint error')
        })
      })

      test('then it should handle and rethrow the error', async () => {
        try {
          await userSubscribe({ pricing })(dispatch, getState)
          fail('Should not reach here')
        } catch (error) {
          expect(dispatch).toHaveBeenNthCalledWith(
            6,
            expect.objectContaining({
              type: actionTypes.CHECKOUT_ORDER_FAILED,
            })
          )
          expect(error).toMatchObject(new Error('endpoint error'))
        }
      })
    })
  })
})
