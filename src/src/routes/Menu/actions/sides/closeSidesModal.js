import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { trackCancelSide } from "actions/menu/trackCancelSide"
import { closeSidesModalAction } from "routes/Menu/actions/sides/closeSidesModalAction"

export const closeSidesModal = () => (dispatch) => {
    dispatch(pending(actionTypes.BASKET_CHECKOUT, false))
    dispatch(trackCancelSide())
    dispatch(closeSidesModalAction())
}
