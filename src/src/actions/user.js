import moment from 'moment'
import Immutable from 'immutable'

import * as userApi from 'apis/user'
import { customerSignup } from 'apis/customers'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import { fetchOrder } from 'apis/orders'
import * as prospectApi from 'apis/prospect'

import { PaymentMethod, signupConfig } from 'config/signup'

import { accountFormName, deliveryFormName } from 'selectors/checkout'
import {
  isChoosePlanEnabled,
  getNDDFeatureValue,
  getIsNewSubscriptionApiEnabled,
  getIsAdditionalCheckoutErrorsEnabled,
  getIsDecoupledPaymentEnabled,
  getIsPromoCodeValidationEnabled,
} from 'selectors/features'
import { getPaymentDetails, getPayPalPaymentDetails, getCurrentPaymentMethod } from 'selectors/payment'
import { getUserRecentRecipesIds, getUserId } from 'selectors/user'

import logger from 'utils/logger'
import GoustoException from 'utils/GoustoException'
import { getAddress } from 'utils/checkout'
import { getDeliveryTariffId } from 'utils/deliveries'
import { transformPendingOrders, transformProjectedDeliveries, transformProjectedDeliveriesNew } from 'utils/myDeliveries'
import { getAuthUserId } from 'selectors/auth'
import { skipDates, fetchProjectedDeliveries } from 'routes/Account/apis/subscription'
import { deleteOrder } from 'routes/Account/MyDeliveries/apis/orderV2'

import { actionTypes } from './actionTypes'
// eslint-disable-next-line import/no-cycle
import { basketAddressChange, basketChosenAddressChange, basketPostcodeChangePure, basketPreviewOrderChange } from './basket'
import recipeActions from './recipes'
import statusActions from './status'
// eslint-disable-next-line import/no-cycle
import { subscriptionLoadData } from './subscription'
import { placeOrder } from './trackingKeys'
import {
  trackFirstPurchase,
  trackUserAttributes,
  trackNewUser,
  trackNewOrder,
  trackSubscriptionCreated,
} from './tracking'

const fetchShippingAddressesPending = pending => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_PENDING,
  pending
})

const fetchedShippingAddresses = shippingAddresses => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_RECEIVE,
  shippingAddresses
})

const fetchShippingAddressesError = message => ({
  type: actionTypes.USER_SHIPPING_ADDRESSES_ERROR,
  message
})

const userLoadReferralDetails = referralDetails => ({
  type: actionTypes.USER_LOAD_REFERRAL_DETAILS,
  referralDetails
})

function userFetchCredit() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')

    try {
      const { data: userCreditData } = await userApi.fetchUserCredit(accessToken)
      const { balance: userCredit } = userCreditData

      dispatch({
        type: actionTypes.USER_CREDIT,
        userCredit,
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_CREDIT, err.message))
      logger.error(err)
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_CREDIT, false))
    }
  }
}

function userLoadOrders(forceRefresh = false, orderType = 'pending', number = 10) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS, true))
    try {
      if (forceRefresh || !getState().user.get('orders').size) {
        const accessToken = getState().auth.get('accessToken')
        const { data: orders } = await userApi.fetchUserOrders(accessToken, {
          limit: number,
          sort_order: 'desc',
          state: orderType,
          includes: ['shipping_address']
        })

        dispatch({
          type: actionTypes.USER_LOAD_ORDERS,
          orders
        })
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_LOAD_ORDERS, err.message))
      logger.error({ message: err.message })
    }
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS, false))
  }
}

export function userLoadProjectedDeliveries(forceRefresh = false) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, true))
    dispatch(statusActions.error(actionTypes.USER_LOAD_PROJECTED_DELIVERIES, null))

    try {
      const state = getState()
      const accessToken = state.auth.get('accessToken')
      const userId = getUserId(state)
      const isNewSubscriptionApiEnabled = getIsNewSubscriptionApiEnabled(state)

      const dispatchProjectedDeliveries = (projectedDeliveries) => {
        dispatch({
          type: actionTypes.USER_LOAD_PROJECTED_DELIVERIES,
          projectedDeliveries,
          isNewSubscriptionApiEnabled
        })
      }

      if (forceRefresh || !state.user.get('projectedDeliveries').size) {
        if (!isNewSubscriptionApiEnabled) {
          const { data } = await userApi.fetchUserProjectedDeliveries(accessToken)

          dispatchProjectedDeliveries(data)
        } else if (userId) {
          const { data } = await fetchProjectedDeliveries(accessToken, userId)

          dispatchProjectedDeliveries(data.data.projectedDeliveries)
        } else {
          dispatchProjectedDeliveries([])
        }
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
        verified
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

function userOrderCancelNext() {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_ORDER_CANCEL_NEXT, true))
    dispatch(statusActions.error(actionTypes.USER_ORDER_CANCEL_NEXT, false))
    const errorPrefix = 'Order skip projected error:'
    const cancellablePhases = ['awaiting_choices', 'open', 'pre_menu']

    try {
      await dispatch(userLoadOrders())

      const state = getState()

      const cancellableOrder = state.user.get('orders')
        .filter(order => cancellablePhases.includes(order.get('phase')))

      if (cancellableOrder.size) {
        const orderToCancelId = cancellableOrder
          .sort((orderA, orderB) => {
            const orderDateA = orderA.get('deliveryDay')
            const orderDateB = orderB.get('deliveryDay')

            return moment(orderDateA) - moment(orderDateB)
          })
          .first()
          .get('id')

        try {
          const accessToken = state.auth.get('accessToken')
          const userId = getAuthUserId(state)

          await deleteOrder(accessToken, orderToCancelId, userId)

          dispatch({
            type: actionTypes.USER_UNLOAD_ORDERS,
            orderIds: [orderToCancelId]
          })
        } catch (err) {
          throw new GoustoException(`${errorPrefix} attempt to cancel delivery ${orderToCancelId} failed`)
        }
      } else {
        throw new GoustoException(`${errorPrefix} no orders found to cancel`, {
          error: 'no-orders-found',
          level: 'warning'
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
      const state = getState()
      const isNewSubscriptionApiEnabled = getIsNewSubscriptionApiEnabled(state)
      let projectedOrders = state.user.get('projectedDeliveries')

      if (!projectedOrders.size) {
        // eslint-disable-next-line no-use-before-define
        await dispatch(userActions.userLoadProjectedDeliveries())
        projectedOrders = state.user.get('projectedDeliveries')
      }

      if (!projectedOrders.size) {
        throw new GoustoException(`${errorPrefix} no orders found to skip`, {
          error: 'no-orders-found',
          level: 'warning'
        })
      }

      const orderToSkipId = projectedOrders.first().get('id')
      const accessToken = state.auth.get('accessToken')

      try {
        if (isNewSubscriptionApiEnabled) {
          const orderToSkipDate = projectedOrders.first().get('deliveryDate').split(' ')[0]
          const userId = getUserId(state)

          await skipDates(accessToken, userId, [orderToSkipDate])
        } else {
          await userApi.skipDelivery(accessToken, orderToSkipId)
        }

        dispatch({
          type: actionTypes.USER_UNLOAD_PROJECTED_DELIVERIES,
          deliveryDayIds: [orderToSkipId]
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

function userLoadData() {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const { data = {} } = await userApi.fetchUser(accessToken)
    const { user } = data

    dispatch({
      type: actionTypes.USER_LOAD_DATA,
      user
    })

    if (__CLIENT__) {
      dispatch(trackUserAttributes())
    }

    dispatch(subscriptionLoadData())
  }
}

function userFetchShippingAddresses() {
  return async (dispatch, getState) => {
    dispatch(fetchShippingAddressesPending(true))
    try {
      const accessToken = getState().auth.get('accessToken')
      const { data: shippingAddresses } = await userApi.fetchShippingAddresses(accessToken)
      dispatch(fetchedShippingAddresses(shippingAddresses))

      const address = Immutable.fromJS(shippingAddresses)
        .filter(addr => addr.get('shippingDefault'))
        .first()
      dispatch(basketAddressChange(address))
      dispatch(basketChosenAddressChange(address))
      dispatch(basketPostcodeChangePure(address.get('postcode')))

      dispatch(fetchShippingAddressesPending(false))
    } catch (err) {
      dispatch(fetchShippingAddressesError(err.message))
      dispatch(fetchShippingAddressesPending(false))
    }
  }
}

function userClearData() {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_CLEAR_DATA
    })
    dispatch(basketAddressChange(null))
    dispatch(basketChosenAddressChange(null))
    dispatch(basketPostcodeChangePure(''))
  }
}

function userLoadOrder(orderId, forceRefresh = false) {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDERS, true))
    dispatch(statusActions.error(actionTypes.USER_LOAD_ORDERS, null))
    try {
      if (forceRefresh || getState().user.get('orders').find(order => order.get('id') === orderId) === undefined) {
        const accessToken = getState().auth.get('accessToken')
        const { data: order } = await fetchOrder(accessToken, orderId, { 'includes[]': 'shipping_address' })

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

function userLoadNewOrders() {
  return async (dispatch, getState) => {
    // eslint-disable-next-line no-use-before-define
    await Promise.all([dispatch(userActions.userLoadOrders()), dispatch(userActions.userLoadProjectedDeliveries())])

    let projectedDeliveries
    const state = getState()
    const isNewSubscriptionApiEnabled = getIsNewSubscriptionApiEnabled(state)

    const pendingOrders = transformPendingOrders(state.user.get('orders'))

    if (isNewSubscriptionApiEnabled) {
      projectedDeliveries = transformProjectedDeliveriesNew(state.user.get('projectedDeliveries'))
    } else {
      projectedDeliveries = transformProjectedDeliveries(state.user.get('projectedDeliveries'))
    }

    const ordersCombined = pendingOrders.merge(projectedDeliveries)

    dispatch({ type: actionTypes.MYDELIVERIES_ORDERS, orders: ordersCombined })
  }
}

function userReactivate(user) {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_REACTIVATE,
      user
    })
  }
}

function userPromoApplyCode(promoCode) {
  return async (dispatch, getState) => {
    const accessToken = getState().auth.get('accessToken')
    const state = getState()
    if (state.promoAgeVerified && !state.user.get('ageVerified')) {
      await dispatch(userVerifyAge(state.promoAgeVerified, true))
    }
    try {
      await userApi.applyPromo(accessToken, promoCode)
    } catch (err) {
      dispatch(statusActions.error(actionTypes.PROMO_APPLY, err.message))
    }
  }
}

function userProspect() {
  return async (dispatch, getState) => {
    const { basket, routing } = getState()
    try {
      const step = routing.locationBeforeTransitions.pathname.split('/').pop()
      const account = Immutable.fromJS(getState().form[accountFormName].values).get('account')
      const delivery = Immutable.fromJS(getState().form[deliveryFormName].values).get('delivery')

      const reqData = {
        email: account.get('email'),
        user_name_first: delivery.get('firstName').trim() || '',
        user_name_last: delivery.get('lastName').trim() || '',
        promocode: basket.get('promoCode'),
        allow_marketing_email: account.get('allowEmail'),
        preview_order_id: basket.get('previewOrderId'),
        step
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
  return dispatch => {
    dispatch({
      type: actionTypes.USER_ORDER_CARD_OPEN_CLOSE,
      orderId,
      isCollapsed
    })
  }
}

function userToggleEditDateSection(orderId, editDeliveryMode) {
  return dispatch => {
    dispatch({
      type: actionTypes.USER_ORDER_EDIT_OPEN_CLOSE,
      orderId,
      editDeliveryMode
    })
  }
}

function userTrackToggleEditDateSection(orderId) {
  return (dispatch, getState) => {
    const originalSlotId = getState().user.getIn(['newOrders', orderId, 'deliverySlotId'])

    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliverySlot Edit',
        order_id: orderId,
        original_deliveryslot_id: originalSlotId,
      }
    })
  }
}

function userTrackToggleEditAddressSection(orderId) {
  return (dispatch, getState) => {
    const originalAddressId = getState().user.getIn(['newOrders', orderId, 'shippingAddressId'])

    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliveryAddress Edit',
        order_id: orderId,
        original_deliveryaddress_id: originalAddressId,
      }
    })
  }
}

function userTrackDateSelected(orderId, originalSlotId, newSlotId) {
  return dispatch => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliveryDate Selected',
        order_id: orderId,
        original_deliveryslot_id: originalSlotId,
        new_deliveryslot_id: newSlotId,
      }
    })
  }
}

function userTrackSlotSelected(orderId, originalSlotId, newSlotId) {
  return dispatch => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliverySlot Selected',
        order_id: orderId,
        original_deliveryslot_id: originalSlotId,
        new_deliveryslot_id: newSlotId,
      }
    })
  }
}

function userTrackAddressSelected(orderId, originalAddressId, newAddressId) {
  return dispatch => {
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'OrderDeliveryAddress Selected',
        order_id: orderId,
        original_deliveryaddress_id: originalAddressId,
        new_deliveryaddress_id: newAddressId,
      }
    })
  }
}

function userToggleExpiredBillingModal(visibility) {
  return dispatch => {
    dispatch({
      type: actionTypes.EXPIRED_BILLING_MODAL_VISIBILITY_CHANGE,
      visibility
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
        force_no_finisher: true
      }
      await userApi.addPaymentMethod(accessToken, paymentMethodData, userId)
      dispatch({ type: actionTypes.USER_POST_PAYMENT_METHOD, userId })
      window.location.reload()
    } catch (err) {
      logger.error({ message: `${actionTypes.USER_POST_PAYMENT_METHOD} - ${err.message}`, errors: [err] })
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
        visibility: expired
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
        data
      })
    } catch (err) {
      dispatch(statusActions.errorLoad(actionTypes.USER_LOAD_ADDRESSES, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_LOAD_ADDRESSES, false))
    }
  }
}

function userUnsubscribe({ authUserId, marketingType, marketingUnsubscribeToken }) {
  return async dispatch => {
    dispatch(statusActions.pending(actionTypes.UNSUBSCRIBED_USER, true))
    dispatch(statusActions.error(actionTypes.UNSUBSCRIBED_USER, ''))

    try {
      await userApi.deleteMarketingSubscription(authUserId, marketingType, marketingUnsubscribeToken)

      dispatch({
        type: actionTypes.UNSUBSCRIBED_USER
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.UNSUBSCRIBED_USER, err))
    } finally {
      dispatch(statusActions.pending(actionTypes.UNSUBSCRIBED_USER, false))
    }
  }
}

function buildSignupRequestData(state, sca3ds, sourceId) {
  const { form, basket, promoAgeVerified } = state

  const isDecoupledPaymentEnabled = getIsDecoupledPaymentEnabled(state)
  const isPromoCodeValidationEnabled = getIsPromoCodeValidationEnabled(state)

  const account = Immutable.fromJS(form[accountFormName].values).get('account')
  const delivery = Immutable.fromJS(form[deliveryFormName].values).get('delivery')
  const payment = Immutable.fromJS(form.payment.values).get('payment')

  const isCard = getCurrentPaymentMethod(state) === PaymentMethod.Card
  const deliveryAddress = getAddress(delivery)

  const billingAddress = isCard && payment.get('isBillingAddressDifferent') ? getAddress(payment) : deliveryAddress

  const intervalId = delivery.get('interval_id', 1)

  const reqData = {
    order_id: basket.get('previewOrderId'),
    promocode: basket.get('promoCode', ''),
    check_last_name: Number(isPromoCodeValidationEnabled || false),
    customer: {
      tariff_id: basket.get('tariffId', ''),
      phone_number: delivery.get('phone') ? `0${delivery.get('phone')}` : '',
      email: account.get('email'),
      name_first: delivery.get('firstName').trim(),
      name_last: delivery.get('lastName').trim(),
      promo_code: basket.get('promoCode', ''),
      password: account.get('password'),
      age_verified: Number(promoAgeVerified || false),
      marketing_do_allow_email: Number(account.get('allowEmail') || false),
      marketing_do_allow_thirdparty: Number(account.get('allowThirdPartyEmail') || false),
      delivery_tariff_id: getDeliveryTariffId(null, getNDDFeatureValue(state)),
      gousto_ref: state.checkout.get('goustoRef')
    },
    addresses: {
      shipping_address: {
        type: signupConfig.address_types.shipping,
        delivery_instructions: delivery.get('deliveryInstructionsCustom') || delivery.get('deliveryInstruction'),
        ...deliveryAddress
      },
      billing_address: {
        type: signupConfig.address_types.billing,
        ...billingAddress
      }
    },
    subscription: {
      interval_id: intervalId,
      delivery_slot_id: basket.get('slotId'),
      box_id: basket.get('boxId')
    },
    decoupled: {
      payment: Number(isDecoupledPaymentEnabled || false),
    }
  }

  if (
    isChoosePlanEnabled(state)
    && basket.get('subscriptionOption') === signupConfig.subscriptionOptions.transactional
  ) {
    reqData.subscription.paused = 1
  }

  if (getIsAdditionalCheckoutErrorsEnabled(state)) {
    reqData.payment_show_soft_decline = true
  }

  if (!isDecoupledPaymentEnabled) {
    let paymentMethod
    if (isCard) {
      paymentMethod = {
        is_default: 1,
        type: signupConfig.payment_types.card,
        name: 'My Card',
        card: getPaymentDetails(state)
      }
      if (sca3ds) {
        paymentMethod.card.card_token = sourceId
      }
    } else {
      paymentMethod = {
        is_default: 1,
        type: signupConfig.payment_types.paypal,
        name: 'My PayPal',
        paypal: getPayPalPaymentDetails(state)
      }
    }

    reqData.payment_method = paymentMethod
    reqData['3ds'] = Number((isCard && sca3ds) || false)
  }

  return reqData
}

export function userSubscribe(sca3ds = false, sourceId = null) {
  return async (dispatch, getState) => {
    const state = getState()
    if (state.user && state.user.get('id')) {
      return
    }
    dispatch(statusActions.error(actionTypes.USER_SUBSCRIBE, null))
    dispatch(statusActions.pending(actionTypes.USER_SUBSCRIBE, true))

    const prices = state.pricing.get('prices')
    try {
      const reqData = buildSignupRequestData(state, sca3ds, sourceId)

      const { data } = await customerSignup(null, reqData)

      if (data.customer && data.addresses && data.subscription && data.orderId) {
        const { customer, addresses, subscription, orderId } = data
        const { id: customerId } = customer
        let user = Immutable.fromJS({
          ...customer,
          ...addresses,
          subscription
        })
        user = user.set('goustoReference', user.get('goustoReference').toString())

        dispatch(trackNewUser(customerId))

        dispatch({
          type: actionTypes.CHECKOUT_ORDER_PLACED,
          trackingData: {
            actionType: placeOrder,
            order_id: orderId,
            order_total: prices.get('total'),
            promo_code: prices.get('promoCode'),
            signup: true,
            subscription_active: data.subscription.status ? data.subscription.status.slug : true,
            interval_id: reqData.subscription.interval_id,
          }
        })

        dispatch(trackFirstPurchase(orderId, prices))
        dispatch(trackNewOrder(orderId, customerId))
        dispatch(basketPreviewOrderChange(orderId, getState().basket.get('boxId')))
        dispatch({ type: actionTypes.USER_SUBSCRIBE, user })

        const { id: subscriptionId } = subscription

        dispatch(trackSubscriptionCreated(orderId, customerId, subscriptionId))
      } else {
        throw new GoustoException(actionTypes.USER_SUBSCRIBE)
      }
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_SUBSCRIBE, err.message))
      dispatch(trackNewUser())

      const previewOrderId = getState().basket.get('previewOrderId')

      dispatch({
        type: actionTypes.CHECKOUT_ORDER_FAILED,
        trackingData: {
          actionType: 'Order Failed',
          order_id: previewOrderId,
          promo_code: prices.get('promoCode'),
          signup: true,
          error_reason: err.message
        }
      })
      dispatch(trackNewOrder(previewOrderId))
      logger.error({ message: err.message, errors: [err] })
      throw err
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_SUBSCRIBE, false))
    }
  }
}

export const userReferAFriend = (email, recaptchaToken = null) => async () => {
  try {
    await userApi.serverReferAFriend(email, recaptchaToken)
  } catch (err) {
    logger.error({ message: 'Failed to call refer a friend', errors: [err] })
  }
}

export function userFetchReferralOffer() {
  return async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_REFERRAL_OFFER, true))
    const accessToken = getState().auth.get('accessToken')
    if (accessToken) {
      const { data: referralOffer } = await userApi.fetchReferralOffer(accessToken)
      dispatch({ type: actionTypes.USER_LOAD_REFERRAL_OFFER, referralOffer })
      dispatch(statusActions.pending(actionTypes.USER_LOAD_REFERRAL_OFFER, false))
    }
  }
}

export const userGetReferralDetails = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.get('accessToken')
    const { data } = await userApi.referralDetails(accessToken)

    dispatch(userLoadReferralDetails(data))
  } catch (err) {
    logger.error({ message: 'Failed to fetch referral details', errors: [err] })
  }
}

export const trackingReferFriend = (actionType, trackingType) => dispatch => {
  if (actionType && trackingType) {
    dispatch({
      type: actionType,
      trackingData: {
        actionType: trackingType
      }
    })
  }
}

export const trackingReferFriendSocialSharing = (actionType, trackingType, channel) => dispatch => {
  if (actionType && trackingType) {
    dispatch({
      type: actionType,
      trackingData: {
        actionType: trackingType,
        channel
      }
    })
  }
}
export const userLoadCookbookRecipes = () => (dispatch, getState) => {
  const userRecipeIds = getUserRecentRecipesIds(getState(), 6)
  dispatch(recipeActions.recipesLoadRecipesById(userRecipeIds, true))
}

export const userLoadOrderTrackingInfo = (orderId) => (
  async (dispatch, getState) => {
    dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDER_TRACKING, true))
    dispatch(statusActions.error(actionTypes.USER_LOAD_ORDER_TRACKING, false))
    try {
      const accessToken = getState().auth.get('accessToken')
      const orderTracking = await fetchDeliveryConsignment(accessToken, orderId)
      const { trackingUrl } = orderTracking.data[0]
      dispatch({
        type: actionTypes.USER_LOAD_ORDER_TRACKING,
        trackingUrl,
      })
    } catch (err) {
      dispatch(statusActions.error(actionTypes.USER_LOAD_ORDER_TRACKING, true))
      dispatch({
        type: actionTypes.USER_LOAD_ORDER_TRACKING,
        trackingUrl: '',
      })
      logger.error({ message: `Failed to fetch tracking url for order ${orderId}`, errors: [err] })
    } finally {
      dispatch(statusActions.pending(actionTypes.USER_LOAD_ORDER_TRACKING, false))
    }
  }
)

const userActions = {
  checkCardExpiry,
  userFetchCredit,
  userOrderCancelNext,
  userOrderSkipNextProjected,
  userSubscribe,
  userLoadData,
  userLoadReferralDetails,
  userFetchShippingAddresses,
  userClearData,
  userLoadOrder,
  userLoadOrders,
  userLoadNewOrders,
  userLoadOrderTrackingInfo,
  userLoadProjectedDeliveries,
  userReactivate,
  userPromoApplyCode,
  userVerifyAge,
  userProspect,
  userOpenCloseOrderCard,
  userToggleEditDateSection,
  userTrackToggleEditDateSection,
  userTrackToggleEditAddressSection,
  userTrackDateSelected,
  userTrackSlotSelected,
  userTrackAddressSelected,
  userToggleExpiredBillingModal,
  userAddPaymentMethod,
  userLoadAddresses,
  userUnsubscribe,
  userFetchReferralOffer,
}

// eslint-disable-next-line import/no-default-export
export default userActions
