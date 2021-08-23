import Immutable from 'immutable'

import { skipDelivery, serverReferAFriend, fetchUserCredit, applyPromo } from 'apis/user'
import customersApi, { customerSignup } from 'apis/customers'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import * as prospectAPI from 'apis/prospect'

import { actionTypes } from 'actions/actionTypes'
import { placeOrder } from 'actions/trackingKeys'
import userActions, {
  userReferAFriend,
  userSubscribe,
  userFetchReferralOffer,
  trackingReferFriend,
  trackingReferFriendSocialSharing,
  userLoadCookbookRecipes,
  userGetReferralDetails,
  userLoadOrderTrackingInfo,
  userLoadProjectedDeliveries,
} from 'actions/user'
import recipeActions from 'actions/recipes'
import {
  trackFirstPurchase,
  trackNewUser,
  trackNewOrder,
  trackUnexpectedSignup,
} from 'actions/tracking'

import { PaymentMethod, signupConfig } from 'config/signup'

import logger from 'utils/logger'
import { deliveryTariffTypes } from 'utils/deliveries'
import {
  transformPendingOrders,
  transformProjectedDeliveries,
  transformProjectedDeliveriesNew,
} from 'utils/myDeliveries'
import {
  getIsNewSubscriptionApiEnabled,
  getIsDecoupledPaymentEnabled,
} from 'selectors/features'
import { skipDates } from 'routes/Account/apis/subscription'
import * as orderV2Apis from 'routes/Account/MyDeliveries/apis/orderV2'

jest.mock('selectors/features')

jest.mock('apis/user', () => ({
  skipDelivery: jest.fn(),
  serverReferAFriend: jest.fn(),
  fetchUserCredit: jest.fn(),
  applyPromo: jest.fn(),
  fetchUserProjectedDeliveries: jest.fn().mockImplementation(
    () => Promise.resolve({ data: {} })
  ),
  referralDetails: jest.fn().mockImplementation(accessToken => {
    if (accessToken !== 'user-access-token') {
      return null
    }

    return Promise.resolve({ data: {} })
  }),
  fetchReferralOffer: () =>
    Promise.resolve({
      data: {
        creditFormatted: '£15',
        firstBoxDiscountFormatted: '50%',
        firstMonthDiscountFormatted: '30%',
        expiry: ''
      }
    }),
}))

jest.mock('apis/customers', () => ({
  customerSignup: jest.fn()
}))

jest.mock('apis/deliveries')

jest.mock('actions/recipes', () => ({
  recipesLoadRecipesById: jest.fn()
}))

jest.mock('actions/tracking', () => ({
  trackFirstPurchase: jest.fn(() => ({ action: 'track_first_purchase' })),
  trackNewUser: jest.fn(() => ({ action: 'track_new_user' })),
  trackNewOrder: jest.fn(() => ({ action: 'track_new_order' })),
  trackSubscriptionCreated: jest.fn(() => ({ action: 'track_subscription_created' })),
  trackUnexpectedSignup: jest.fn(() => ({ action: 'track_unexpected_signup' })),
}))

jest.mock('apis/prospect', () => ({
  storeProspect: jest.fn()
}))

jest.mock('../../routes/Account/apis/subscription', () => ({
  skipDates: jest.fn(),
  fetchProjectedDeliveries: () => Promise.resolve({
    data: {
      data: {
        projectedDeliveries: {}
      },
    },
  })
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('utils/myDeliveries', () => ({
  transformPendingOrders: jest.fn(),
  transformProjectedDeliveries: jest.fn(),
  transformProjectedDeliveriesNew: jest.fn(),
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
        postcode: ''
      }
    }
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
        postcode: ''
      }
    }
  },
}

describe('user actions', () => {
  const [dispatch, getState] = [jest.fn(), jest.fn()]

  describe('userClearData', () => {
    const dispatchSpy = jest.fn()

    test('should dispatch action for USER_CLEAR_DATA', async () => {
      userActions.userClearData()(dispatchSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_CLEAR_DATA
      })
    })
  })

  describe('userLoadNewOrders', () => {
    const dispatchSpy = jest.fn()
    let getStateSpy = jest.fn()

    beforeEach(() => {
      getStateSpy = jest.fn().mockReturnValue({
        user: Immutable.fromJS({
          orders: {},
          projectedDeliveries: {},
        }),
      })
    })

    const pendingOrders = Immutable.Map()

    userActions.userLoadOrders = jest.fn()
    // eslint-disable-next-line import/no-named-as-default-member
    userActions.userLoadProjectedDeliveries = jest.fn().mockReturnValue(() => { })
    transformPendingOrders.mockReturnValue(Immutable.Map())
    transformProjectedDeliveries.mockReturnValue(Immutable.Map())
    transformProjectedDeliveriesNew.mockReturnValue(Immutable.Map())

    test('should dispatch userLoadOrders and userLoadProjectedDeliveries actions', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(dispatchSpy.mock.calls.length).toEqual(3)
      expect(userActions.userLoadOrders).toHaveBeenCalled()
      // eslint-disable-next-line import/no-named-as-default-member
      expect(userActions.userLoadProjectedDeliveries).toHaveBeenCalled()
    })

    test('should call transformPendingOrders function with the correct params', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(transformPendingOrders).toHaveBeenCalledWith(getStateSpy().user.get('orders'))
    })

    test('should call transformProjectedDeliveries function with the correct params', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(transformProjectedDeliveries).toHaveBeenCalledWith(getStateSpy().user.get('projectedDeliveries'))
    })

    test('should dispatch an action with the correct parameters', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(dispatchSpy.mock.calls[2][0]).toEqual({
        type: actionTypes.MYDELIVERIES_ORDERS,
        orders: pendingOrders,
      })
    })

    describe('when isNewSubscriptionApiEnabled is set to true', () => {
      test('should call transformProjectedDeliveriesNew function with the correct params', async () => {
        getIsNewSubscriptionApiEnabled.mockReturnValueOnce(true)

        await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

        expect(transformProjectedDeliveriesNew).toHaveBeenCalledWith(getStateSpy().user.get('projectedDeliveries'))
      })
    })
  })

  describe('userReferAFriend action', () => {
    const email = 'test@test.com'
    const recaptchaToken = 'recaptcha-token'

    beforeEach(() => {
      serverReferAFriend.mockClear()
    })

    test('should dispatch a serverReferAFriend request with the given email and recaptchaToken', () => {
      userReferAFriend(email, recaptchaToken)(dispatch, getState)

      expect(serverReferAFriend).toHaveBeenCalledWith(email, recaptchaToken)
    })

    test('should log an error when the call fail', async () => {
      serverReferAFriend.mockRejectedValueOnce()

      await userReferAFriend(email, recaptchaToken)(dispatch, getState)

      expect(logger.error).toHaveBeenCalledWith(
        expect.objectContaining({
          message: 'Failed to call refer a friend',
        })
      )
    })
  })

  describe('userSubscribe action', () => {
    let state

    beforeEach(() => {
      getIsDecoupledPaymentEnabled.mockReturnValue(false)
      customerSignup.mockClear()
      state = {
        basket: Immutable.fromJS({
          boxId: 123,
        }),
        checkout: Immutable.fromJS({
          goustoRef: '105979923',
        }),
        pricing: Immutable.fromJS({
          prices: {
            total: '24.55',
            promoCode: false
          }
        }),
        tracking: Immutable.fromJS({
          asource: null
        }),
        payment: Immutable.fromJS({
          paymentMethod: PaymentMethod.Card,
          paypalNonce: 'vbfv_ss8',
          paypalDeviceData: 'test-device-data',
        }),
        request: Immutable.fromJS({
          browser: 'desktop'
        }),
        form: {
          account: {
            values: {
              account: {
                email: 'test_email@test.com'
              }
            }
          },
          ...formValues,
        },
        features: Immutable.fromJS({})
      }
      getState.mockReturnValue(state)

      customerSignup.mockReturnValue(
        new Promise(resolve => {
          resolve({
            data: {
              customer: {
                goustoReference: '123'
              },
              addresses: {},
              subscription: {},
              orderId: '12345',
            }
          })
        })
      )
    })

    describe('when order is submitted', () => {
      beforeEach(() => {
        const localState = {
          ...state,
          features: Immutable.fromJS({
            ndd: {
              value: false,
            },
          })
        }
        getState.mockReturnValue(localState)
      })
    })

    describe('when card method is selected', () => {
      const sca3ds = true
      const sessionId = 'src_5opchaqiwjbundi47kpmm6weka'
      const goustoRef = '105979923'

      beforeEach(() => {
        state = {
          ...state,
          features: Immutable.fromJS({
            ndd: {
              value: deliveryTariffTypes.NON_NDD,
            },
          })
        }
        getState.mockReturnValue(state)
      })

      test('should add "3ds=true" param to the user signup request', async () => {
        const expected = expect.objectContaining({
          '3ds': 1
        })

        await userSubscribe(sca3ds, sessionId)(dispatch, getState)

        expect(customerSignup).toHaveBeenCalledWith(null, expected)
      })

      test('should replace card token by checkout session id for the user signup request', async () => {
        const expected = expect.objectContaining({
          payment_method: expect.objectContaining({
            card: expect.objectContaining({
              card_token: sessionId
            })
          })
        })

        await userSubscribe(sca3ds, sessionId)(dispatch, getState)

        expect(customerSignup).toHaveBeenCalledWith(null, expected)
      })

      test('should add gousto_ref param for the user signup request', async () => {
        const expected = expect.objectContaining({
          customer: expect.objectContaining({
            gousto_ref: goustoRef
          })
        })

        await userSubscribe(sca3ds, sessionId)(dispatch, getState)

        expect(customerSignup).toHaveBeenCalledWith(null, expected)
      })
    })

    describe('when PayPal payment method is selected', () => {
      const sca3ds = true
      const sessionId = 'src_5opchaqiwjbundi47kpmm6weka'

      beforeEach(() => {
        state = {
          ...state,
          payment: Immutable.fromJS({
            paymentMethod: PaymentMethod.PayPal,
            paypalNonce: 'vbfv_ss8',
            paypalDeviceData: 'test-device-data',
          }),
          features: Immutable.fromJS({
            ndd: {
              value: deliveryTariffTypes.NON_NDD,
            },
          })
        }
        getState.mockReturnValue(state)
      })

      test('should not add "3ds=true" param to the user signup request', async () => {
        await userSubscribe(sca3ds, sessionId)(dispatch, getState)

        expect(customerSignup.mock.calls[0][1]['3ds']).toBe(0)
      })

      test('should have PayPal payment method', async () => {
        const expected = expect.objectContaining({
          payment_method: {
            is_default: 1,
            type: signupConfig.payment_types.paypal,
            name: 'My PayPal',
            paypal: {
              payment_provider: 'paypal',
              active: 1,
              token: 'vbfv_ss8',
              device_data: 'test-device-data',
            }
          }
        })

        await userSubscribe(sca3ds, sessionId)(dispatch, getState)

        expect(customerSignup).toHaveBeenCalledWith(null, expected)
      })
    })

    describe('Customer signed up successfully', () => {
      describe('Given valid request data', () => {
        beforeEach(() => {
          getState.mockReturnValue({
            ...state,
            features: Immutable.fromJS({}),
            user: Immutable.fromJS({})
          })
          customerSignup.mockResolvedValue({
            data: {
              customer: {
                id: '22',
                goustoReference: '123'
              },
              addresses: {},
              subscription: {},
              orderId: '12345',
            }
          })
        })

        describe('When userSubscribe got dispatched', () => {
          test('Then new customer should be tracked', async () => {
            await userSubscribe()(dispatch, getState)

            expect(dispatch).toHaveBeenNthCalledWith(1, {
              type: actionTypes.ERROR,
              key: actionTypes.USER_SUBSCRIBE,
              value: null
            })

            expect(dispatch).toHaveBeenNthCalledWith(2, {
              type: actionTypes.PENDING,
              key: actionTypes.USER_SUBSCRIBE,
              value: true
            })

            expect(trackNewUser).toHaveBeenCalledWith('22')
            expect(dispatch).toHaveBeenNthCalledWith(3, {
              action: 'track_new_user'
            })

            expect(dispatch).toHaveBeenNthCalledWith(4, {
              type: actionTypes.CHECKOUT_ORDER_PLACED,
              trackingData: {
                actionType: placeOrder,
                order_id: '12345',
                order_total: '24.55',
                promo_code: false,
                signup: true,
                subscription_active: true,
                interval_id: 1
              }
            })

            expect(trackFirstPurchase).toHaveBeenCalledWith('12345', state.pricing.get('prices'))
            expect(dispatch).toHaveBeenNthCalledWith(5, {
              action: 'track_first_purchase'
            })

            expect(trackNewOrder).toHaveBeenCalledWith('12345', '22')
            expect(dispatch).toHaveBeenNthCalledWith(6, {
              action: 'track_new_order'
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
            promoCode: false
          }
        }),
        tracking: Immutable.fromJS({
          asource: null
        }),
        request: Immutable.fromJS({
          browser: 'desktop'
        }),
        features: Immutable.fromJS({
          ndd: {
            value: ''
          }
        }),
        form: {
          account: {
            values: {
              account: {
                email: 'test_email@test.com'
              }
            }
          },
          ...formValues,
        },
        payment: Immutable.fromJS({
          paymentMethod: PaymentMethod.Card,
        })
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
            gousto_ref: '105979923'
          },
          payment_method: {
            is_default: 1,
            type: 'card',
            name: 'My Card',
            card: {
              active: 1,
              card_token: undefined,
              payment_provider: 'checkout',
            }
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
            box_id: 123
          },
          '3ds': 0,
          decoupled: {
            payment: 0,
          }
        }
      })

      describe('single word names', () => {
        beforeEach(() => {
          getState.mockReturnValue(trimState)
        })

        test('should trim whitespace from before and after the user name', async () => {
          const customerSignupSpy = jest.spyOn(customersApi, 'customerSignup')

          await userSubscribe()(dispatch, getState)

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
                }
              }
            },
            ...formValues,
          }
        }
        beforeEach(() => {
          getState.mockReturnValue(secondTrimState)
        })

        test('should allow a name to have a space in the middle', async () => {
          expectedParam.customer.name_first = 'John'
          expectedParam.customer.marketing_do_allow_email = 1
          const customerSignupSpy = jest.spyOn(customersApi, 'customerSignup')

          await userSubscribe()(dispatch, getState)

          expect(customerSignupSpy).toHaveBeenCalledWith(null, expectedParam)
        })
      })
    })

    describe('isDecoupledPaymentEnabled is enabled', () => {
      let expected

      beforeEach(() => {
        state = {
          basket: Immutable.fromJS({
            boxId: 123,
          }),
          checkout: Immutable.fromJS({
            goustoRef: '105979923',
          }),
          pricing: Immutable.fromJS({
            prices: {
              total: '24.55',
              promoCode: false
            }
          }),
          tracking: Immutable.fromJS({
            asource: null
          }),
          request: Immutable.fromJS({
            browser: 'desktop'
          }),
          features: Immutable.fromJS({
            ndd: {
              value: ''
            }
          }),
          form: {
            account: {
              values: {
                account: {
                  email: 'test_email@test.com'
                }
              }
            },
            ...formValues,
          },
          payment: Immutable.fromJS({
            paymentMethod: PaymentMethod.Card,
          })
        }
        expected = {
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
            box_id: 123
          },
          decoupled: {
            payment: 1,
          }
        }

        getIsDecoupledPaymentEnabled.mockReturnValue(true)
        getState.mockReturnValue(state)
      })

      test('should remove payment data from request', async () => {
        const customerSignupSpy = jest.spyOn(customersApi, 'customerSignup')

        await userSubscribe()(dispatch, getState)

        expect(customerSignupSpy).toHaveBeenCalledWith(null, expected)
      })
    })

    describe('signup AB test variant forwarding', () => {
      const getSignupPayload = () => customerSignup.mock.calls[0][1]

      describe('When no signup feature flags active', () => {
        test('Signup payload has no ab_variant', async () => {
          await userSubscribe()(dispatch, getState)

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
            boxId: null
          })
        }
        getState.mockReturnValue(localState)
      })

      test('should track unexpected signup event', async () => {
        await userSubscribe()(dispatch, getState)

        expect(trackUnexpectedSignup).toHaveBeenCalled()
      })
    })
  })

  describe('userProspect', () => {
    const state = {
      basket: Immutable.fromJS({
        promoCode: '',
        previewOrderId: ''
      }),
      routing: {
        locationBeforeTransitions: {
          pathname: '/'
        },
      },
      request: Immutable.fromJS({
        browser: 'desktop'
      }),
      form: {
        account: {
          values: {
            account: {
              email: 'test_email@test.com',
              allowEmail: true,
            }
          }
        },
        ...formValues,
      }
    }
    beforeEach(() => {
      getState.mockReturnValue(state)
    })

    describe('trim function in reqdata', () => {
      describe('single word names', () => {
        test('should trim whitespace from before and after the user name', async () => {
          const expectedParam = {
            email: 'test_email@test.com',
            user_name_first: 'John',
            user_name_last: 'Doe',
            promocode: '',
            allow_marketing_email: true,
            preview_order_id: '',
            step: ''
          }
          const storeProspectSpy = jest.spyOn(prospectAPI, 'storeProspect')
          await userActions.userProspect()(dispatch, getState)
          expect(storeProspectSpy).toHaveBeenCalledWith(expectedParam)
        })
      })

      describe('multiple first names', () => {
        const newState = {
          ...state,
          form: {
            account: {
              values: {
                account: {
                  email: 'test_email@test.com',
                  allowEmail: true,
                }
              }
            },
            ...formValues,
          }
        }
        beforeEach(() => {
          getState.mockReturnValue(newState)
        })
        test('should allow a name to have a space in the middle', async () => {
          const expectedParam = {
            email: 'test_email@test.com',
            user_name_first: 'John',
            user_name_last: 'Doe',
            promocode: '',
            allow_marketing_email: true,
            preview_order_id: '',
            step: ''
          }
          const storeProspectSpy = jest.spyOn(prospectAPI, 'storeProspect')
          await userActions.userProspect()(dispatch, getState)
          expect(storeProspectSpy).toHaveBeenCalledWith(expectedParam)
        })
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
        referralOffer: response
      })
    })
  })

  describe('trackingReferFriend', () => {
    let dispatchSpy = jest.fn()
    const actionType = actionTypes.REFER_FRIEND_SHARE_SHEET_OPENED
    const trackingType = 'ReferFriendShareSheet Opened'

    beforeEach(() => {
      dispatchSpy = jest.fn()
    })

    test('should dispatch an action given as parameters', async () => {
      await trackingReferFriend(actionType, trackingType)(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionType,
        trackingData: {
          actionType: trackingType
        }
      })
    })

    test('should not dispatch an action if actionType is undefined', async () => {
      await trackingReferFriend('', trackingType)(dispatchSpy)

      expect(dispatchSpy).not.toHaveBeenCalled()
    })

    test('should not dispatch an action if trackingType is undefined', async () => {
      await trackingReferFriend(actionType)(dispatchSpy)

      expect(dispatchSpy).not.toHaveBeenCalled()
    })
  })

  describe('trackingReferFriendSocialSharing', () => {
    let dispatchSpy = jest.fn()
    const actionType = actionTypes.REFER_FRIEND_LINK_SHARE
    const trackingType = 'ReferFriendLink Share'
    const channel = 'Email'

    beforeEach(() => {
      dispatchSpy = jest.fn()
    })

    test('should dispatch an action and channel given as parameters', async () => {
      await trackingReferFriendSocialSharing(actionType, trackingType, channel)(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionType,
        trackingData: {
          actionType: trackingType,
          channel
        }
      })
    })

    test('should not dispatch an action if actionType is undefined', async () => {
      await trackingReferFriendSocialSharing('', trackingType, channel)(dispatchSpy)

      expect(dispatchSpy).not.toHaveBeenCalled()
    })

    test('should not dispatch an action if trackingType is undefined', async () => {
      await trackingReferFriendSocialSharing(actionType, '', channel)(dispatchSpy)

      expect(dispatchSpy).not.toHaveBeenCalled()
    })
  })

  describe('userLoadCookbookRecipes', () => {
    const dispatchSpy = jest.fn()
    const getStateSpy = jest.fn()

    getStateSpy.mockReturnValue({
      user: Immutable.fromJS({
        orders: {
          1234: {
            deliveryDate: '2021-02-01 00:00:00',
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '1' },
              { itemableType: 'Recipe', recipeId: '2' },
              { itemableType: 'Recipe', recipeId: '3' },
              { itemableType: 'Recipe', recipeId: '4' }
            ]
          },
          5678: {
            deliveryDate: '2021-01-01 00:00:00',
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '6' },
              { itemableType: 'Recipe', recipeId: '6' }
            ]
          }
        }
      })
    })

    afterEach(() => {
      jest.clearAllMocks()
    })

    test('should call recipesLoadRecipesById with 6 recipe ids', async () => {
      await userLoadCookbookRecipes()(dispatchSpy, getStateSpy)

      expect(recipeActions.recipesLoadRecipesById).toHaveBeenCalledWith(['1', '2', '3', '4', '5', '6'], true)
    })
  })

  describe('userGetReferralDetails', () => {
    const dispatchSpy = jest.fn()
    const getStateSpy = jest.fn()
    const referralDetails = {}

    getStateSpy.mockReturnValue({
      auth: Immutable.fromJS({
        accessToken: 'user-access-token'
      })
    })

    test('should dispatch an action with the correct parameters', async () => {
      await userGetReferralDetails()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_LOAD_REFERRAL_DETAILS,
        referralDetails
      })
    })

    test('should return an error if api is not called with the correct access token', async () => {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({
          accessToken: '123456'
        })
      })

      await userGetReferralDetails()(dispatchSpy, getStateSpy)

      expect(logger.error).toHaveBeenCalled()
    })
  })

  describe('userTrackToggleEditDateSection', () => {
    test('should dispatch a OrderDeliverySlot Edit tracking action', () => {
      const orderId = '12345'
      const dispatchSpy = jest.fn()
      const getStateSpy = () => ({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
              deliverySlotId: 'slotid123',
            })
          })
        })
      })

      userActions.userTrackToggleEditDateSection(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot Edit',
          order_id: '12345',
          original_deliveryslot_id: 'slotid123',
        }
      })
    })
  })

  describe('userTrackToggleEditAddressSection', () => {
    test('should dispatch a OrderDeliveryAddress Edit tracking action', () => {
      const orderId = '12345'
      const dispatchSpy = jest.fn()
      const getStateSpy = () => ({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
              shippingAddressId: 'addressid123',
            })
          })
        })
      })

      userActions.userTrackToggleEditAddressSection(orderId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliveryAddress Edit',
          order_id: '12345',
          original_deliveryaddress_id: 'addressid123',
        }
      })
    })
  })

  describe('userTrackDateSelected', () => {
    test('should dispatch a OrderDeliveryDate Selected tracking action', () => {
      const orderId = '12345'
      const originalSlotId = 'slotid123'
      const newSlotId = 'slotid456'
      const dispatchSpy = jest.fn()
      const getStateSpy = () => ({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
            })
          })
        })
      })

      userActions.userTrackDateSelected(orderId, originalSlotId, newSlotId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliveryDate Selected',
          order_id: '12345',
          original_deliveryslot_id: 'slotid123',
          new_deliveryslot_id: 'slotid456'
        }
      })
    })
  })

  describe('userTrackSlotSelected', () => {
    test('should dispatch a OrderDeliverySlot Selected tracking action', () => {
      const orderId = '12345'
      const originalSlotId = 'slotid123'
      const newSlotId = 'slotid456'
      const dispatchSpy = jest.fn()
      const getStateSpy = () => ({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
            })
          })
        })
      })

      userActions.userTrackSlotSelected(orderId, originalSlotId, newSlotId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliverySlot Selected',
          order_id: '12345',
          original_deliveryslot_id: 'slotid123',
          new_deliveryslot_id: 'slotid456'
        }
      })
    })
  })

  describe('userLoadOrderTrackingInfo', () => {
    let dispatchSpy
    let getStateSpy
    let dispatchCalls
    const EXAMPLE_TRACKING_URL = 'https://tracking-url-example.com'
    const ORDER_ID = '12345'

    beforeEach(() => {
      dispatchSpy = jest.fn()
      getStateSpy = jest.fn()
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({
          accessToken: 'user-access-token'
        })
      })
    })

    afterEach(() => {
      jest.resetAllMocks()
    })

    test('dispatches actions to reflect the request state', async () => {
      fetchDeliveryConsignment.mockResolvedValue({
        data: [{ trackingUrl: EXAMPLE_TRACKING_URL }]
      })

      await userLoadOrderTrackingInfo(ORDER_ID)(dispatchSpy, getStateSpy)
      dispatchCalls = dispatchSpy.mock.calls

      expect(dispatchCalls[0][0]).toEqual({
        type: 'PENDING', key: actionTypes.USER_LOAD_ORDER_TRACKING, value: true
      })
      expect(dispatchCalls[1][0]).toEqual({
        type: 'ERROR', key: actionTypes.USER_LOAD_ORDER_TRACKING, value: false
      })
      expect(dispatchCalls[dispatchCalls.length - 1][0]).toEqual({
        type: 'PENDING', key: actionTypes.USER_LOAD_ORDER_TRACKING, value: false
      })
    })

    describe('when the tracking URL is successfully loaded', () => {
      beforeEach(async () => {
        fetchDeliveryConsignment.mockResolvedValue({
          data: [{ trackingUrl: EXAMPLE_TRACKING_URL }]
        })

        await userLoadOrderTrackingInfo(ORDER_ID)(dispatchSpy, getStateSpy)
        dispatchCalls = dispatchSpy.mock.calls
      })

      test('dispatches an action to store the returned tracking URL', () => {
        expect(dispatchCalls[2][0]).toEqual({
          type: actionTypes.USER_LOAD_ORDER_TRACKING,
          trackingUrl: 'https://tracking-url-example.com'
        })
      })
    })

    describe('when the tracking URL fails to load', () => {
      beforeEach(async () => {
        fetchDeliveryConsignment.mockResolvedValue(() => new Error(''))

        await userLoadOrderTrackingInfo(ORDER_ID)(dispatchSpy, getStateSpy)
        dispatchCalls = dispatchSpy.mock.calls
      })

      test('dispatches actions setting error to true', () => {
        expect(dispatchCalls[2][0]).toEqual({
          type: 'ERROR',
          key: actionTypes.USER_LOAD_ORDER_TRACKING,
          value: true,
        })
      })
    })
  })

  describe('userTrackAddressSelected', () => {
    test('should dispatch a OrderDeliveryAddress Selected tracking action', () => {
      const orderId = '12345'
      const originalAddressId = 'addressid123'
      const newAddressId = 'addressid456'
      const dispatchSpy = jest.fn()
      const getStateSpy = () => ({
        auth: Immutable.Map({ accessToken: 'access-token' }),
        user: Immutable.Map({
          newOrders: Immutable.Map({
            12345: Immutable.Map({
            })
          })
        })
      })

      userActions.userTrackAddressSelected(orderId, originalAddressId, newAddressId)(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'OrderDeliveryAddress Selected',
          order_id: '12345',
          original_deliveryaddress_id: 'addressid123',
          new_deliveryaddress_id: 'addressid456'
        }
      })
    })
  })

  describe('userToggleExpiredBillingModal', () => {
    const dispatchSpy = jest.fn()
    const visibilty = true

    test('should dispatch action for EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE', async () => {
      userActions.userToggleExpiredBillingModal(visibilty)(dispatchSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE, visibility: true
      })
    })
  })

  describe('userOpenCloseOrderCard', () => {
    test('should dispatch userOpenCloseOrderCard with proper params', () => {
      const orderId = '12345'
      const isCollapsed = true
      const dispatchSpy = jest.fn()

      userActions.userOpenCloseOrderCard(orderId, isCollapsed)(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_ORDER_CARD_OPEN_CLOSE,
        orderId,
        isCollapsed
      })
    })
  })

  describe('userToggleEditDateSection', () => {
    test('should dispatch userToggleEditDateSection with proper params', () => {
      const orderId = '12345'
      const editDeliveryMode = false
      const dispatchSpy = jest.fn()

      userActions.userToggleEditDateSection(orderId, editDeliveryMode)(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_ORDER_EDIT_OPEN_CLOSE,
        orderId,
        editDeliveryMode
      })
    })
  })

  describe('checkCardExpiry', () => {
    const dispatchSpy = jest.fn()
    const getStateSpy = (newBillingModal, expiryDate) => () => ({
      features: Immutable.Map({
        newBillingModal: Immutable.Map({
          value: newBillingModal
        })
      }),
      user: Immutable.Map({
        card: Immutable.Map({
          expiryDate
        })
      })
    })

    describe('when newBillingModal is false', () => {
      test('should should not dispatch checkCardExpiry', () => {
        userActions.checkCardExpiry()(dispatchSpy, getStateSpy(false, '2019-05'))

        expect(dispatchSpy).not.toBeCalled()
      })
    })

    describe('when newBillingModal is true', () => {
      describe('and expired is true', () => {
        test('should dispatch checkCardExpiry with proper params', () => {
          userActions.checkCardExpiry()(dispatchSpy, getStateSpy(true, '2020-05'))

          expect(dispatchSpy).toHaveBeenCalledWith({
            type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
            visibility: true
          })
        })
      })

      describe('and expired is false', () => {
        test('should dispatch checkCardExpiry with proper params', () => {
          const now = new Date()
          const expiryDate = `${now.getFullYear() + 1}-05`
          userActions.checkCardExpiry()(dispatchSpy, getStateSpy(true, expiryDate))

          expect(dispatchSpy).toHaveBeenCalledWith({
            type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
            visibility: false
          })
        })
      })
    })
  })

  describe('userFetchCredit', () => {
    const dispatchSpy = jest.fn()
    const getStateSpy = () => ({
      auth: Immutable.Map({ accessToken: 'access-token' }),
    })

    beforeEach(async () => {
      fetchUserCredit.mockReturnValue(
        new Promise(resolve => {
          resolve({
            data: {
              balance: '10'
            }
          })
        })
      )
      await userActions.userFetchCredit()(dispatchSpy, getStateSpy)
    })

    test('then should dispatch proper action and params', () => {
      expect(fetchUserCredit).toHaveBeenCalledWith('access-token')
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_CREDIT,
        userCredit: '10',
      })
    })
  })

  describe('userReactivate', () => {
    const dispatchSpy = jest.fn()
    const user = 'user'

    test('should dispatch action for EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE', async () => {
      userActions.userReactivate(user)(dispatchSpy)
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_REACTIVATE,
        user
      })
    })
  })

  describe('userOrderSkipNextProjected', () => {
    test('should call skipDelivery if isNewSubscriptionApiEnabled experiment is false', async () => {
      getIsNewSubscriptionApiEnabled.mockReturnValueOnce(false)
      skipDelivery.mockResolvedValueOnce()
      const dispatchSpy = jest.fn()
      const getStateSpy = jest.fn().mockReturnValueOnce({
        auth: Immutable.Map({
          accessToken: 'access-token'
        }),
        user: Immutable.fromJS({
          id: 'user-id',
          orders: {},
          projectedDeliveries: {
            2443: {
              id: '2443',
              deliveryDate: '2021-04-14 00:00:00'
            }
          }
        })
      })

      await userActions.userOrderSkipNextProjected()(dispatchSpy, getStateSpy)

      expect(skipDelivery).toHaveBeenCalledWith('access-token', '2443')
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES,
        deliveryDayIds: ['2443'],
      })
    })

    test('should call skipDates if isNewSubscriptionApiEnabled experiment is true', async () => {
      getIsNewSubscriptionApiEnabled.mockReturnValueOnce(true)
      skipDates.mockResolvedValueOnce()
      const dispatchSpy = jest.fn()
      const getStateSpy = jest.fn().mockReturnValueOnce({
        auth: Immutable.Map({
          accessToken: 'access-token'
        }),
        user: Immutable.fromJS({
          id: 'user-id',
          orders: {},
          projectedDeliveries: {
            2443: {
              id: '2443',
              deliveryDate: '2021-04-14 00:00:00'
            }
          }
        })
      })

      await userActions.userOrderSkipNextProjected()(dispatchSpy, getStateSpy)

      expect(skipDates).toHaveBeenCalledWith('access-token', 'user-id', ['2021-04-14'])
      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES,
        deliveryDayIds: ['2443'],
      })
    })
  })

  describe('userLoadProjectedDeliveries', () => {
    const dispatchSpy = jest.fn()

    const getStateSpy = () => ({
      user: Immutable.fromJS({
        projectedDeliveries: {},
        id: 'mock-id',
      }),
      auth: Immutable.fromJS({ accessToken: 'access-token' }),
    })

    test('should dispatch action for USER_LOAD_PROJECTED_DELIVERIES', async () => {
      getIsNewSubscriptionApiEnabled.mockReturnValueOnce(true)

      await userLoadProjectedDeliveries()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_LOAD_PROJECTED_DELIVERIES,
        projectedDeliveries: {},
        isNewSubscriptionApiEnabled: true
      })
    })
  })

  describe('userOrderCancelNext', () => {
    const dispatchSpy = jest.fn()

    beforeEach(() => {
      dispatchSpy.mockReset()

      jest.spyOn(orderV2Apis, 'deleteOrder').mockImplementation()
    })

    const getStateSpy = () => ({
      user: Immutable.fromJS({
        orders: {
          1234: {
            id: '1234',
            phase: 'open',
            deliveryDay: '2021-02-01 00:00:00',
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '1' },
              { itemableType: 'Recipe', recipeId: '2' },
              { itemableType: 'Recipe', recipeId: '3' },
              { itemableType: 'Recipe', recipeId: '4' }
            ]
          },
          5678: {
            id: '5678',
            phase: 'awaiting_choices',
            deliveryDay: '2021-01-01 00:00:00',
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '6' },
              { itemableType: 'Recipe', recipeId: '6' }
            ]
          },
          9101: {
            id: '9101',
            phase: 'closed',
            deliveryDay: '2020-12-22 00:00:00',
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '5' },
              { itemableType: 'Recipe', recipeId: '6' },
              { itemableType: 'Recipe', recipeId: '6' }
            ]
          }
        }
      }),
      auth: Immutable.fromJS({
        id: 'auth-user-id',
        accessToken: 'access-token'
      })
    })

    describe('for first order, in valid phase, sorted by date', () => {
      const expectedOrderId = '5678'

      test('should call deleteOrder', async () => {
        await userActions.userOrderCancelNext()(dispatchSpy, getStateSpy)

        expect(orderV2Apis.deleteOrder).toHaveBeenCalledWith('access-token', expectedOrderId, 'auth-user-id')
      })

      test('should dispatch USER_UNLOAD_ORDERS', async () => {
        await userActions.userOrderCancelNext()(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith({
          type: actionTypes.USER_UNLOAD_ORDERS,
          orderIds: [expectedOrderId]
        })
      })
    })
  })

  describe('userPromoApplyCode', () => {
    const state = {
      auth: Immutable.fromJS({
        accessToken: 'token',
      }),
      promoAgeVerified: false,
      user: {
        ageVerified: false,
      }
    }

    beforeEach(() => {
      getState.mockReturnValue(state)
    })

    describe('when promoAgeVerified is false', () => {
      describe('and userPromoApplyCode is called', () => {
        const promoCode = 'DTI-PROMO-CODE'

        beforeEach(async () => {
          await userActions.userPromoApplyCode(promoCode)(dispatch, getState)
        })

        test('then applyPromo should be called with proper parameters', () => {
          expect(applyPromo).toHaveBeenCalledWith('token', promoCode)
        })
      })
    })
  })
})
