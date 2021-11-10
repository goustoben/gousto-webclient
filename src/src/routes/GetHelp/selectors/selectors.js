import { createSelector } from 'reselect'
import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { actionTypes as webclientActionTypes } from 'actions/actionTypes'
import { transformIngredientImgSrcSet } from '../utils/transformIngredientImgSrcSet'

export const getAccessToken = (state) => state.auth.get('accessToken')

export const getError = (state, actionType) => state.error.get(actionType, null)

export const getMassIssueIneligibleIngredientUuids = (state) => (
  state.getHelp.get('massIssueIneligibleIngredientUuids').toJS()
)

export const getOtherIssueIneligibleIngredientUuids = (state) => (
  state.getHelp.get('otherIssueIneligibleIngredientUuids').toJS()
)

export const getNumOrdersChecked = (state) => (
  state.getHelp.get('numOrdersChecked')
)

export const getNumOrdersCompensated = (state) => (
  state.getHelp.get('numOrdersCompensated')
)

export const getIsAutoAccept = (state) => (
  state.getHelp.get('isAutoAccept')
)

export const getIsError = createSelector(getError,
  (error) => Boolean(error))

export const getIsLoadOrderError = (state) => (
  !!state.error.get(webclientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID)
)

export const getIsOrderLoading = (state) => (
  state.pending.get(webclientActionTypes.GET_HELP_LOAD_ORDERS_BY_ID)
)

export const getIsTrackingUrlLoading = (state) => (
  state.pending.get(actionTypes.GET_HELP_LOAD_TRACKING_URL)
)

export const getOrder = (state) => (
  state.getHelp.get('order').toJS()
)

export const getOrderDeliveryDate = (state) => (
  state.getHelp.getIn(['order', 'deliveryDate'])
)

export const getOrderDeliverySlot = (state) => (
  state.getHelp.getIn(['order', 'deliverySlot']).toJS()
)

export const getOrderId = state => state.getHelp.getIn(['order', 'id'])

export const getPending = (state, actionType) => state.pending.get(actionType, false)

export const getRecipes = (state) => (
  state.getHelp.get('recipes').toJS()
)

export const getSelectedIngredients = (state) => (
  state.getHelp.get('selectedIngredients').toJS()
)

export const getSelectedIngredientsWithImage = createSelector(
  getSelectedIngredients, getRecipes,
  (selectedIngredients, recipes) => Object.values(selectedIngredients).map(({recipeId, ingredientUuid}) => {
    const recipeForIngredient = recipes.find(recipe => recipe.id === recipeId)
    const ingredientData = recipeForIngredient.ingredients.find(ingredient => ingredient.uuid === ingredientUuid)

    return {
      ingredientUuid,
      label: ingredientData.label,
      srcSet: transformIngredientImgSrcSet(ingredientData.urls)
    }
  })
)

export const getSelectedIngredientIssuesIDs = createSelector(getSelectedIngredients,
  (selectedIngredients) => Object.keys(selectedIngredients).map(key => selectedIngredients[key].issueId))

export const getTrackingUrl = (state) => (
  state.getHelp.getIn(['order', 'trackingUrl'])
)
