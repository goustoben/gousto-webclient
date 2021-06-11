import { actionTypes } from 'routes/GetHelp/actions/actionTypes'
import { actionTypes as webclientActionTypes } from 'actions/actionTypes'

export const getAccessToken = (state) => state.auth.get('accessToken')

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

export const getRecipes = (state) => (
  state.getHelp.get('recipes').toJS()
)

export const getTrackingUrl = (state) => (
  state.getHelp.getIn(['order', 'trackingUrl'])
)

export const getIneligibleIngredientUuids = (state) => (
  state.getHelp.get('ineligibleIngredientUuids').toJS()
)
