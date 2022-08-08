import actions from 'actions'

import { trackCheckoutButtonPressed } from 'routes/Checkout/checkoutActions'

/**
 * Click handle when user closes "Log In" modal.
 */
export const closeLoginModal = (e: MouseEvent): void => {
  if (e) {
    e.stopPropagation()
  }
  actions.loginVisibilityChange(false)
}

/**
 * Click handle when user clicks on "Log In".
 * @param e - mouse click event
 * @param isMobileView - is browser is in mobile view.
 * @param isAuthenticated - is user authenticated in application.
 */
export const openLoginModal = (
  e: MouseEvent,
  isMobileView: boolean,
  isAuthenticated: boolean,
): void => {
  if (e) {
    e.stopPropagation()
  }
  if (!isAuthenticated) {
    actions.loginVisibilityChange(true)
  }
  if (isMobileView) {
    trackCheckoutButtonPressed('LogInCTA Clicked')
  }
}
