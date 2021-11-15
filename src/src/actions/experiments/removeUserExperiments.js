import { actionTypes } from "actions/actionTypes"

export function removeUserExperiments() {
    return {
        type: actionTypes.EXPERIMENTS_REMOVE,
        payload: {}
    }
}
