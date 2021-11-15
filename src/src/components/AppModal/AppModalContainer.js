import { connect } from 'react-redux'

import { getBrowserType } from 'selectors/browser'
import { getBoxSummaryDismissed } from 'selectors/boxSummary'
import { getIsAuthenticated } from 'selectors/auth'
import { getPlatformDetails } from 'selectors/appBanner'
import { shouldShowBoxSummary } from 'selectors/basket'
import { getIsMobileMenuModalAppAwarenessEnabled } from 'selectors/features'

import { AppModal } from './AppModal'
import { trackAppModalView } from "actions/appModal/trackAppModalView"
import { trackClickAppModalInstall } from "actions/appModal/trackClickAppModalInstall"

const mapStateToProps = (state) => {
  const { name, ratings } = getPlatformDetails()

  return {
    isMobileViewport: getBrowserType(state) === 'mobile',
    boxSummaryDismissed: getBoxSummaryDismissed(state),
    isBoxSummaryVisible: shouldShowBoxSummary(state),
    isAuthenticated: getIsAuthenticated(state),
    isAppAwarenessEnabled: getIsMobileMenuModalAppAwarenessEnabled(state),
    name,
    ratings,
  }
}

const mapDispatchToProps = dispatch => ({
  trackAppModalView: () => dispatch(trackAppModalView),
  trackClickAppModalInstall: () => dispatch(trackClickAppModalInstall),
})

const AppModalContainer = connect(mapStateToProps, mapDispatchToProps)(AppModal)

export { AppModalContainer }
