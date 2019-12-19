import actionTypes from './actionTypes'

const pageActions = {
  pageChange: newLocation => ({
    type: actionTypes.PAGE_CHANGED,
    newLocation,
    trackingData: {
      actionType: actionTypes.PAGE_CHANGED,
      newLocation,
    },
  }),
}

export default pageActions
