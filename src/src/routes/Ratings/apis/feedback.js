import endpoint from 'config/endpoint'
import routes from 'config/routes'
import { fetch } from 'utils/fetch'

export function getUserFeedbackCount(accessToken, reqData) {
  return fetch(accessToken, `${endpoint('userfeedback')}${routes.userFeedback.feedback}`, reqData, 'GET')
}
