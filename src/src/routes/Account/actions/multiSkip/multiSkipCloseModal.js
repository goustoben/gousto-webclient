import { modalVisibilityChange } from "actions/onScreenRecovery/modalVisibilityChange"
import { subscriptionPauseTrackRecover } from "actions/subscriptionPause/subscriptionPauseTrackRecover"
import { actionTypes } from "actions/actionTypes"

export const multiSkipCloseModal = () => (dispatch) => {
    modalVisibilityChange({modalVisibility: false})(dispatch)
    dispatch(subscriptionPauseTrackRecover())
    dispatch({
        type: actionTypes.CANCEL_MULTIPLE_BOXES_END
    })
}
