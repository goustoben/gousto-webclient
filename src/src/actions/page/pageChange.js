import { actionTypes } from "actions/actionTypes"

export const pageChange = newLocation => ({
  type: actionTypes.PAGE_CHANGED,
  newLocation,
  trackingData: {
    actionType: actionTypes.PAGE_CHANGED,
    newLocation,
  },
})
