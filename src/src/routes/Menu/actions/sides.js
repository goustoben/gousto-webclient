import { actionTypes } from 'actions/actionTypes'
import { trackViewSidesModal, trackCancelSide } from 'actions/menu'
import statusActions from 'actions/status'

export const openSidesModalAction = () => ({ type: actionTypes.MENU_OPEN_SIDES_MODAL })

export const closeSidesModalAction = () => ({ type: actionTypes.MENU_CLOSE_SIDES_MODAL })

export const openSidesModal = () => (dispatch) => {
  dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, true))
  dispatch(trackViewSidesModal())
  dispatch(openSidesModalAction())
}

export const closeSidesModal = () => (dispatch) => {
  dispatch(statusActions.pending(actionTypes.BASKET_CHECKOUT, false))
  dispatch(trackCancelSide())
  dispatch(closeSidesModalAction())
}
