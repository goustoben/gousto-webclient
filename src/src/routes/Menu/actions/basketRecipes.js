
import { menuBrowseCTAVisibilityChange } from 'actions/menu'
import { limitReached } from 'utils/basket'
import logger from 'utils/logger'
import { trackUserAddRemoveRecipe } from 'actions/loggingmanager'
import status from '.../../../actions/status'
import { getCurrentCollectionId } from '../selectors/collections'
import { getBasketRecipes , getBasketPostcode} from '../../../selectors/basket'
import { actionTypes } from '../../../actions/actionTypes'
import pricingActions from '../../../actions/pricing'
import * as trackingKeys from '../../../actions/trackingKeys'
import { getUTMAndPromoCode } from '../../../selectors/tracking'
import { getBasketNotValidError } from '../../../selectors/status'
import { getAuthUserId } from '../../../selectors/auth'
import { getMenuLimitsForBasket, validateRecipeAgainstRule } from '../selectors/menu'
import { clearBasketNotValidError } from './menuCheckoutClick'
import { menuRecipeDetailVisibilityChange } from './menuRecipeDetails'
import { getMenuRecipeIdForDetails } from '../selectors/menuRecipeDetails'
import { isOutOfStock } from '../selectors/recipe'
import { sendClientMetric } from '../apis/clientMetrics'

export const sendClientMetrics = async (userId) => {
  try {
    await sendClientMetric('menu-first-recipe-add', {}, userId)
  } catch (e) {
    logger.warning({
      message: 'Fail to send menu first recipe add metric to client metrics'
    })
  }
}

export const validBasketRecipeAdd = (recipeId, view, recipeInfo, maxRecipesNum) => (
  (dispatch, getState) => {
    const state = getState()
    const authUserId = getAuthUserId(state)
    const { basket, menuRecipeStock, menuRecipes } = state
    const numPortions = basket.get('numPortions')

    let reachedLimit = limitReached(basket, menuRecipes, menuRecipeStock, undefined, maxRecipesNum)
    const outOfStock = isOutOfStock(recipeId, numPortions, menuRecipeStock)
    if (reachedLimit || outOfStock) {
      return
    }

    const collection = getCurrentCollectionId(state)
    if (recipeInfo) {
      Object.assign(recipeInfo, { collection })
    }

    if (!basket.get('hasAddedFirstRecipe')) {
      sendClientMetrics(authUserId)
    }

    dispatch({
      type: actionTypes.BASKET_RECIPE_ADD,
      recipeId,
      ...recipeInfo,
      trackingData: {
        actionType: trackingKeys.addRecipe,
        recipeId,
        view,
        position: recipeInfo && recipeInfo.position,
        collection,
        recipe_count: basket.get('recipes').size + 1,// The action is performed in the same time so the size is not updated yet
      },
    })

    dispatch({
      type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
      stock: {
        [recipeId]: {
          [numPortions]: -1,
        },
      },
    })

    const { basket: newBasket, menuRecipes: newMenuRecipes, menuRecipeStock: newMenuRecipeStock } = getState()
    reachedLimit = limitReached(newBasket, newMenuRecipes, newMenuRecipeStock, undefined, maxRecipesNum)
    if (reachedLimit) {
      dispatch({
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: reachedLimit,
        trackingData: {
          actionType: trackingKeys.basketLimit,
          limitReached: reachedLimit,
          view,
          source: actionTypes.RECIPE_ADDED,
        },
      })
    }

    dispatch(pricingActions.pricingRequest())

    const prevRecipes = basket.get('recipes')
    const slotId = newBasket.get('slotId')
    const recipes = newBasket.get('recipes')
    const {promoCode, UTM} = getUTMAndPromoCode(state)

    let recipesCount = 0

    recipes.forEach(count => {
      recipesCount += count
    })

    if (prevRecipes.size < 2 && recipesCount > 1 && slotId) {
      dispatch({
        type: actionTypes.BASKET_ELIGIBLE_TRACK,
        trackingData: {
          actionType: trackingKeys.basketEligible,
          ...UTM,
          promoCode,
          recipes,
        },
      })
    }
  }
)

export const basketRecipeAdd = (recipeId, view, recipeInfo, maxRecipesNum) => (
  (dispatch, getState) => {
    const menuLimitsForBasket = getMenuLimitsForBasket(getState())
    const basketRecipes = getBasketRecipes(getState())
    const basketBreakingRules = {
      errorTitle: 'Oven Ready meals',
      recipeId,
      rules: []
    }
    basketBreakingRules.rules = validateRecipeAgainstRule(menuLimitsForBasket, recipeId, basketRecipes)
    const shouldCloseDetailsScreen = basketBreakingRules.rules.length && getMenuRecipeIdForDetails(getState())

    if (shouldCloseDetailsScreen) {
      dispatch(menuRecipeDetailVisibilityChange())
    }

    if (basketBreakingRules.rules.length) {
      dispatch(status.error(actionTypes.BASKET_NOT_VALID, basketBreakingRules))

      return
    }

    dispatch(exports.validBasketRecipeAdd(recipeId, view, recipeInfo, maxRecipesNum))
    dispatch(trackUserAddRemoveRecipe())
  }
)

export const basketRecipeRemove = (recipeId, view, position) => (
  (dispatch, getState) => {
    let state = getState()
    const { basket } = state
    const collection = getCurrentCollectionId(state)
    dispatch({
      type: actionTypes.BASKET_RECIPE_REMOVE,
      recipeId,
      trackingData: {
        actionType: trackingKeys.removeRecipe,
        recipeId,
        view,
        position,
        collection,
        recipe_count: basket.get('recipes').size - 1,// The action is performed in the same time so the size is not updated yet
      },
    })

    const numPortions = getState().basket.get('numPortions')
    dispatch({
      type: actionTypes.MENU_RECIPE_STOCK_CHANGE,
      stock: { [recipeId]: { [numPortions]: 1 } },
    })

    state = getState()
    const reachedLimit = limitReached(state.basket, state.menuRecipes, state.menuRecipeStock)
    if (!reachedLimit) {
      dispatch({
        type: actionTypes.BASKET_LIMIT_REACHED,
        limitReached: reachedLimit,
        trackingData: {
          actionType: trackingKeys.basketLimit,
          limitReached: reachedLimit,
          view,
          source: actionTypes.RECIPE_REMOVED,
        },
      })
    }

    dispatch(pricingActions.pricingRequest())
    dispatch(trackUserAddRemoveRecipe())
  }
)

export const basketRecipeSwap = () =>
  (dispatch, getState) => {
    const basketNotValidError = getBasketNotValidError(getState())

    if (basketNotValidError) {
      const recipeFromBasket = basketNotValidError.rules[0].items[0]
      const recipeToReplace = basketNotValidError.recipeId

      dispatch(exports.basketRecipeRemove(recipeFromBasket, 'swapModal'))
      dispatch(exports.validBasketRecipeAdd(recipeToReplace, 'swapModal'))
      dispatch(clearBasketNotValidError())
    }
  }

export const basketRecipeAddAttempt = (recipeId) => (
  (dispatch, getState) => {
    const basketPostcode = getBasketPostcode(getState())

    if (basketPostcode) {
      dispatch(exports.basketRecipeAdd(recipeId))
    } else {
      dispatch(menuBrowseCTAVisibilityChange(true))
    }
  }
)
