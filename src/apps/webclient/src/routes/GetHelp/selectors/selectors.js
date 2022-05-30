import { actionTypes as webclientActionTypes } from 'actions/actionTypes'
import { createSelector } from 'reselect'
import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { getIsSsrRepetitiveIssues } from '../../../selectors/features'
import { getRecipes } from './recipesSelectors'
import { transformIngredientImgSrcSet } from '../utils/transformIngredientImgSrcSet'

export const getAccessToken = (state) => state.auth.get('accessToken')

export const getError = (state, actionType) => state.error.get(actionType, null)

export const getMassIssueIneligibleIngrsByRecipeGRMap = (state) => (
  state.getHelp.get('massIssueIneligibleIngrsByRecipeGRMap').toJS()
)

export const getOtherIssueIneligibleIngrsByRecipeGRMap = (state) => (
  state.getHelp.get('otherIssueIneligibleIngrsByRecipeGRMap').toJS()
)

export const getNumOrdersChecked = (state) => (
  state.getHelp.get('numOrdersChecked')
)

export const getNumOrdersCompensated = (state) => (
  state.getHelp.get('numOrdersCompensated')
)

export const getHasSeenRepetitiveIssuesScreen = (state) => (
  state.getHelp.get('hasSeenRepetitiveIssuesScreen')
)

export const getHasRepetitiveIssues = createSelector(
  getNumOrdersChecked,
  getNumOrdersCompensated,
  getIsSsrRepetitiveIssues,
  getHasSeenRepetitiveIssuesScreen,
  (
    numOrdersChecked,
    numOrdersCompensated,
    isSsrRepetitiveIssues,
    hasSeenRepetitiveIssuesScreen
  ) => (
    isSsrRepetitiveIssues
    && !hasSeenRepetitiveIssuesScreen
    && Boolean(numOrdersChecked && numOrdersCompensated)
  )
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

export const getSelectedIngredients = (state) => (
  state.getHelp.get('selectedIngredients').toJS()
)

export const getSelectedIngredientsWithImage = createSelector(
  getSelectedIngredients,
  getRecipes,
  (selectedIngredients, recipes) => Object.values(selectedIngredients).map(({ recipeId, ingredientUuid }) => {
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
