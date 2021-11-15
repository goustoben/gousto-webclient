import Cookies from "utils/GoustoCookies"
import { getAuthUserId } from "selectors/auth"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { storeUserExperiments } from "actions/experiments/storeUserExperiments"
import logger from "utils/logger"
import { getUserExperiments } from "apis/userBucketing/getUserExperiments"

export function fetchUserExperiments() {
    return async (dispatch, getState) => {
        const currentState = getState()
        const sessionId = Cookies.get('gousto_session_id')
        const userId = getAuthUserId(currentState)

        if (!sessionId) {
            return
        }

        try {
            dispatch(pending(actionTypes.EXPERIMENTS_FETCHING, true))
            const {data} = await getUserExperiments(sessionId, userId)
            dispatch(storeUserExperiments(data))
        } catch (error) {
            logger.error({message: 'Failed to retrieve user experiments', extra: {error}})
        } finally {
            dispatch(pending(actionTypes.EXPERIMENTS_FETCHING, false))
        }
    }
}
