import { connect } from 'react-redux'
import { CTA } from './CTA'
import { homeGetStarted } from "actions/home/homeGetStarted"

const mapDispatchToProps = {
  homeGetStarted,
}

const CTAHomepageContainer = connect(null, mapDispatchToProps)(CTA)

export { CTAHomepageContainer }
