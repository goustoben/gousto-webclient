import { triggerLoggingManagerEvent } from 'apis/loggingManager'
import statusActions from 'actions/status'
import { actionTypes } from 'actions/actionTypes'
import { v4 as uuidv4 } from 'uuid'
import { getUserId } from 'selectors/user'
import userActions from './user'

export const EVENT_NAMES = {
  basketUpdated: 'basket-updated',
  rafPageVisited: 'rafPage-visited',
  userLoggedIn: 'user-loggedin',
  sendGoustoAppLinkAppStoreSMS: 'sendsmsapplink-appstore',
  sendGoustoAppLinkPlayStoreSMS: 'sendsmsapplink-playstore',
  sendGoustoAppLinkNotSpecifiedStoreSMS: 'sendsmsapplink-notspecified',
  rafLinkShared: 'rafLink-shared',
  signupStarted: 'signup_started',
  signupFinished: 'signup_finished',
}

const generateLoggingManagerRequest = ({ loggingManagerEvent }) => {
  const { eventName: name, data, isAnonymousUser, ...params} = loggingManagerEvent
  const occurredAt = new Date().toISOString()

  const request = {
    id: uuidv4(),
    name,
    isAnonymousUser,
    data,
    occurredAt,
    ...params
  }

  return request
}

const getDefaultParams = (state) => {
  const { auth, request } = state

  return {
    authUserId: auth.get('id'),
    accessToken: auth.get('accessToken'),
    device: request.get('browser'),
  }
}

const getParams = (state) => {
  const defaultParams = getDefaultParams(state)
  const { user } = state

  let customParams = {}

  if (user && user.get('id')) {
    customParams = {...customParams, userId: user.get('id')}
  }

  return {
    ...defaultParams,
    ...customParams
  }
}

const trackUserFreeFoodPageView = () => (
  async (dispatch, getState) => {
    const { device, accessToken, ...params } = getParams(getState())
    const eventName = EVENT_NAMES.rafPageVisited

    const loggingManagerEvent = {
      ...params,
      eventName,
      data: {
        device,
      },
    }

    const loggingManagerRequest = generateLoggingManagerRequest({ loggingManagerEvent })

    triggerLoggingManagerEvent({ accessToken, loggingManagerRequest })
  }
)

const trackUserLogin = () => (
  async (dispatch, getState) => {
    const { device, accessToken, ...params } = getParams(getState())
    const eventName = EVENT_NAMES.userLoggedIn

    const loggingManagerEvent = {
      ...params,
      eventName,
      data: {
        device,
      },
    }

    const loggingManagerRequest = generateLoggingManagerRequest({ loggingManagerEvent })

    triggerLoggingManagerEvent({ accessToken, loggingManagerRequest })
  }
)

const trackUserAddRemoveRecipe = () => (
  async (dispatch, getState) => {
    const state = getState()
    const { basket, boxSummaryDeliveryDays } = state
    const { device, accessToken, ...params } = getParams(state)

    if (params.authUserId && basket.get('date') && boxSummaryDeliveryDays.get(basket.get('date'))) {
      const recipes = basket.get('recipes')
        .keySeq()
        .toArray()
        .reduce((acc, recipe, index) => ({
          ...acc,
          [`recipe${index + 1}`]: recipe,
        }), {})

      const foundDaySlot = boxSummaryDeliveryDays
        .get(basket.get('date'))
        .get('daySlots')
        .find(daySlot => daySlot.get('slotId') === basket.get('slotId', ''))

      if (foundDaySlot) {
        if (!getUserId(state)) {
          await dispatch(userActions.userLoadData())
        }

        const loggingManagerEvent = {
          eventName: EVENT_NAMES.basketUpdated,
          ...params,
          data: {
            device,
            ...recipes,
            orderId: basket.get('orderId'),
            dayId: foundDaySlot.get('dayId'),
            slotId: basket.get('slotId'),
            addressId: basket.getIn(['chosenAddress', 'id']),
            numPortions: basket.get('recipes').reduce((acc, numOfPortions) => (
              acc + numOfPortions
            ), 0),
          },
        }

        const loggingManagerRequest = generateLoggingManagerRequest({ loggingManagerEvent })

        triggerLoggingManagerEvent({ accessToken, loggingManagerRequest })
      }
    }
  }
)

const sendGoustoAppLinkSMS = ({ isAnonymousUser, goustoAppEventName: eventName, userPhoneNumber }) => (
  async (dispatch, getState) => {
    const { authUserId, device, accessToken } = getDefaultParams(getState())
    const loggingManagerEvent = {
      eventName,
      ...(!isAnonymousUser && { authUserId }),
      isAnonymousUser,
      data: {
        device,
        userPhoneNumber,
      },
    }

    dispatch(statusActions.pending(actionTypes.LOGGING_MANAGER_EVENT_PENDING, true))
    dispatch(statusActions.error(actionTypes.LOGGING_MANAGER_EVENT_ERROR, false))
    dispatch({
      type: actionTypes.LOGGING_MANAGER_EVENT_SENT,
      response: { key: 'goustoAppLinkSMS', value: false },
    })
    dispatch({
      type: actionTypes.TRACKING,
      trackingData: {
        actionType: 'click_send_text_app_install',
      }
    })

    try {
      const loggingManagerRequest = generateLoggingManagerRequest({ loggingManagerEvent })

      await triggerLoggingManagerEvent({ accessToken, loggingManagerRequest })

      dispatch({
        type: actionTypes.LOGGING_MANAGER_EVENT_SENT,
        response: { key: 'goustoAppLinkSMS', value: true }
      })
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'click_send_text_app_install_sent',
        }
      })
    } catch (error) {
      const errorMessage = (typeof error === 'object' && error.message)
        ? error.message
        : 'An error occurred, please try again'

      dispatch(statusActions.error(actionTypes.LOGGING_MANAGER_EVENT_ERROR, errorMessage))
      dispatch({
        type: actionTypes.TRACKING,
        trackingData: {
          actionType: 'click_send_text_app_install_error',
        }
      })
    } finally {
      dispatch(statusActions.pending(actionTypes.LOGGING_MANAGER_EVENT_PENDING, false))
    }
  }
)

const trackUserFreeFoodLinkShare = ({ target }) => (
  async (dispatch, getState) => {
    const { device, accessToken, ...params } = getParams(getState())
    const eventName = EVENT_NAMES.rafLinkShared

    const loggingManagerEvent = {
      eventName,
      ...params,
      data: {
        device,
        target,
      },
    }

    const loggingManagerRequest = generateLoggingManagerRequest({ loggingManagerEvent })

    await triggerLoggingManagerEvent({ accessToken, loggingManagerRequest })
  }
)

const trackSignupStarted = ({ email, promocode, allowMarketingEmail, previewOrderId }) => (
  async (dispatch, getState) => {
    const { accessToken, device } = getDefaultParams(getState())
    const eventName = EVENT_NAMES.signupStarted

    const loggingManagerEvent = {
      eventName,
      isAnonymousUser: true,
      data: {
        device,
        email,
        promocode,
        allowMarketingEmail,
        previewOrderId,
      }
    }
    const loggingManagerRequest = generateLoggingManagerRequest({
      loggingManagerEvent,
    })

    await triggerLoggingManagerEvent({
      accessToken,
      loggingManagerRequest,
    })
  }
)

const trackSignupFinished = ({ email }) => (
  async (dispatch, getState) => {
    const { accessToken, device, authUserId } = getDefaultParams(getState())
    const eventName = EVENT_NAMES.signupFinished

    const loggingManagerEvent = {
      eventName,
      authUserId,
      isAnonymousUser: false,
      data: {
        device,
        email,
      }
    }
    const loggingManagerRequest = generateLoggingManagerRequest({
      loggingManagerEvent,
    })

    await triggerLoggingManagerEvent({
      accessToken,
      loggingManagerRequest,
    })
    triggerLoggingManagerEvent({ accessToken, loggingManagerRequest })
  }
)

export {
  sendGoustoAppLinkSMS,
  trackUserFreeFoodPageView,
  trackUserLogin,
  trackUserAddRemoveRecipe,
  trackUserFreeFoodLinkShare,
  trackSignupStarted,
  trackSignupFinished,
}
