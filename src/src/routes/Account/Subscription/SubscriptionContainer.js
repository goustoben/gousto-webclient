import { connect } from 'react-redux'
import { getAccessToken } from 'selectors/auth'
import { getBasketPostcode } from 'selectors/basket'
import { getBrowserType } from 'selectors/browser'
import { isMobile } from 'utils/view'

import { Subscription } from './Subscription'

const mapStateToProps = (state) => ({
  accessToken: getAccessToken(state),
  postcode: getBasketPostcode(state),
  isMobile: isMobile(getBrowserType(state))
})

const SubscriptionContainer = connect(mapStateToProps, {
})(Subscription)

export { SubscriptionContainer }
