import { actionTypes } from "actions/actionTypes"

export const basketPreviewOrderChange = (previewOrderId, boxId, surcharges = []) => ({
  type: actionTypes.BASKET_PREVIEW_ORDER_CHANGE,
  boxId,
  previewOrderId,
  surcharges: surcharges || [],
})
