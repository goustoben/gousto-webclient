/* eslint no-use-before-define: ["error", { "functions": false }] */
import Immutable from 'immutable' /* eslint-disable no-caps */
import logger from 'utils/logger'
import * as userApi from 'apis/user'
import { customerSignup } from 'apis/customers'

import * as ordersApi from 'apis/orders'
import * as prospectApi from 'apis/prospect'
import * as addressApi from 'apis/addressLookup'
import GoustoException from 'utils/GoustoException'
import { getAddress } from 'utils/checkout'
import config from 'config/signup'
import moment from 'moment'
import { getPaymentDetails } from 'selectors/payment'
import { getAboutYouFormName, getDeliveryFormName } from 'selectors/checkout'
import statusActions from './status'
import basketActions from './basket'
import actionTypes from './actionTypes'
import { trackFirstPurchase } from './tracking'

const fetchShippingAddressesPending = pending => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_PENDING,
  pending,
})

const fetchedShippingAddresses = shippingAddresses => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE,
  shippingAddresses,
})

const fetchShippingAddressesError = message => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_ERROR,
  message,
})

const userLoadReferralDetails = referralDetails => ({
  type: actionTypes.USER_LOAD_REFERRAL_DETAILS,
  referralDetails,
})

const userActions = {
  checkCardExpiry,
  userOrderCancelNext,
  userOrderSkipNextProjected,
  userSubscribe,
  userRecipeRatings,
  userLoadData,
  userLoadReferralDetails,
  userFetchShippingAddresses,
  userClearData,
  userLoadOrder,
  userLoadOrders,
  userFetchOrders,
  userLoadProjectedDeliveries,
  userReactivate,
  userPromoApplyCode,
  userVerifyAge,
  userProspect,
  userOpenCloseOrderCard,
  userOpenCloseEditSection,
  userToggleExpiredBillingModal,
  userAddPaymentMethod,
  userLoadAddresses,
  userToggleNewAddressModal,
  modalAddressLookup,
  userAddNewAddress,
  userPendingAddressFormData,
  userUnsubscribe,
  userFetchReferralOffer,
}

function userOrderCancelNext(afterBoxNum = 1) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_ORDER_CANCEL_NEXT, true))
    dispatch(statusActions.error(actionTypes.USER_ORDER_CANCEL_NEXT, false))
    const errorPrefix = 'Order skip projected error:'
    const cancellablePhases = ['awaiting_choices', 'open', 'pre_menu']

    try {
      await dispatch(userActions.userLoadOrders())
      const cancellableOrder = getState().user.get('orders').filter(order => cancellablePhases.includes(order.get('phase')) && order.get('number') > afterBoxNum)

      if (cancellableOrder.size) {
        const orderToCancelId = cancellableOrder
          .sort((a, b) => a.get('number') - b.get('number'))
          .first()
          .get('id')

        try {
          const accessToken = getState().auth.get('accessToken')
          await ordersApi.cancelOrder(accessToken, orderToCancelId)
          dispatch({
            type: actionTypes.USER_UNLOAD_ORDERS,
            orderIds: [orderToCancelId],
          })
        } catch (err) {
          throw new GoustoException(`${errorPrefix} attempt to cancel delivery ${orderToCancelId} failed`)
        }
      } else {
        throw new GoustoException(`${errorPrefix} no orders found to cancel`, {
          error: 'no-orders-found',
          level: 'warning',
        })
      }
    } catch (err) {
      const message = err.message || `${errorPrefix} ${err}`
      const error = err.error || message
      const logLevel = err.level || 'error'

      logger[logLevel](message)
      dispatch(statusActions.error(actionTypes.USER_ORDER_CANCEL_NEXT, error))
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_ORDER_CANCEL_NEXT, false))
    }
  }
}

function userOrderSkipNextProjected() {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, true))
    dispatch(statusActions.error(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, false))
    const errorPrefix = 'Order skip projected error:'

    try {
      let projectedOrders = getState().user.get('projectedDeliveries')

      if (!projectedOrders.size) {
        await dispatch(userActions.userLoadProjectedDeliveries())
        projectedOrders = getState().user.get('projectedDeliveries')
      }

      if ((!projectedOrders.size)) {
        throw new GoustoException(`${errorPrefix} no orders found to skip`, {
          error: 'no-orders-found',
          level: 'warning',
        })
      }

      const orderToSkipId = projectedOrders.first().get('id')

      try {
        const accessToken = getState().auth.get('accessToken')
        await userApi.skipDelivery(accessToken, orderToSkipId)
        dispatch({
          type: actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES,
          deliveryDayIds: [orderToSkipId],
        })
      } catch (err) {
        throw new GoustoException(`${errorPrefix} attempt to skip delivery ${orderToSkipId} failed`)
      }
    } catch (err) {
      const message = err.message || `${errorPrefix} ${err}`
      const error = err.error || message
      const logLevel = err.level || 'error'

      logger[logLevel](message)
      dispatch(statusActions.error(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, error))
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_ORDER_SKIP_NEXT_PROJECTED, false))
    }
  }
}

export function userSubscribe() {
  return async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.USER_SUBSCRIBE, null))
    dispatch(statusActions.pending(actionTypes.USER_SUBSCRIBE, true))
    const prices = getState().pricing.get('prices')
    try {
      const { form, basket, promoAgeVerified } = getState()
      const state = getState()
      const deliveryFormName = getDeliveryFormName(state)
      const aboutYouFormName = getAboutYouFormName(state)

      const aboutYou = Immutable.fromJS(form[aboutYouFormName].values).get('aboutyou')
      const delivery = Immutable.fromJS(form[deliveryFormName].values).get('delivery')
      const payment = Immutable.fromJS(form.payment.values).get('payment')

      const deliveryAddress = getAddress(delivery)
      const billingAddress = payment.get('isBillingAddressDifferent') ? getAddress(payment) : deliveryAddress

      const reqData = {
        order_id: basket.get('previewOrderId'),
        promocode: basket.get('promoCode', ''),
        tariff_id: basket.get('tariffId', ''),
        customer: {
          phone_number: delivery.get('phone') ? `0${delivery.get('phone')}` : '',
          email: aboutYou.get('email'),
          name_first: aboutYou.get('firstName'),
          name_last: aboutYou.get('lastName'),
          promo_code: basket.get('promoCode', ''),
          password: aboutYou.get('password'),
          age_verified: Number(promoAgeVerified || false),
          salutation_id: aboutYou.get('title'),
          marketing_do_allow_email: Number(aboutYou.get('allowEmail') || false),
          marketing_do_allow_thirdparty: Number(aboutYou.get('allowThirdPartyEmail') || false),
        },
        payment_method: {
          is_default: 1,
          type: config.payment_types.card,
          name: 'My Card',
          card: getPaymentDetails(state)
        },
        addresses: {
          shipping_address: Object.assign({
            type: config.address_types.shipping,
            delivery_instructions: delivery.get('deliveryInstructionsCustom') || delivery.get('deliveryInstruction'),
          }, deliveryAddress),
          billing_address: Object.assign({
            type: config.address_types.billing,
          }, billingAddress),
        },
        subscription: {
          interval_id: delivery.get('interval_id') || 1,
          delivery_slot_id: basket.get('slotId'),
          box_id: basket.get('boxId'),
        },
      }

      const { data } = await customerSignup(null, reqData)

      if (data.customer && data.addresses && data.subscription && data.orderId) {
        const { customer, addresses, subscription, orderId } = data
        let user = Immutable.fromJS({
          ...customer,
          ...addresses,
          subscription,
        })
        user = user.set('goustoReference', user.get('goustoReference').toString())

        const paymentProvider = data.paymentMethod.card ? data.paymentMethod.card.paymentProvider: ''
        dispatch({
          type: actionTypes.CHECKOUT_ORDER_PLACED,
          trackingData: {
            actionType: 'Order Placed',
            order_id: orderId,
            order_total: prices.get('total'),
            promo_code: prices.get('promoCode'),
            signup: true,
            subscription_active: data.subscription.status ? data.subscription.status.slug : true,
            payment_provider: paymentProvider,
            interval_id: delivery.get('interval_id', '1'),
          }
        })

        dispatch(trackFirstPurchase(orderId))

        dispatch(basketActions.basketPreviewOrderChange(orderId, getState().basket.get('boxId')))
        dispatch({ type: actionTypes.USER_SUBSCRIBE, user })
      } else {
        throw new GoustoException(actionTypes.USER_SUBSCRIBE)
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_SUBSCRIBE, err.message))

      const previewOrderId = getState().basket.get('previewOrderId')

      dispatch({
        type: actionTypes.CHECKOUT_ORDER_FAILED,
        trackingData: {
          actionType: 'Order Failed',
          order_id: previewOrderId,
          promo_code: prices.get('promoCode'),
          signup: true,
          error_reason: err.message,
        }
      })
      logger.error({message: err.message, errors: [err]})
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_SUBSCRIBE, false))
    }
  }
}

function userRecipeRatings() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const { data = {} } = await userApi.userRateCount(accessToken)
    const rateCount = data.count

    dispatch({
      type: actionTypes.USER_RATE_COUNT,
      rateCount,
    })
  }
}

function userLoadData() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const { data = {} } = await userApi.fetchUser(accessToken)
    const user = data.user

    dispatch({
      type: actionTypes.USER_LOAD_DATA,
      user,
    })
  }
}

function userFetchShippingAddresses() {
  return async (dispatch, getState) => {
    dispatch(fetchShippingAddressesPending(true))
    try {
      const accessToken = getState().auth.get('accessToken')
      const { data: shippingAddresses } = await userApi.fetchShippingAddresses(accessToken)
      dispatch(fetchedShippingAddresses(shippingAddresses))

      const address = Immutable.fromJS(shippingAddresses).filter(addr => addr.get('shippingDefault')).first()
      dispatch(basketActions.basketAddressChange(address))
      dispatch(basketActions.basketChosenAddressChange(address))
      dispatch(basketActions.basketPostcodeChangePure(address.get('postcode')))

      dispatch(fetchShippingAddressesPending(false))
    } catch (err) {
      dispatch(fetchShippingAddressesError(err.message))
      dispatch(fetchShippingAddressesPending(false))
    }
  }
}

function userClearData() {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_CLEAR_DATA,
    })
    dispatch(basketActions.basketAddressChange(null))
    dispatch(basketActions.basketChosenAddressChange(null))
    dispatch(basketActions.basketPostcodeChangePure(''))
  }
}

function userLoadOrder(orderId, forceRefresh = false) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS, true))
    dispatch(statusActions.error(actionTypes.USER_LOAD_ORDERS, null))
    try {
      if (forceRefresh || getState().user.get('orders').find(order => order.get('id') === orderId) === undefined) {
        const accessToken = getState().auth.get('accessToken')
        const { data: order } = await ordersApi.fetchOrder(accessToken, orderId, { 'includes[]': 'shipping_address' })

        dispatch({
          type: actionTypes.USER_LOAD_ORDERS,
          orders: [order],
        })
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_LOAD_ORDERS, err.message))
      logger.error(err)
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS, false))
    }
  }
}

function userLoadOrders(forceRefresh = false, orderType = 'pending', number = 10) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS, true))
    try {
      if (forceRefresh || !getState().user.get('orders').size) {
        const accessToken = getState().auth.get('accessToken')
        const { data: orders } = await userApi.fetchUserOrders(accessToken, { limit: number, sort_order: 'desc', state: orderType, includes: ['shipping_address'] })
        dispatch({
          type: actionTypes.USER_LOAD_ORDERS,
          orders,
        })
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_LOAD_ORDERS, err.message))
      logger.error(err)
      throw err
    }
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS, false))
  }
}

function userFetchOrders(forceRefresh = false) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS_NEW, true))
    dispatch(statusActions.error(actionTypes.USER_LOAD_ORDERS_NEW, null))
    try {
      if (forceRefresh || !getState().user.get('newOrders').size) {
        const accessToken = getState().auth.get('accessToken')
        const userId = getState().user.get('id')
        const { data: orders } = await userApi.fetchUserOrdersNew(accessToken, { userId })
        dispatch({
          type: actionTypes.USER_LOAD_ORDERS_NEW,
          orders,
        })
      }
    } catch (err) {
      statusActions.errorLoad(actionTypes.USER_LOAD_ORDERS_NEW, err)(dispatch)
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS_NEW, false))
    }
  }
}

function userLoadProjectedDeliveries(forceRefresh = false) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, true))
    dispatch(statusActions.error(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, false))

    try {
      if (forceRefresh || !getState().user.get('projectedDeliveries').size) {
        const accessToken = getState().auth.get('accessToken')
        const { data: projectedDeliveries } = await userApi.fetchUserProjectedDeliveries(accessToken)

        dispatch({
          type: actionTypes.USER_LOAD_PROJECTED_DELIVERIES,
          projectedDeliveries,
        })
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, err.message))
      logger.error(err)
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, false))
    }
  }
}

function userReactivate(user) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_REACTIVATE,
      user,
    })
  }
}

function userPromoApplyCode(promoCode) {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const state = getState()
    if (state.promoAgeVerified && !state.user.get('ageVerified')) {
      await dispatch(userActions.userVerifyAge(state.promoAgeVerified, true))
    }
    try {
      await userApi.applyPromo(accessToken, promoCode)
    } catch (err) {
      dispatch(statusActions.error(actionTypes.PROMO_APPLY, err.message))
    }
  }
}

function userVerifyAge(verified, hardSave) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_AGE_VERIFY, true))

    try {
      if (verified && hardSave) {
        const accessToken = getState().auth.get('accessToken')
        await userApi.verifyAge(accessToken, 'current')
      }

      dispatch({
        type: actionTypes.USER_AGE_VERIFY,
        verified,
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_AGE_VERIFY, err.message))
      dispatch(statusActions.pending(actionTypes.USER_AGE_VERIFY, false))
      logger.error(err)
      throw err
    }
    dispatch(statusActions.pending(actionTypes.USER_AGE_VERIFY, false))
  }
}

function userProspect() {
  return async (dispatch, getState) => {
    const { basket, routing } = getState()
    const aboutYouFormName = getAboutYouFormName(getState())
    try {
      const step = routing.locationBeforeTransitions.pathname.split('/').pop()
      const aboutyou = Immutable.fromJS(getState().form[aboutYouFormName].values).get('aboutyou')

      const reqData = {
        email: aboutyou.get('email'),
        user_name_first: aboutyou.get('firstName'),
        user_name_last: aboutyou.get('lastName'),
        promocode: basket.get('promoCode'),
        allow_marketing_email: aboutyou.get('allowEmail'),
        preview_order_id: basket.get('previewOrderId'),
        step,
      }
      dispatch(statusActions.pending(actionTypes.USER_PROSPECT, true))
      dispatch(statusActions.error(actionTypes.USER_PROSPECT, false))
      await prospectApi.storeProspect(reqData)
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.USER_PROSPECT, err))
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_PROSPECT, false))
    }

    return null
  }
}

function userOpenCloseOrderCard(orderId, isCollapsed) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_ORDER_CARD_OPEN_CLOSE,
      orderId,
      isCollapsed,
    })
  }
}

function userOpenCloseEditSection(orderId, editDeliveryMode) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.USER_ORDER_EDIT_OPEN_CLOSE,
      orderId,
      editDeliveryMode,
    })
  }
}

function userToggleExpiredBillingModal(visibility) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
      visibility,
    })
  }
}

function userAddPaymentMethod(data) {
  return async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.USER_POST_PAYMENT_METHOD, null))
    dispatch(statusActions.pending(actionTypes.USER_POST_PAYMENT_METHOD, true))

    try {
      const accessToken = getState().auth.get('accessToken')
      const userId = getState().user.get('id')
      const paymentMethodData = {
        payment_type: data.payment_type,
        card_type: data.card_type,
        card_number: data.card_number,
        card_cvv2: data.card_cvv2,
        card_holder: data.card_holder,
        card_expires: data.card_expires,
        force_no_finisher: true,
      }
      await userApi.addPaymentMethod(accessToken, paymentMethodData, userId)
      dispatch({ type: actionTypes.USER_POST_PAYMENT_METHOD, userId })
      location.reload()
    } catch (err) {
      logger.error({message: `${actionTypes.USER_POST_PAYMENT_METHOD} - ${err.message}`, errors: [err]})
      dispatch(statusActions.error(actionTypes.USER_POST_PAYMENT_METHOD, err.code))
    } finally {
      dispatch({ type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE, visibility: false })
      dispatch(statusActions.pending(actionTypes.USER_POST_PAYMENT_METHOD, false))
    }
  }
}

function checkCardExpiry() {
  return (dispatch, getState) => {
    const expiryDate = getState().user.getIn(['card', 'expiryDate'])
    const expired = expiryDate < moment().format('YYYY-MM')
    if (getState().features.getIn(['newBillingModal', 'value'])) {
      dispatch({
        type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
        visibility: expired,
      })
    }
  }
}

function userLoadAddresses() {
  return async (dispatch, getState) => {
    dispatch(statusActions.error(actionTypes.USER_LOAD_ADDRESSES, null))
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ADDRESSES, true))

    try {
      const accessToken = getState().auth.get('accessToken')
      const userId = getState().user.get('id')
      const { data = {} } = await userApi.fetchUserAddresses(accessToken, userId)
      dispatch({
        type: actionTypes.USER_LOAD_ADDRESSES,
        data,
      })
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.USER_LOAD_ADDRESSES, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_LOAD_ADDRESSES, false))
    }
  }
}

function userToggleNewAddressModal(visibility, orderId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.DELIVERY_ADDRESS_MODAL_VISIBILITY_CHANGE,
      visibility,
      orderId,
    })
    if (visibility === false) {
      dispatch(statusActions.error(actionTypes.MODAL_ADDRESSES_RECEIVE, false))
      dispatch(statusActions.error(actionTypes.MODAL_FULL_ADDRESSES_RECEIVE, false))
      dispatch(statusActions.error(actionTypes.USER_POST_NEW_ADDRESS, false))
    }
  }
}

function modalAddressLookup(postcode) {
  // FIXME: this functionality has been broken by https://gousto.atlassian.net/browse/TECH-7254
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.MODAL_ADDRESSES_RECEIVE, true))
    dispatch(statusActions.error(actionTypes.MODAL_ADDRESSES_RECEIVE, false))

    try {
      const { data = {} } = await addressApi.fetchAddressByPostcode(postcode)
      dispatch({
        type: actionTypes.MODAL_ADDRESSES_RECEIVE,
        data,
      })
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.MODAL_ADDRESSES_RECEIVE, err))
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.MODAL_ADDRESSES_RECEIVE, false))
    }
  }
}

function userAddNewAddress(reqData, orderId) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_POST_NEW_ADDRESS, true))
    dispatch(statusActions.error(actionTypes.USER_POST_NEW_ADDRESS, false))

    try {
      const accessToken = getState().auth.get('accessToken')
      const userId = getState().user.get('id')
      const { data = {} } = await userApi.addNewAddress(accessToken, userId, reqData)

      dispatch({
        type: actionTypes.USER_POST_NEW_ADDRESS,
        data,
        orderId,
      })
    } catch (err) {
      statusActions.errorLoad(actionTypes.USER_POST_NEW_ADDRESS, err)(dispatch)
      throw err
    } finally {
      const postError = getState().error.get(actionTypes.USER_POST_NEW_ADDRESS)
      dispatch(statusActions.pending(actionTypes.USER_POST_NEW_ADDRESS, false))
      if (!postError) {
        dispatch({ type: actionTypes.DELIVERY_ADDRESS_MODAL_VISIBILITY_CHANGE, visibility: false })
      }
    }
  }
}

function userPendingAddressFormData(shippingAddressesId, orderId) {
  return (dispatch) => {
    dispatch({
      type: actionTypes.SELECTED_ADDRESS_IN_NEW_ADDRESS_MODAL,
      orderId,
      shippingAddressesId,
    })
  }
}

function userUnsubscribe({ authUserId, marketingType, marketingUnsubscribeToken }) {
  return async (dispatch) => {
    dispatch(statusActions.pending(actionTypes.UNSUBSCRIBED_USER, true))
    dispatch(statusActions.error(actionTypes.UNSUBSCRIBED_USER, ''))

    try {
      await userApi.deleteMarketingSubscription(
        authUserId, marketingType, marketingUnsubscribeToken
      )

      dispatch({
        type: actionTypes.UNSUBSCRIBED_USER,
      })
    } catch (err) {
      dispatch(statusActions.error(
        actionTypes.UNSUBSCRIBED_USER,
        err
      ))
    } finally {
      dispatch(statusActions.pending(actionTypes.UNSUBSCRIBED_USER, false))
    }
  }
}

export const userReferAFriend = (email) => (
  (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')

    if (accessToken) {
      userApi.referAFriend(accessToken, email)
    }
  }
)

export function userFetchReferralOffer () {

  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_REFERRAL_OFFER, true))
    const accessToken = getState().auth.get('accessToken')
    if (accessToken) {
      const { data: referralOffer } = await userApi.fetchReferralOffer(accessToken)
      dispatch({type: actionTypes.USER_LOAD_REFERRAL_OFFER, referralOffer})
      dispatch(statusActions.pending(actionTypes.USER_LOAD_REFERRAL_OFFER, false))
    }
  }
}

export const trackingReferFriend = (actionType, trackingType) => {
  return(dispatch) => {
    if(actionType && trackingType) {
      dispatch({
        type: actionType,
        trackingData: {
          actionType: trackingType,
        }
      })
    }
  }

}

export const trackingReferFriendSocialSharing = (actionType, trackingType, channel) => {
  return(dispatch) => {
    if(actionType && trackingType) {
      dispatch({
        type: actionType,
        trackingData: {
          actionType: trackingType,
          channel: channel
        }
      })
    }
  }

}

export default userActions
