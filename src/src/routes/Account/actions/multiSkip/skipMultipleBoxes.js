import { cancelMultipleBoxes } from "actions/order/cancelMultipleBoxes"

export const skipMultipleBoxes = (selectedOrders, userId) => (dispatch, getState) => {
    cancelMultipleBoxes(selectedOrders, userId)(dispatch, getState)
}
