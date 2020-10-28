import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import actions from 'actions/subscriptionPause'
import { cancelMultipleBoxes } from 'actions/order'
import { modalVisibilityChange } from 'actions/onScreenRecovery'

export const multiSkipTrackContinueToPause = () => (dispatch) => {
  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.continueToPause
    }
  })
}

export const multiSkipCloseModal = () => (dispatch) => {
  modalVisibilityChange({ modalVisibility: false })(dispatch)
  dispatch(actions.subscriptionPauseTrackRecover())
  dispatch({
    type: actionTypes.CANCEL_MULTIPLE_BOXES_END
  })
}

export const skipMultipleBoxes = (selectedOrders) => (dispatch, getState) => {
  dispatch(actions.subscriptionPauseTrackRecover())
  cancelMultipleBoxes(selectedOrders)(dispatch, getState)
}
