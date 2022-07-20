import moment from 'moment'
import Immutable from 'immutable'
import { datadogLogs } from '@datadog/browser-logs'
import { datadogRum } from '@datadog/browser-rum'

import * as userApi from 'apis/user'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import * as orderV2 from 'routes/Menu/apis/orderV2'
import { get3DSCompliantToken } from 'apis/payments'
import * as prospectApi from 'apis/prospect'

import {
  accountFormName,
  deliveryFormName,
} from 'selectors/checkout'
import {
  getIsGoustoOnDemandEnabled,
} from 'selectors/features'
import { getUserRecentRecipesIds, getUserId } from 'selectors/user'

import logger from 'utils/logger'
import GoustoException from 'utils/GoustoException'
import { transformPendingOrders, transformProjectedDeliveries } from 'utils/myDeliveries'
import { getAuthUserId } from 'selectors/auth'
import { getPreviewOrderId, getPromoCode } from 'selectors/basket'
import { skipDates, fetchProjectedDeliveries } from 'routes/Account/apis/subscription'
import { deleteOrder } from 'routes/Account/MyDeliveries/apis/orderV2'
import { canUseWindow } from 'utils/browserEnvironment'

import { trackSignupStarted } from 'actions/loggingmanager'
import { actionTypes } from './actionTypes'
// eslint-disable-next-line import/no-cycle
import { basketAddressChange, basketChosenAddressChange, basketPostcodeChangePure } from './basket'
import { feLoggingLogEvent, logLevels } from './log'
import recipeActions from './recipes'
import statusActions from './status'
// eslint-disable-next-line import/no-cycle
import { subscriptionLoadData } from './subscription'
import {
  trackUserAttributes,
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

const userLoadFrequencyProgress = frequencyProgressData => ({
  type: actionTypes.USER_LOAD_FREQUENCY_PROGRESS,
  frequencyProgressData
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
        const payload = {
          limit: number,
          sort_order: 'desc',
          state: orderType,
          includes: ['shipping_address']
        }
        const { data: orders } = await orderV2.fetchUserOrders(dispatch, getState, payload)
        dispatch({
          type: actionTypes.USER_LOAD_ORDERS,
          orders: orders || []
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

      const dispatchProjectedDeliveries = (projectedDeliveries) => {
        dispatch({
          type: actionTypes.USER_LOAD_PROJECTED_DELIVERIES,
          projectedDeliveries
        })
      }

      if (forceRefresh || !state.user.get('projectedDeliveries').size) {
        if (userId) {
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
        const orderToSkipDate = projectedOrders.first().get('deliveryDate').split(' ')[0]
        const userId = getUserId(state)

        await skipDates(accessToken, userId, [orderToSkipDate])

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

    if (canUseWindow()) {
      dispatch(trackUserAttributes())

      try {
        datadogLogs.addLoggerGlobalContext('userID', user.id)
        datadogRum.addRumGlobalContext('userID', user.id)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Error setting DD context:', err)
      }
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
        const { data: order } = await orderV2.fetchOrder(dispatch, getState, orderId, 'shipping_address' )

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
    const forceRefresh = getIsGoustoOnDemandEnabled(getState())
    // eslint-disable-next-line no-use-before-define
    await Promise.all([dispatch(userActions.userLoadOrders(forceRefresh)), dispatch(userActions.userLoadProjectedDeliveries())])

    const state = getState()
    const pendingOrders = transformPendingOrders(state.user.get('orders'))
    const projectedDeliveries = transformProjectedDeliveries(state.user.get('projectedDeliveries'))
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
    const state = getState()
    const { routing } = state
    try {
      const step = routing.locationBeforeTransitions.pathname.split('/').pop()
      const account = Immutable.fromJS(state.form[accountFormName].values).get('account')
      const deliveryForm = Immutable.fromJS(state.form[deliveryFormName])
      const delivery = deliveryForm ? deliveryForm.getIn(['values', 'delivery']) : {}

      const email = account.get('email')
      const promocode = getPromoCode(state)

      const reqData = {
        email,
        promocode,
        step,
        user_name_first: deliveryForm ? delivery.get('firstName').trim() : '',
        user_name_last: deliveryForm ? delivery.get('lastName').trim() : '',
        allow_marketing_email: account.get('allowEmail'),
        preview_order_id: getPreviewOrderId(state),
      }
      dispatch(statusActions.pending(actionTypes.USER_PROSPECT, true))
      dispatch(statusActions.error(actionTypes.USER_PROSPECT, false))

      if (step === 'account') {
        const allowMarketingEmail = account.get('allowEmail')
        const previewOrderId = state.basket.get('previewOrderId')

        dispatch(trackSignupStarted({
          email,
          promocode,
          allowMarketingEmail,
          previewOrderId,
        }))
      }

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

export const userGetFrequencyProgress = () => async (dispatch, getState) => {
  try {
    // const accessToken = getState().auth.get('accessToken')
    // const { data } = await userApi.referralDetails(accessToken)

    const data = {
      progress: 5,
      target: 8,
      endOfSecondMonth: '2022-07-12',
      endOfThirdMonth: '2022-08-11',
      promotionAmount: '5%'
    }

    dispatch(userLoadFrequencyProgress(data))
  } catch (err) {
    logger.error({ message: 'Failed to user frequency incentivisation progress', errors: [err] })
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

export const userCheck3dsCompliantToken = () => async (dispatch, getState) => {
  try {
    const { user } = getState()
    const goustoRef = user.get('goustoReference')
    dispatch(statusActions.pending(actionTypes.USER_GET_3DS_COMPLIANT_TOKEN, true))
    const { data } = await get3DSCompliantToken(goustoRef)
    dispatch(feLoggingLogEvent(logLevels.info, 'fetch 3ds token success'))
    dispatch({
      type: actionTypes.USER_GET_3DS_COMPLIANT_TOKEN,
      isCardTokenNotCompliantFor3ds: data.displayModal,
    })
    dispatch(statusActions.pending(actionTypes.USER_GET_3DS_COMPLIANT_TOKEN, false))
  } catch (err) {
    dispatch(feLoggingLogEvent(logLevels.error, `fetch 3ds token failed: ${err.message}`))
    logger.error({ message: 'Failed to fetch 3ds compliant token', errors: [err] })
  }
}

export const userReset3dsCompliantToken = () => (dispatch) => {
  dispatch({
    type: actionTypes.USER_GET_3DS_COMPLIANT_TOKEN,
    isCardTokenNotCompliantFor3ds: false,
  })
}

const userActions = {
  checkCardExpiry,
  userFetchCredit,
  userOrderCancelNext,
  userOrderSkipNextProjected,
  userLoadData,
  userLoadReferralDetails,
  userFetchShippingAddresses,
  userLoadFrequencyProgress,
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
