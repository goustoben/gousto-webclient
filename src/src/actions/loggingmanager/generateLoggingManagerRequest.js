import { v4 as uuidv4 } from "uuid"

export const generateLoggingManagerRequest = ({loggingManagerEvent}) => {
    const {eventName, authUserId, data, isAnonymousUser} = loggingManagerEvent
    const currentDateISOString = new Date().toISOString()

    const request = {
        id: uuidv4(),
        name: eventName,
        authUserId,
        isAnonymousUser,
        occurredAt: currentDateISOString,
        data
    }

    return request
}
