import { getDefaultParams } from "actions/loggingmanager/getDefaultParams"
import { error } from "actions/status/error"
import { pending } from "actions/status/pending"
import { actionTypes } from "actions/actionTypes"
import { generateLoggingManagerRequest } from "actions/loggingmanager/generateLoggingManagerRequest"
import { triggerLoggingManagerEvent } from "apis/loggingmanager/triggerLoggingManagerEvent"

const sendGoustoAppLinkSMS = ({isAnonymousUser, goustoAppEventName: eventName, userPhoneNumber}) => (
    async (dispatch, getState) => {
        const {authUserId, device, accessToken} = getDefaultParams(getState())
        const loggingManagerEvent = {
            eventName,
            ...(!isAnonymousUser && {authUserId}),
            isAnonymousUser,
            data: {
                device,
                userPhoneNumber,
            },
        }

        dispatch(pending(actionTypes.LOGGING_MANAGER_EVENT_PENDING, true))
        dispatch(error(actionTypes.LOGGING_MANAGER_EVENT_ERROR, false))
        dispatch({
            type: actionTypes.LOGGING_MANAGER_EVENT_SENT,
            response: {key: 'goustoAppLinkSMS', value: false},
        })
        dispatch({
            type: actionTypes.TRACKING,
            trackingData: {
                actionType: 'click_send_text_app_install',
            }
        })

        try {
            const loggingManagerRequest = generateLoggingManagerRequest({loggingManagerEvent})

            await triggerLoggingManagerEvent({accessToken, loggingManagerRequest})

            dispatch({
                type: actionTypes.LOGGING_MANAGER_EVENT_SENT,
                response: {key: 'goustoAppLinkSMS', value: true}
            })
            dispatch({
                type: actionTypes.TRACKING,
                trackingData: {
                    actionType: 'click_send_text_app_install_sent',
                }
            })
        } catch (error) {
            const errorMessage = (typeof error === 'object' && error.message)
                ? error.message
                : 'An error occurred, please try again'

            dispatch(error(actionTypes.LOGGING_MANAGER_EVENT_ERROR, errorMessage))
            dispatch({
                type: actionTypes.TRACKING,
                trackingData: {
                    actionType: 'click_send_text_app_install_error',
                }
            })
        } finally {
            dispatch(pending(actionTypes.LOGGING_MANAGER_EVENT_PENDING, false))
        }
    }
)
export { sendGoustoAppLinkSMS }
