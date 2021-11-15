import { actionTypes } from "actions/actionTypes"

export const cancelledAllBoxesModalToggleVisibility = (visibility) => ({
  type: actionTypes.CANCELLED_ALL_BOXES_MODAL_VISIBILITY_CHANGE,
  visibility,
})
