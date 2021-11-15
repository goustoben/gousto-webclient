import { actionTypes } from "actions/actionTypes"
import * as trackingKeys from "actions/trackingKeys"

export const tutorialTracking = (tutorialName, turorialStep, dismissed) => (
    (dispatch) => {
        dispatch({
            type: actionTypes.TUTORIAL_TRACKING,
            trackingData: {
                actionType: dismissed ? trackingKeys.dismissTutorialModal : trackingKeys.viewTutorialModal,
                tutorial_name: tutorialName,
                turorial_step: turorialStep + 1,
            },
        })
    }
)
