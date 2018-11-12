import actionTypes from './actionTypes'

export default {
  pageChange: newLocation => ({
    type: actionTypes.PAGE_CHANGED,
    newLocation,
    trackingData: {
      actionType: actionTypes.PAGE_CHANGED,
      newLocation,
    },
  }),
}
