import { getIsLoginModalAppAwarenessEnabled } from 'selectors/features'
import { getBrowserType } from 'selectors/browser'

export const getIsAppAwarenessLoginEnabled = (state) => {
  const path = typeof window !== 'undefined' ? window.location.pathname : state.routing.locationBeforeTransitions.pathname

  const isHelpPreLoginOpen = state.loginVisibility.get('helpPreLogin')
  const isAppAwarenessEnabled = getIsLoginModalAppAwarenessEnabled(state)
  const isMobile = (getBrowserType(state) === 'mobile')
  const isValidPath = path !== '/resetform'

  return !isHelpPreLoginOpen && isAppAwarenessEnabled && !isMobile && isValidPath
}
