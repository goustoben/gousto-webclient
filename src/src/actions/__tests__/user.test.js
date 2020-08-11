import Immutable from 'immutable'

import { referAFriend } from 'apis/user'
import customersApi, { customerSignup } from 'apis/customers'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import prospectAPI from 'apis/prospect'

import { deliveryTariffTypes } from 'utils/deliveries'

import userActions, {
  userReferAFriend,
  userSubscribe,
  userFetchReferralOffer,
  trackingReferFriend,
  trackingReferFriendSocialSharing,
  userLoadCookbookRecipes,
  userGetReferralDetails,
  userLoadOrderTrackingInfo,
} from 'actions/user'
import recipeActions from 'actions/recipes'
import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import logger from 'utils/logger'
import { transformPendingOrders, transformProjectedDeliveries } from 'utils/myDeliveries'

jest.mock('apis/user', () => ({
  referAFriend: jest.fn(),
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
    })
}))

jest.mock('apis/customers', () => ({
  customerSignup: jest.fn()
}))

jest.mock('apis/deliveries')

jest.mock('actions/recipes', () => ({
  recipesLoadRecipesById: jest.fn()
}))

jest.mock('apis/prospect', () => ({
  storeProspect: jest.fn()
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

jest.mock('utils/myDeliveries', () => ({
  transformPendingOrders: jest.fn(),
  transformProjectedDeliveries: jest.fn(),
}))

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
    const getStateSpy = jest.fn().mockReturnValue({
      user: Immutable.fromJS({
        orders: {},
        projectedDeliveries: {}
      })
    })

    const pendingOrders = Immutable.Map()

    userActions.userLoadOrders = jest.fn()
    userActions.userLoadProjectedDeliveries = jest.fn()
    transformPendingOrders.mockReturnValue(Immutable.Map())
    transformProjectedDeliveries.mockReturnValue(Immutable.Map())

    test('should dispatch userLoadOrders and userLoadProjectedDeliveries actions', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(dispatchSpy.mock.calls.length).toEqual(3)
      expect(userActions.userLoadOrders).toHaveBeenCalled()
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
  })

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

      test('should not dispatch a referAFriend request', () => {
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

      test('should dispatch a referAFriend request with the given email and accessToken', () => {
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
        form: {
          aboutyou: {
            values: {
              aboutyou: {
                firstName: 'Barack',
                lastName: 'Obama',
                email: 'test_email@test.com'
              }
            }
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
                postcode: ''
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
          }
        }
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
              paymentMethod: {
                id: 444,
                card: {
                  paymentProvider: 'checkout'
                }
              },
            }
          })
        })
      )
    })

    describe('When successful submitted order', () => {
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

        customerSignup.mockReturnValue(
          new Promise(resolve => {
            resolve({
              data: {
                customer: {
                  id: 111,
                  goustoReference: '9999'
                },
                addresses: {
                  billing_address: 'some address'
                },
                subscription: {
                  id: 222
                },
                orderId: 333,
                paymentMethod: {
                  id: 444,
                  card: {
                    paymentProvider: 'checkout'
                  }
                },
              }
            })
          })
        )
      })

      test('Then should dispatch CHECKOUT_SUBSCRIPTION_CREATED with proper data', async () => {
        await userSubscribe()(dispatch, getState)
        expect(dispatch).toHaveBeenNthCalledWith(9, {
          type: actionTypes.CHECKOUT_SUBSCRIPTION_CREATED,
          trackingData: {
            actionType: trackingKeys.subscriptionCreated,
            promoCode: false,
            userId: 111,
            orderId: 333,
            paymentId: 444,
            subscriptionId: 222
          }
        })
      })
    })

    describe('enable3DSForSignup feature is enabled', () => {
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
            checkoutPayment: {
              value: true,
            },
          })
        }
        getState.mockReturnValue(state)
      })

      test('should add "3ds=true" param to the user signup request', async () => {
        const expected = expect.objectContaining({
          '3ds': true
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

    describe('checkoutPaymentFeature is enabled', () => {
      beforeEach(() => {
        state = {
          ...state,
          features: Immutable.fromJS({
            checkoutPayment: {
              value: true,
            },
          })
        }
        getState.mockReturnValue(state)
      })

      test('should call customerSignup', async () => {
        await userSubscribe()(dispatch, getState)
        expect(customerSignup).toHaveBeenCalled()
      })

      describe('Signing up in/out of NDD experiment', () => {
        let customerObject = {}
        const setNddExperiment = (value) => {
          state = {
            ...state,
            features: Immutable.fromJS({
              ndd: {
                value,
              }
            })
          }

          getState.mockReturnValue(state)

          customerObject = {
            age_verified: 0,
            delivery_tariff_id: value,
            email: 'test_email@test.com',
            marketing_do_allow_email: 0,
            marketing_do_allow_thirdparty: 0,
            name_first: 'Barack',
            promo_code: '',
            name_last: 'Obama',
            password: undefined,
            phone_number: '',
            salutation_id: undefined,
            tariff_id: '',
          }
        }

        describe('when not in NDD experiment', () => {
          test('should call customerSignup with the correct delivery_tariff_id', async () => {
            setNddExperiment(deliveryTariffTypes.NON_NDD)

            await userSubscribe()(dispatch, getState)

            expect(customerSignup).toHaveBeenCalledWith(
              null,
              expect.objectContaining({
                customer: customerObject,
              }),
            )
          })
        })
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
              paymentMethod: {
                card: {
                  paymentProvider: 'checkout'
                }
              }
            }
          })
        })

        describe('When userSubscribe got dispatched', () => {
          beforeEach(async () => {
            await userSubscribe()(dispatch, getState)
          })

          test('Then new customer should be tracked', () => {
            const [userSubscribeError, userSubscribePending, trackNewUser, checkoutOrderPlaced, trackFirstPurchase, trackNewOrderAction] = dispatch.mock.calls
            expect(userSubscribeError[0]).toMatchObject({
              type: actionTypes.ERROR,
              key: actionTypes.USER_SUBSCRIBE,
              value: null
            })
            expect(userSubscribePending[0]).toMatchObject({
              type: actionTypes.PENDING,
              key: actionTypes.USER_SUBSCRIBE,
              value: true
            })
            expect(trackNewUser.pop().key).toEqual(trackingKeys.createUser)
            expect(checkoutOrderPlaced[0]).toMatchObject({
              type: actionTypes.CHECKOUT_ORDER_PLACED,
              trackingData: {}
            })
            expect(trackFirstPurchase[0]).toEqual(expect.any(Function))
            expect(trackNewOrderAction.pop().key).toEqual(trackingKeys.createOrder)
          })
        })
      })
    })

    describe('trim function in reqdata', () => {
      let expectedParam
      const trimState = {
        basket: Immutable.fromJS({}),
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
          aboutyou: {
            values: {
              aboutyou: {
                firstName: ' Barack ',
                lastName: ' Obama ',
                email: 'test_email@test.com'
              }
            }
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
                postcode: ''
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
          }
        }
      }

      beforeEach(() => {
        expectedParam = {
          order_id: undefined,
          promocode: '',
          customer: {
            tariff_id: '',
            phone_number: '',
            email: 'test_email@test.com',
            name_first: 'Barack',
            name_last: 'Obama',
            promo_code: '',
            password: undefined,
            age_verified: 0,
            salutation_id: undefined,
            marketing_do_allow_email: 0,
            marketing_do_allow_thirdparty: 0,
            delivery_tariff_id: '9037a447-e11a-4960-ae69-d89a029569af',
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
            box_id: undefined
          }
        }
      })
      describe('single word names', () => {
        beforeEach(() => {
          getState.mockReturnValue(trimState)
        })
        test('should trim whitespace from before and after the user name', async () => {
          const customerSignupSpy = jest.spyOn(customersApi, 'customerSignup')
          await userActions.userSubscribe()(dispatch, getState)
          expect(customerSignupSpy).toHaveBeenCalledWith(null, expectedParam)
        })
      })

      describe('multiple first names', () => {
        const secondTrimState = {
          ...trimState,
          form: {
            aboutyou: {
              values: {
                aboutyou: {
                  firstName: ' Barack Chad ',
                  lastName: ' Obama ',
                  email: 'test_email@test.com',
                  allowEmail: true,
                }
              }
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
                  postcode: ''
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
            }
          }
        }
        beforeEach(() => {
          getState.mockReturnValue(secondTrimState)
        })
        test('should allow a name to have a space in the middle', async () => {
          const customerSignupSpy = jest.spyOn(customersApi, 'customerSignup')
          await userActions.userSubscribe()(dispatch, getState)
          expect(customerSignupSpy).toHaveBeenCalledWith(null, expectedParam)
        })
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
        aboutyou: {
          values: {
            aboutyou: {
              firstName: ' Barack ',
              lastName: ' Obama ',
              email: 'test_email@test.com',
              allowEmail: true,
            }
          }
        },
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
            user_name_first: 'Barack',
            user_name_last: 'Obama',
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
            aboutyou: {
              values: {
                aboutyou: {
                  firstName: ' Barack Chad ',
                  lastName: ' Obama ',
                  email: 'test_email@test.com',
                  allowEmail: true,
                }
              }
            },
          }
        }
        beforeEach(() => {
          getState.mockReturnValue(newState)
        })
        test('should allow a name to have a space in the middle', async () => {
          const expectedParam = {
            email: 'test_email@test.com',
            user_name_first: 'Barack Chad',
            user_name_last: 'Obama',
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
            recipeItems: [
              { itemableType: 'Recipe', recipeId: '1' },
              { itemableType: 'Recipe', recipeId: '2' },
              { itemableType: 'Recipe', recipeId: '3' },
              { itemableType: 'Recipe', recipeId: '4' }
            ]
          },
          5678: {
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
              isCurrentPeriod: true
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
          isCurrentPeriod: true,
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
              isCurrentPeriod: true
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
          is_current_period: true,
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
              isCurrentPeriod: true
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
          isCurrentPeriod: true,
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
              isCurrentPeriod: true
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
          isCurrentPeriod: true,
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
              isCurrentPeriod: true
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
          is_current_period: true,
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
})
