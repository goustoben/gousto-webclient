import { documentLocation, getWindow } from 'utils/window'

export function sendTrackingData({ seCategory, type, action, data = {}, version = 1, pathname }) {
  const windowObj = getWindow()

  if (windowObj && Array.isArray(windowObj.dataLayer)) {
    windowObj.dataLayer.push({
      action,
      event: 'userAction',
      category: seCategory,
      actionType: type,
      actionValue: JSON.stringify(data),
      pathname,
      version,
    })
  }
}

export function getPathname(state) {
  let pathname

  try {
    pathname = state.routing.locationBeforeTransitions.pathname
  } catch (e) {
    pathname = documentLocation().pathname
  }

  return pathname
}

export const trackEventWithData = getTrackingData => (action, state, prevState, pathname) => {
  const data = getTrackingData(action, state, prevState, pathname)

  sendTrackingData({ ...data, pathname })
}
