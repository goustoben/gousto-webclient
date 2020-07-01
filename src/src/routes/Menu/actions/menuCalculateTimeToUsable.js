import { actionTypes } from '../../../actions/actionTypes'
import { menuTimeToUsable } from '../../../actions/trackingKeys'
import { getTimeSinceRequestStart, getTimeToFirstByte } from './utils/browserTimings'

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
  const { menu } = getState()
  const hasCalculatedTimeToUsable = menu.get('hasCalculatedTimeToUsable')
  const hasVisitedNonMenuPage = menu.get('hasVisitedNonMenuPage')
  const menuPrefetched = menu.get('menuPrefetched')

  if (!hasCalculatedTimeToUsable && !hasVisitedNonMenuPage) {
    dispatch(trackTimeToUsable(timeToFirstByte, timeToUsable, menuPrefetched))
  }
}
