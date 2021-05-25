import { browserHistory } from 'react-router'
import logger from 'utils/logger'
import { client as clientRoutes } from 'config/routes'
import { fetchDeliveryConsignment } from 'apis/deliveries'
import { fetchUserOrders } from 'routes/Menu/actions/order'
import { applyDeliveryCompensation, validateDelivery, validateOrder } from 'apis/getHelp'
import webClientStatusActions from 'actions/status'
import { actionTypes as webClientActionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import { isOptimizelyFeatureEnabledFactory } from 'containers/OptimizelyRollouts/optimizelyUtils'
import { appendFeatureToRequest } from '../utils/appendFeatureToRequest'
import { getFeatureShorterCompensationPeriod } from '../../../selectors/features'
import { actionTypes } from './actionTypes'
import { asyncAndDispatch } from './utils'

const SE_CATEGORY_HELP = 'help'

export const trackDeliveryOther = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackDeliveryOther Clicked',
  },
})

export const trackDeliveryStatus = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackDeliveryStatus Clicked',
  },
})

export const trackNextBoxTrackingClick = orderId => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: 'GetHelpTrackMyBox Clicked',
    orderId,
  }
})

export const getUserOrders = (orderType = 'pending', limit = 10) => (
  async (dispatch, getState) => {
    const state = getState()
    const accessToken = getAccessToken(state)
    const userId = getUserId(state)

    if (!userId) {
      return
    }

    dispatch(webClientStatusActions.pending(actionTypes.GET_HELP_LOAD_ORDERS, true))
    dispatch(webClientStatusActions.error(actionTypes.GET_HELP_LOAD_ORDERS, null))

    try {
      const useOrderApiV2 = await isOptimizelyFeatureEnabledFactory('radishes_order_api_getuserorders_web_enabled')(dispatch, getState)
      const orders = await fetchUserOrders(accessToken, limit, userId, orderType, useOrderApiV2)

      dispatch({
        type: actionTypes.GET_HELP_LOAD_ORDERS,
        orders
      })
    } catch (err) {
      dispatch(webClientStatusActions.error(actionTypes.GET_HELP_LOAD_ORDERS, err.message))

      logger.error(err)
    }
    dispatch(webClientStatusActions.pending(actionTypes.GET_HELP_LOAD_ORDERS, false))
  }
)

export const storeGetHelpOrder = ({ id, recipeIds, recipeDetailedItems, deliverySlot }) => ({
  type: actionTypes.GET_HELP_STORE_ORDER,
  payload: {
    id,
    recipeIds,
    recipeDetailedItems,
    deliverySlot,
  },
})

export const trackRejectRefund = (amount) => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrIngredientDeclineRefund,
    amount,
    seCategory: SE_CATEGORY_HELP,
  }
})

export const trackConfirmationCTA = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrClickDoneRefundAccepted,
  }
})

export const trackClickGetHelpWithThisBox = (orderId) => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.clickGetHelpWithThisBox,
    order_id: orderId,
    seCategory: SE_CATEGORY_HELP,
  }
})

export const trackHelpPreLoginModalDisplayed = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.helpPreLoginModalDisplayed,
    seCategory: SE_CATEGORY_HELP,
  }
})

export const trackContinueAsNewCustomer = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.clickContinueAsNewCustomer,
    seCategory: SE_CATEGORY_HELP,
  }
})

export const trackIngredientReasonsConfirmed = (selectedIngredients) => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrIngredientsReasonsConfirmed,
    selected_ingredients: selectedIngredients,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackMassIssueAlertDisplayed = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.helpMassIssueIngredientAlertDisplayed,
    seCategory: SE_CATEGORY_HELP,
  }
})

export const trackSelectIngredient = (selectedIngredient) => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrSelectIngredient,
    ingredient_name: selectedIngredient,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackDeselectIngredient = (selectedIngredient) => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrDeselectIngredient,
    ingredient_name: selectedIngredient,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackRecipeCardClick = recipeId => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrClickViewRecipe,
    seCategory: SE_CATEGORY_HELP,
    recipe_id: recipeId,
  }
})

export const trackRecipeCardGetInTouchClick = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrRecipesClickGetInTouch,
    seCategory: SE_CATEGORY_HELP,
  }
})

export const trackSelectDeliveryCategory = (category) => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrDeliveriesSelectCategory,
    category_name: category,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackClickMyGoustoInSSRDeliveries = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrDeliveriesClickViewMyGousto,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackClickTrackMyBoxInSSRDeliveries = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrDeliveriesClickTrackMyBox,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackClickGetInTouchInSSRDeliveries = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrDeliveriesClickGetInTouch,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackAcceptRefundInSSRDeliveries = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrDeliveriesAcceptRefund,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const trackDeclineRefundInSSRDeliveries = () => ({
  type: webClientActionTypes.TRACKING,
  trackingData: {
    actionType: trackingKeys.ssrDeliveriesDeclineRefund,
    seCategory: SE_CATEGORY_HELP,
  },
})

export const applyDeliveryRefund = (
  userId,
  orderId,
  complaintCategory,
) => async (dispatch, getState) => {
  const getPayload = async () => {
    const accessToken = getState().auth.get('accessToken')
    const { index, confirmation } = clientRoutes.getHelp
    await applyDeliveryCompensation(accessToken, userId, orderId, complaintCategory)
    browserHistory.push(`${index}/${confirmation}`)
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_APPLY_DELIVERY_COMPENSATION,
    getPayload,
    errorMessage: `Failed to applyDeliveryRefund for userId: ${userId}, orderId: ${orderId}`,
  })
}

export const loadTrackingUrl = (orderId) => async (dispatch, getState) => {
  const getPayload = async () => {
    const accessToken = getState().auth.get('accessToken')
    const response = await fetchDeliveryConsignment(accessToken, orderId)
    const { trackingUrl } = response.data[0]

    return { trackingUrl }
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_LOAD_TRACKING_URL,
    getPayload,
    errorMessage: `Failed to loadTrackingUrl for orderId: ${orderId}`,
  })
}

export const validateLatestOrder = ({
  accessToken,
  orderId,
  costumerId
}) => async (dispatch, getState) => {
  dispatch(webClientStatusActions.pending(webClientActionTypes.GET_HELP_VALIDATE_ORDER, true))
  dispatch(webClientStatusActions.error(webClientActionTypes.GET_HELP_VALIDATE_ORDER, ''))

  try {
    const response = await validateOrder(
      accessToken,
      appendFeatureToRequest({
        body: {
          customer_id: Number(costumerId),
          order_id: Number(orderId),
        },
        featureShorterCompensationPeriod: getFeatureShorterCompensationPeriod(getState()),
      })
    )
    const { ineligibleIngredientUuids } = response.data

    dispatch({
      type: webClientActionTypes.GET_HELP_VALIDATE_ORDER,
      ineligibleIngredientUuids,
    })
  } catch (error) {
    dispatch(webClientStatusActions.error(webClientActionTypes.GET_HELP_VALIDATE_ORDER, error.message))
  } finally {
    dispatch(webClientStatusActions.pending(webClientActionTypes.GET_HELP_VALIDATE_ORDER, false))
  }
}

export const validateDeliveryAction = (customerId, orderId) => async (dispatch, getState) => {
  const getPayload = async () => {
    const accessToken = getState().auth.get('accessToken')
    const response = await validateDelivery(accessToken, customerId, orderId)
    const { compensation } = response.data

    return { compensation, isValid: true }
  }

  const handleError = () => {
    dispatch({
      type: actionTypes.GET_HELP_VALIDATE_DELIVERY,
      payload: { compensation: null, isValid: false }
    })
  }

  await asyncAndDispatch({
    dispatch,
    actionType: actionTypes.GET_HELP_VALIDATE_DELIVERY,
    getPayload,
    handleError,
    errorMessage: `Delivery validation errored for customerId: ${customerId}, orderId: ${orderId}`,
  })
}
