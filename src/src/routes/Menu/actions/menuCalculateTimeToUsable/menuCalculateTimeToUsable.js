import { getTimeSinceRequestStart, getTimeToFirstByte } from '../utils/browserTimings'
import { trackTimeToUsable } from "routes/Menu/actions/menuCalculateTimeToUsable/trackTimeToUsable"
import { sendClientMetric } from "routes/Menu/apis/clientMetrics/sendClientMetric"

export const menuCalculateTimeToUsable = () => (dispatch, getState) => {
  const timeToFirstByte = getTimeToFirstByte()
  const timeToUsable = getTimeSinceRequestStart()

  const state = getState()
  const { menu } = state
  const hasCalculatedTimeToUsable = menu.get('hasCalculatedTimeToUsable')
  const hasVisitedNonMenuPage = menu.get('hasVisitedNonMenuPage')
  const menuPrefetched = menu.get('menuPrefetched')

  if (!hasCalculatedTimeToUsable && !hasVisitedNonMenuPage) {
    dispatch(trackTimeToUsable(timeToFirstByte, timeToUsable, menuPrefetched))
    sendClientMetric('menu-load-complete', 1, 'Count')
  }
}
