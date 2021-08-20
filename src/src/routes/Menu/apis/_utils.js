import ky from 'ky-universal'
import Cookies from 'utils/GoustoCookies'
import { get } from 'utils/cookieHelper2'
import { getAccessToken } from 'selectors/auth'
import { getUserId } from 'selectors/user'
import { sendTrackingData, getPathname } from 'middlewares/tracking/snowplow/utils'

const cache = { ky: ky.create({}) }

const getSessionId = () => get(Cookies, 'gousto_session_id', false, false)

export const getRequestHeaders = (userId) => ({
  'Content-Type': 'application/json',
  'x-gousto-device-id': getSessionId(),
  'x-gousto-user-id': userId
})

const valueForHeaderToBeOmitted = undefined

export const extendKyUserIdAndAccessToken = (userId, accessToken) => {
  cache.ky = cache.ky.extend({
    headers: {
      'x-gousto-device-id': getSessionId() || valueForHeaderToBeOmitted,
      'x-gousto-user-id': userId || valueForHeaderToBeOmitted,
      Authorization: accessToken ? `Bearer ${accessToken}` : valueForHeaderToBeOmitted,
    }
  })
}

/*
 * We sync the access token and user id from the store to the ky instance
 */
export const createAuthorizationSubscriber = (store) => {
  let currentAccessToken = ''
  let currentUserId = ''

  store.subscribe(() => {
    const previousAccessToken = currentAccessToken
    currentAccessToken = getAccessToken(store.getState())
    const previousUserId = currentUserId
    currentUserId = getUserId(store.getState())

    if (currentAccessToken !== previousAccessToken || currentUserId !== previousUserId) {
      extendKyUserIdAndAccessToken(currentUserId, currentAccessToken)
    }
  })
}

export const getKy = () => cache.ky

/**
 * Snowplow tracking data
 * @typedef {Object} SnowplowData
 * @property {string} name - The name of the event to be sent to Snowplow
 * @property {string} screen - The name of the screen to be sent to Snowplow
 * @property {string} type - The name of the event type to be sent to Snowplow
 * @property {object} properties - Additional properties to be sent to Snowplow
 */

/**
 * This is a function that sends tracking data to Snowplow, this is done by
 * pushing the data to the queue (window.dataLayer).
 *
 * @param {SnowplowData} snowplowData - The {@link SnowplowData} to be sent
 *
 *   snowplowTrackEvent({
 *     name: 'sides_continue_clicked',
 *     screen: 'order_sides_screen',
 *     type 'primary_action',
 *     properties: { sidesIds: [1, 2, 3] }
 *   })
 */

export const snowplowTrackEvent = ({ name, screen, type, properties = {} }) => {
  const pathname = getPathname()

  sendTrackingData({
    data: {
      ...properties,
      event_name: name,
      event_screen: screen,
      event_type: type,
    },
    pathname
  })
}
