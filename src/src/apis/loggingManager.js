import fetch from 'utils/fetch'
import endpoint from 'config/endpoint'
import routes from 'config/routes'

const triggerLoggingManagerEvent = ({ accessToken, body }) => fetch(
  accessToken,
  `${endpoint('loggingmanager')}/log`,
  body,
  'POST',
  'default',
  { 'Content-Type': 'application/json' },
)

const logEventToServer = (body) => fetch(
  null,
  `${routes.auth.logEvent}`,
  body,
  'POST',
  'default',
  { 'Content-Type': 'application/json' }
)

export {
  triggerLoggingManagerEvent,
  logEventToServer,
}
