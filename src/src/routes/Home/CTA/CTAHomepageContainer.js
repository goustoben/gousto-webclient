import { connect } from 'react-redux'
import { getHomePageRedesign } from 'selectors/features'
import { CTA } from './CTA'

function mapStateToProps(state) {
  return {
    isHomePageRedesignEnabled: getHomePageRedesign(state)
  }
}

const CTAHomepageContainer = connect(mapStateToProps)(CTA)

export { CTAHomepageContainer }
