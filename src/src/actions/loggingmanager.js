import { logEventToServer } from 'apis/loggingManager'

const EVENT_NAMES = {
  basketUpdated: 'basket-updated',
  rafPageVisited: 'rafPage-visited',
  userLoggedIn: 'user-loggedin',
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
      const recipes = basket.get('recipes').keySeq().toArray()
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
            recipes,
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

export {
  trackUserFreeFoodPageView,
  trackUserLogin,
  trackUserAddRemoveRecipe,
}
