import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

const triggerLoggingManagerEvent = ({ accessToken, body }) => fetch(
  accessToken,
  `${endpoint('loggingmanager')}log/${body && body.eventName}`,
  body,
  'POST',
  'default',
  { 'Content-Type': 'application/json' },
)

export {
  triggerLoggingManagerEvent,
}
