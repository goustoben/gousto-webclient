import { shouldAssignUserToExperiment, shouldFetchExperiments } from "selectors/experiments"

export function fetchOrAssignUserToExperiment(experimentName) {
    return async (dispatch, getState) => {
        const currentState = getState()
        const fetchExperiments = shouldFetchExperiments(currentState)
        const assignUser = shouldAssignUserToExperiment(currentState, {experimentName})

        if (fetchExperiments) {
            dispatch(exports.fetchUserExperiments())
        } else if (assignUser) {
            dispatch(exports.assignUserToExperiment(experimentName))
        }
    }
}
