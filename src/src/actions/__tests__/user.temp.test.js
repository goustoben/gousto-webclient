import Immutable from 'immutable'

import { referAFriend } from 'apis/user'
import { customerSignup } from 'apis/customers'

import { DeliveryTariffTypes } from 'utils/deliveries'

import userActions, {
  userReferAFriend,
  userSubscribe,
  userFetchReferralOffer,
  trackingReferFriend,
  trackingReferFriendSocialSharing,
  userLoadCookbookRecipes,
  userGetReferralDetails,
} from 'actions/user'
import recipeActions from 'actions/recipes'
import actionTypes from 'actions/actionTypes'
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

jest.mock('actions/recipes', () => ({
  recipesLoadRecipesById: jest.fn()
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

    it('should dispatch userLoadOrders and userLoadProjectedDeliveries actions', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(dispatchSpy.mock.calls.length).toEqual(3)
      expect(userActions.userLoadOrders).toHaveBeenCalled()
      expect(userActions.userLoadProjectedDeliveries).toHaveBeenCalled()
    })

    it('should call transformPendingOrders function with the correct params', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(transformPendingOrders).toHaveBeenCalledWith(getStateSpy().user.get('orders'))
    })

    it('should call transformProjectedDeliveries function with the correct params', async () => {
      await userActions.userLoadNewOrders()(dispatchSpy, getStateSpy)

      expect(transformProjectedDeliveries).toHaveBeenCalledWith(getStateSpy().user.get('projectedDeliveries'))
    })

    it('should dispatch an action with the correct parameters', async () => {
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
                card: {
                  paymentProvider: 'checkout'
                }
              }
            }
          })
        })
      )
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

      it('should call customerSignup', async () => {
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
                value: value,
              }
            })
          }

          getState.mockReturnValue(state)

          customerObject = {
            age_verified: 0,
            delivery_tariff_id: value ? DeliveryTariffTypes.FREE_NDD : DeliveryTariffTypes.NON_NDD,
            email: 'test_email@test.com',
            marketing_do_allow_email: 0,
            marketing_do_allow_thirdparty: 0,
            name_first: undefined,
            promo_code: '',
            name_last: undefined,
            password: undefined,
            phone_number: '',
            salutation_id: undefined,
            tariff_id: '',
          }
        }

        it('should call customerSignup with the correct delivery_tariff_id when NDD experiment is not defined', async () => {
          setNddExperiment(false)

          await userSubscribe()(dispatch, getState)

          expect(customerSignup).toHaveBeenCalledWith(
            null,
            expect.objectContaining({
              customer: customerObject,
            }),
          )
        })

        it('should call customerSignup with the correct delivery_tariff_id when in NDD experiment', async () => {
          setNddExperiment(true)

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

    it('should dispatch an action given as parameters', async () => {
      await trackingReferFriend(actionType, trackingType)(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionType,
        trackingData: {
          actionType: trackingType
        }
      })
    })

    it('should not dispatch an action if actionType is undefined', async () => {
      await trackingReferFriend('', trackingType)(dispatchSpy)

      expect(dispatchSpy).not.toHaveBeenCalled()
    })

    it('should not dispatch an action if trackingType is undefined', async () => {
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

    it('should dispatch an action and channel given as parameters', async () => {
      await trackingReferFriendSocialSharing(actionType, trackingType, channel)(dispatchSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionType,
        trackingData: {
          actionType: trackingType,
          channel: channel
        }
      })
    })

    it('should not dispatch an action if actionType is undefined', async () => {
      await trackingReferFriendSocialSharing('', trackingType, channel)(dispatchSpy)

      expect(dispatchSpy).not.toHaveBeenCalled()
    })

    it('should not dispatch an action if trackingType is undefined', async () => {
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

    it('should dispatch an action with the correct parameters', async () => {
      await userGetReferralDetails()(dispatchSpy, getStateSpy)

      expect(dispatchSpy).toHaveBeenCalledWith({
        type: actionTypes.USER_LOAD_REFERRAL_DETAILS,
        referralDetails
      })
    })

    it('should return an error if api is not called with the correct access token', async () => {
      getStateSpy.mockReturnValue({
        auth: Immutable.fromJS({
          accessToken: '123456'
        })
      })

      await userGetReferralDetails()(dispatchSpy, getStateSpy)

      expect(logger.error).toHaveBeenCalled()
    })
  })
})
