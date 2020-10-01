import { logEventToServer } from 'apis/loggingManager'
import statusActions from 'actions/status'
import { actionTypes } from 'actions/actionTypes'

export const EVENT_NAMES = {
  basketUpdated: 'basket-updated',
  rafPageVisited: 'rafPage-visited',
  userLoggedIn: 'user-loggedin',
  sendGoustoAppLinkAppStoreSMS: 'sendsmsapplink-appstore',
  sendGoustoAppLinkPlayStoreSMS: 'sendsmsapplink-playstore',
  sendGoustoAppLinkNotSpecifiedStoreSMS: 'sendsmsapplink-notspecified',
  rafLinkShared: 'rafLink-shared',
}

const getDefaultParams = (state) => {
  const { auth, request } = state

  return {
    authUserId: auth.get('id'),
    device: request.get('browser'),

  }
}

const trackUserFreeFoodPageView = () => (
  async (dispatch, getState) => {
    const { authUserId, device } = getDefaultParams(getState())
    const eventName = EVENT_NAMES.rafPageVisited

    const loggingManagerEvent = {
      eventName,
      authUserId,
      data: {
        device,
      },
    }

    logEventToServer(loggingManagerEvent)
  }
)

const trackUserLogin = () => (
  async (dispatch, getState) => {
    const { authUserId, device } = getDefaultParams(getState())
    const eventName = EVENT_NAMES.userLoggedIn

    const loggingManagerEvent = {
      eventName,
      authUserId,
      data: {
        device,
      },
    }

    logEventToServer(loggingManagerEvent)
  }
)

const trackUserAddRemoveRecipe = () => (
  async (dispatch, getState) => {
    const state = getState()
    const { basket, boxSummaryDeliveryDays } = state
    const { authUserId, device } = getDefaultParams(state)

    if (authUserId && basket.get('date') && boxSummaryDeliveryDays.get(basket.get('date'))) {
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
        const loggingManagerEvent = {
          eventName: EVENT_NAMES.basketUpdated,
          authUserId,
          data: {
            device,
            ...recipes,
            dayId: foundDaySlot.get('dayId'),
            slotId: basket.get('slotId'),
            addressId: basket.getIn(['chosenAddress', 'id']),
            numPortions: basket.get('recipes').reduce((acc, numOfPortions) => (
              acc + numOfPortions
            ), 0),
          },
        }

        logEventToServer(loggingManagerEvent)
      }
    }
  }
)

const sendGoustoAppLinkSMS = ({ goustoAppEventName: eventName, userPhoneNumber }) => (
  async (dispatch, getState) => {
    const { authUserId, device } = getDefaultParams(getState())
    const loggingManagerEvent = {
      eventName,
      authUserId,
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
      await logEventToServer(loggingManagerEvent)

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
    const { authUserId, device } = getDefaultParams(getState())
    const eventName = EVENT_NAMES.rafLinkShared

    const loggingManagerEvent = {
      eventName,
      authUserId,
      data: {
        device,
        target,
      },
    }

    logEventToServer(loggingManagerEvent)
  }
)

export {
  sendGoustoAppLinkSMS,
  trackUserFreeFoodPageView,
  trackUserLogin,
  trackUserAddRemoveRecipe,
  trackUserFreeFoodLinkShare,
}
