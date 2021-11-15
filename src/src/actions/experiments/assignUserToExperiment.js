import Cookies from "utils/GoustoCookies"
import { getAuthUserId } from "selectors/auth"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { trackBucketedUser } from "actions/experiments/trackBucketedUser"
import { appendUserExperiment } from "actions/experiments/appendUserExperiment"
import logger from "utils/logger"
import { appendDefaultUserExperiment } from "actions/experiments/appendDefaultUserExperiment"
import { updateUserExperiment } from "apis/userBucketing/updateUserExperiment"

export function assignUserToExperiment(experimentName) {
    return async (dispatch, getState) => {
        const currentState = getState()
        const sessionId = Cookies.get('gousto_session_id')
        const userId = getAuthUserId(currentState)

        if (!sessionId || !experimentName) {
            return
        }

        try {
            dispatch(pending(actionTypes.EXPERIMENTS_ASSIGNING_USER, true))
            const {data} = await updateUserExperiment(experimentName, sessionId, userId)
            dispatch(trackBucketedUser({experimentName, withinExperiment: data.withinExperiment, bucket: data.bucket}))
            dispatch(appendUserExperiment(data))
        } catch (error) {
            logger.error({message: 'Failed to assign user to an experiment', extra: {error}})
            logger.info({message: `Defaulting user to control bucket for experiment: ${experimentName}`})

            dispatch(appendDefaultUserExperiment(experimentName))
        } finally {
            dispatch(pending(actionTypes.EXPERIMENTS_ASSIGNING_USER, false))
        }
    }
}
