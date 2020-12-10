import { connect } from 'react-redux'
import { getAccessToken } from 'selectors/auth'
import { getBrowserType } from 'selectors/browser'
import { isMobile } from 'utils/view'
import { startOnScreenRecoverySubscriptionFlow } from 'actions/onScreenRecovery'

import { Subscription } from './Subscription'

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  isMobile: isMobile(getBrowserType(state)),
})

const SubscriptionContainer = connect(mapStateToProps, {
  startOnScreenRecoverySubscriptionFlow,
})(Subscription)

export { SubscriptionContainer }
