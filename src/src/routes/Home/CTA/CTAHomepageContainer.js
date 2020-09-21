import { connect } from 'react-redux'
import { getHomePageRedesign } from 'selectors/features'
import { homeGetStarted } from 'actions/home'
import { CTA } from './CTA'

function mapStateToProps(state) {
  return {
    isHomePageRedesignEnabled: getHomePageRedesign(state)
  }
}

const mapDispatchToProps = {
  homeGetStarted
}

const CTAHomepageContainer = connect(mapStateToProps, mapDispatchToProps)(CTA)

export { CTAHomepageContainer }
