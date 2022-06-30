import { connect } from 'react-redux'

import { homeGetStarted } from 'routes/Home/homeActions'

import { CTA } from './CTA'

const mapDispatchToProps = {
  homeGetStarted,
}

const CTAHomepageContainer = connect(null, mapDispatchToProps)(CTA)

export { CTAHomepageContainer }
