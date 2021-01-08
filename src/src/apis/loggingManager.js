import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'

const triggerLoggingManagerEvent = ({ accessToken, loggingManagerRequest }) => fetch(
  accessToken,
  `${endpoint('loggingmanager')}/log`,
  loggingManagerRequest,
  'POST',
  'no-cache',
  { 'Content-Type': 'application/json' },
)

export {
  triggerLoggingManagerEvent,
}
