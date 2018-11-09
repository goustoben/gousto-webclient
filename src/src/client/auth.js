import { authorise } from 'utils/clientAuthorise'
import moment from 'moment'
import config from 'config/auth'

let timeOutRef // eslint-disable-line no-unused-vars

export async function clientAuthorise(store) {
  return authorise(store)
}

async function refreshClient(store) {
  const refreshToken = store.getState().auth.get('refreshToken')

  try {
    if (refreshToken) {
      await clientAuthorise(store)
    }
  } catch (err) {
    // refresh failed
  }

  if (refreshToken) {
    refresh(store) // eslint-disable-line no-use-before-define
  }
}

export function refresh(store) {
  try {
    const expiresAt = store.getState().auth.get('expiresAt')
    if (expiresAt) {
      const now = moment()
      const refreshAt = moment(expiresAt).subtract(config.expiresThreshold, 'minutes')
      const ttl = Math.max(1, Math.round(moment.duration(refreshAt.diff(now)).asSeconds()))

      clearTimeout(timeOutRef)
      timeOutRef = setTimeout(() => { refreshClient(store) }, ttl * 1000)
    }
  } catch (err) {
    // refresh failed
    clearTimeout(timeOutRef)
  }
}
