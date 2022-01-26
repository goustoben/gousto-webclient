import { connect } from 'react-redux'
import { SubscriberPricingBanner } from './SubscriberPricingBanner'
import { trackMyGoustoSubscriberPricingBannerClick } from '../../actions/tracking'

const SubscriberPricingBannerContainer = connect(null, {
  trackMyGoustoSubscriberPricingBannerClick,
})(SubscriberPricingBanner)

export {
  SubscriberPricingBannerContainer
}
