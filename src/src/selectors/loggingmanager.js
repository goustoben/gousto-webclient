import { actionTypes } from 'actions/actionTypes'
import { getPlatformDetails } from 'selectors/appBanner'
import { EVENT_NAMES } from "actions/loggingmanager/EVENT_NAMES"

export const getGoustoAppEventName = () => {
  const { name } = getPlatformDetails()
  let goustoAppEventName = null

  if (name && name === 'Android') {
    goustoAppEventName = EVENT_NAMES.sendGoustoAppLinkPlayStoreSMS
  } else if (name === 'iOS') {
    goustoAppEventName = EVENT_NAMES.sendGoustoAppLinkAppStoreSMS
  } else {
    goustoAppEventName = EVENT_NAMES.sendGoustoAppLinkNotSpecifiedStoreSMS
  }

  return goustoAppEventName
}

export const showEventPending = ({ pending }) => (
  pending.get(actionTypes.LOGGING_MANAGER_EVENT_PENDING, false) !== false
)

export const getEventErrorMessage = ({ error }) => (
  error.get(actionTypes.LOGGING_MANAGER_EVENT_ERROR, '')
)

export const showEventSent = ({ loggingManager }) => (
  loggingManager.getIn(['eventSent', 'goustoAppLinkSMS'], false)
)
