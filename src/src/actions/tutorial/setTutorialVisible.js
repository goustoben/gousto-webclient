import { actionTypes } from "actions/actionTypes"

export const setTutorialVisible = (name, value) => (
    (dispatch) => {
        dispatch({
            type: actionTypes.SET_TUTORIAL_VISIBLE,
            name,
            value,
        })
    }
)
