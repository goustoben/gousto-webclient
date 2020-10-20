import { actionTypes } from 'actions/actionTypes'
import * as trackingKeys from 'actions/trackingKeys'
import actions from 'actions/subscriptionPause'
import { cancelMultipleBoxes } from 'actions/order'

export const multiSkipTrackContinueToPause = () => (dispatch) => {
  dispatch({
    type: actionTypes.TRACKING,
    trackingData: {
      actionType: trackingKeys.continueToPause
    }
  })
}

export const multiSkipCloseModal = () => (dispatch) => {
  dispatch(actions.subscriptionPauseVisibilityChange(false))
  dispatch(actions.subscriptionPauseTrackRecover())
}

export const skipMultipleBoxes = (selectedOrders) => (dispatch, getState) => {
  dispatch(actions.subscriptionPauseTrackRecover())
  cancelMultipleBoxes(selectedOrders)(dispatch, getState)
}
