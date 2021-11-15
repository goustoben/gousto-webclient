import { actionTypes } from "actions/actionTypes"

export function appendUserExperiment(experiment) {
    return {
        type: actionTypes.EXPERIMENTS_APPEND,
        payload: {
            experiment
        }
    }
}
