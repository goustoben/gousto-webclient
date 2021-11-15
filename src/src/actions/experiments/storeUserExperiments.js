import { actionTypes } from "actions/actionTypes"

export function storeUserExperiments(experiments) {
    return {
        type: actionTypes.EXPERIMENTS_RECEIVED,
        payload: {
            experiments
        }
    }
}
