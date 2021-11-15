import { actionTypes } from "actions/actionTypes"
import { persistTutorialViewed } from "actions/tutorial/persistTutorialViewed"

export const incrementTutorialViewed = (name) => (
    (dispatch, getState) => {
        dispatch({
            type: actionTypes.INCREMENT_TUTORIAL_VIEWED,
            name,
        })
        persistTutorialViewed(getState)
    }
)
