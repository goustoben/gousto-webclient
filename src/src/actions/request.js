import actionTypes from './actionTypes'

export const setUserAgent = userAgent => ({
  type: actionTypes.BROWSER_SET_USER_AGENT,
  userAgent,
})

export const browserTypeChange = browserType => ({
  type: actionTypes.BROWSER_TYPE_CHANGE,
  browserType,
})
