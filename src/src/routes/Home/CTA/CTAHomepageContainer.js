import { connect } from 'react-redux'
import { homeGetStarted } from 'actions/home'
import { getIsHomepageFreeDeliveryEnabled } from 'selectors/features'
import { CTA } from './CTA'

const mapStateToProps = (state) => ({
  isHomepageFreeDeliveryEnabled: getIsHomepageFreeDeliveryEnabled(state),
})

const mapDispatchToProps = {
  homeGetStarted,
}

const CTAHomepageContainer = connect(mapStateToProps, mapDispatchToProps)(CTA)

export { CTAHomepageContainer }
