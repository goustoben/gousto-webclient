import { actionTypes } from "actions/actionTypes"

export function appendDefaultUserExperiment(experimentName) {
    return {
        type: actionTypes.EXPERIMENTS_APPEND,
        payload: {
            experiment: {
                name: experimentName,
                bucket: 'control',
                withinExperiment: false
            }
        }
    }
}
