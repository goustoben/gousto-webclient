import { push } from 'react-router-redux'
import { actionTypes } from 'actions/actionTypes'
import { trackShowcaseMenuAction } from 'actions/tracking'
import {
  showcaseMenuProceed,
  showcaseMenuChangeCollection,
  showcaseMenuOpenRecipeDetails,
  showcaseMenuScrollCarousel,
} from 'actions/trackingKeys'
import { collectionFilterChange } from 'actions/filters'
import routesConfig from 'config/routes'
import { getNumPortions, getNumRecipes } from 'selectors/basket'
import { showDetailRecipe } from 'routes/Menu/actions/menuRecipeDetails'

export const setShowcaseMenuSeen = () => ({
  type: actionTypes.SHOWCASE_MENU_SEEN,
})

export const proceed = () => (dispatch, getState) => {
  const state = getState()
  const basketDataAvailable = !!getNumPortions(state) && !!getNumRecipes(state)

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
