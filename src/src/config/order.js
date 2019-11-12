import actionTypes from 'actions/actionTypes'

export const orderTrackingActions = {
  create: {
    actionType: actionTypes.ORDER_CREATE_TRANSACTIONAL,
    trackAffiliate: true,
  },
  'recipe-choice': {
    actionType: actionTypes.ORDER_RECIPES_CHOSEN,
    trackAffiliate: true,
  },
  'recipe-update': {
    actionType: null,
    trackAffiliate: false,
  },
}
