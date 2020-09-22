import logger from 'utils/logger'
import { actionTypes } from '../../../actions/actionTypes'
import { menuTimeToUsable } from '../../../actions/trackingKeys'
import { getTimeSinceRequestStart, getTimeToFirstByte } from './utils/browserTimings'
import { sendClientMetric } from '../apis/clientMetrics'
import { getAuthUserId } from '../../../selectors/auth'

const sendClientMetrics = async (timeToUsable, userId) => {
  try {
    await sendClientMetric('menu-load-complete', { timeToUsable }, userId)
  } catch (e) {
    logger.warning({
      message: 'Fail to send menu load complete metric to client metrics',
      extra: {
        timeToUsable,
      }
    })
  }
}

export const trackTimeToUsable = (timeToFirstByte, timeToUsable, menuPrefetched) => ({
  type: actionTypes.MENU_SET_CALCULATED_TIME_TO_USABLE,
  trackingData: {
    actionType: menuTimeToUsable,
    timeToFirstByte,
    timeToUsable,
    menuPrefetched
  }
})

export const menuCalculateTimeToUsable = () => (dispatch, getState) => {
  const timeToFirstByte = getTimeToFirstByte()
  const timeToUsable = getTimeSinceRequestStart()

  const state = getState()
  const { menu } = state
  const hasCalculatedTimeToUsable = menu.get('hasCalculatedTimeToUsable')
  const hasVisitedNonMenuPage = menu.get('hasVisitedNonMenuPage')
  const menuPrefetched = menu.get('menuPrefetched')

  const authUserId = getAuthUserId(state)

  if (!hasCalculatedTimeToUsable && !hasVisitedNonMenuPage) {
    dispatch(trackTimeToUsable(timeToFirstByte, timeToUsable, menuPrefetched))
    sendClientMetrics(timeToUsable, authUserId)
  }
}
