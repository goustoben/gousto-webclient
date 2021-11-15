import { getDefaultParams } from "actions/loggingmanager/getDefaultParams"
import { EVENT_NAMES } from "actions/loggingmanager/EVENT_NAMES"
import { generateLoggingManagerRequest } from "actions/loggingmanager/generateLoggingManagerRequest"
import { triggerLoggingManagerEvent } from "apis/loggingmanager/triggerLoggingManagerEvent"

const trackUserFreeFoodPageView = () => (
    async (dispatch, getState) => {
        const {authUserId, device, accessToken} = getDefaultParams(getState())
        const eventName = EVENT_NAMES.rafPageVisited

        const loggingManagerEvent = {
            eventName,
            authUserId,
            data: {
                device,
            },
        }

        const loggingManagerRequest = generateLoggingManagerRequest({loggingManagerEvent})

        triggerLoggingManagerEvent({accessToken, loggingManagerRequest})
    }
)
export { trackUserFreeFoodPageView }
