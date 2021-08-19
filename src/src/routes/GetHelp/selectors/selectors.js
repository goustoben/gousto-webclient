import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { actionTypes as webclientActionTypes } from 'actions/actionTypes'
import { createSelector } from 'reselect'

export const getAccessToken = (state) => state.auth.get('accessToken')

export const getCompensation = (state) => state.getHelp.get('compensation').toJS()

export const getError = (state, actionType) => state.error.get(actionType, null)

export const getIneligibleIngredientUuids = (state) => (
  state.getHelp.get('ineligibleIngredientUuids').toJS()
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

export const getSelectedIngredientIssuesIDs = createSelector(getSelectedIngredients,
  (selectedIngredients) => Object.keys(selectedIngredients).map(key => selectedIngredients[key].issueId))

export const getTrackingUrl = (state) => (
  state.getHelp.getIn(['order', 'trackingUrl'])
)
