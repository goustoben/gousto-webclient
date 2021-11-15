import { fetch } from "utils/fetch"
import endpoint from "config/endpoint"
import { feedbackRoute } from "config/routes/userFeedback/feedbackRoute"

export function getUserFeedbackCount(accessToken, reqData) {
    return fetch(accessToken, `${endpoint('userfeedback')}${feedbackRoute}`, reqData, 'GET')
}
