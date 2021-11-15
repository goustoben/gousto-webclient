import { actionTypes } from "actions/actionTypes"
import { persistTutorialViewed } from "actions/tutorial/persistTutorialViewed"

export const setTutorialViewed = (name, count) => (
    (dispatch, getState) => {
        dispatch({
            type: actionTypes.SET_TUTORIAL_VIEWED,
            name,
            count,
        })
        persistTutorialViewed(getState)
    }
)
