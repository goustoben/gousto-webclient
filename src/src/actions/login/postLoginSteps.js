import { getUserId } from "selectors/user"
import { getIsGoustoOnDemandEnabled, getIsPaymentBeforeChoosingEnabled } from "selectors/features"
import windowUtils from "utils/window"
import { client } from "config/routes"
import { loginRedirect } from "actions/login/loginRedirect"
import Cookies from "utils/GoustoCookies"
import globals from "config/globals"
import { isOptimizelyFeatureEnabledFactory } from "containers/OptimizelyRollouts"
import { isMobile } from "utils/view"
import { getBrowserType } from "selectors/browser"
import { push } from "react-router-redux"
import { loginVisibilityChange } from "actions/login/loginVisibilityChange"
import { orderAssignToUser } from "routes/Menu/actions/order/orderAssignToUser"

export const postLoginSteps = (userIsAdmin, orderId = '', features) => (
  async (dispatch, getState) => {
    const state = getState()
    const userId = getUserId(state)
    const isPaymentBeforeChoosingEnabled = getIsPaymentBeforeChoosingEnabled(state)
    const location = windowUtils.documentLocation()
    const onCheckout = location.pathname.includes('check-out')
    let destination = false

    const isGoustoOnDemandJourneyEnabled = getIsGoustoOnDemandEnabled(state) && location.pathname.includes(`${client.signup}/start`)
    if (isGoustoOnDemandJourneyEnabled) {
      windowUtils.redirect(`${client.signup}/apply-voucher`)

      return
    }

    if (!onCheckout) {
      destination = loginRedirect(location, userIsAdmin, features, userId)
      if (destination && destination !== client.myDeliveries) {
        windowUtils.redirect(destination)
      }
      if (Cookies.get('from_join')) {
        Cookies.expire('from_join')
      }
    }

    const windowObj = windowUtils.getWindow()
    if (globals.client && windowObj && typeof windowObj.__authRefresh__ === 'function' && windowObj.__store__) { // eslint-disable-line no-underscore-dangle
      windowObj.__authRefresh__(windowObj.__store__) // eslint-disable-line no-underscore-dangle
    }

    dispatch(pricingRequest())
    if (onCheckout) {
      if (orderId) {
        const isTasteProfileEnabled = isOptimizelyFeatureEnabledFactory('turnips_taste_profile_web_phased_rollout')

        if (isMobile(getBrowserType(getState())) && await isTasteProfileEnabled(dispatch, getState)) {
          windowUtils.redirect(`/taste-profile/${orderId}`)

          return
        }

        const welcomePage = isPaymentBeforeChoosingEnabled ? client.checkoutWelcome : client.welcome
        dispatch(push(`${welcomePage}/${orderId}`))
      } else {
        dispatch(loginVisibilityChange(false))
        dispatch(orderAssignToUser(undefined, getState().basket.get('previewOrderId')))
        dispatch(push(client.myGousto))
      }
    } else {
      setTimeout(() => {
        dispatch(loginVisibilityChange(false))
        if (destination === client.myDeliveries) {
          dispatch(push(client.myDeliveries))
        }
      }, 1000)
    }
  }
)
