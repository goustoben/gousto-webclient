import { push } from 'react-router-redux'
import { actionTypes } from 'actions/actionTypes'
import {
  showcaseMenuProceed,
  showcaseMenuChangeCollection,
  showcaseMenuOpenRecipeDetails,
  showcaseMenuScrollCarousel,
  showcaseMenuView,
} from 'actions/trackingKeys'
import routesConfig from 'config/routes'
import { getNumPortions, getNumRecipes, getBasketPostcode, getBasketSlotId } from 'selectors/basket'
import { collectionFilterChange } from "actions/filters/collectionFilterChange"
import { trackShowcaseMenuAction } from "actions/tracking/trackShowcaseMenuAction"
import { showDetailRecipe } from "routes/Menu/actions/menuRecipeDetails/showDetailRecipe"

export const setShowcaseMenuSeen = () => ({
  type: actionTypes.SHOWCASE_MENU_SEEN,
})

export const proceed = () => (dispatch, getState) => {
  const state = getState()
  const basketDataAvailable =
    !!getNumPortions(state) &&
    !!getNumRecipes(state) &&
    !!getBasketPostcode(state) &&
    !!getBasketSlotId(state)

  if (basketDataAvailable) {
    dispatch(trackShowcaseMenuAction(showcaseMenuProceed))
    dispatch(push(routesConfig.client['check-out']))
  } else {
    dispatch(setShowcaseMenuSeen())
    dispatch(trackShowcaseMenuAction(showcaseMenuProceed))
    dispatch(push(routesConfig.client.signup))
  }
}

export const changeCollection = (id, shortTitle) => (dispatch) => {
  dispatch(trackShowcaseMenuAction(showcaseMenuChangeCollection, { category: shortTitle }))
  dispatch(collectionFilterChange(id))
}

export const openRecipeDetails = (recipeId, currentCollectionId, title) => (dispatch) => {
  dispatch(trackShowcaseMenuAction(showcaseMenuOpenRecipeDetails, { recipe: title }))
  dispatch(showDetailRecipe(recipeId, currentCollectionId))
}

export const trackScrollOneStep = (direction) => (dispatch) => {
  dispatch(trackShowcaseMenuAction(showcaseMenuScrollCarousel, { direction }))
}

export const trackShowcaseMenuView = () => (dispatch) => {
  dispatch(trackShowcaseMenuAction(showcaseMenuView))
}
