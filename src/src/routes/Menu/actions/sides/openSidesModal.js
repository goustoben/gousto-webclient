import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { trackViewSidesModal } from "actions/menu/trackViewSidesModal"
import { openSidesModalAction } from "routes/Menu/actions/sides/openSidesModalAction"

export const openSidesModal = () => (dispatch) => {
    dispatch(pending(actionTypes.BASKET_CHECKOUT, true))
    dispatch(trackViewSidesModal())
    dispatch(openSidesModalAction())
}
