import { connect } from 'react-redux'
import { getHomePageRedesign } from 'selectors/features'

import Hero from './Hero'

const mapStateToProps = (state) => ({
  isHomePageRedesignEnabled: getHomePageRedesign(state)
})

const HeroContainer = connect(
  mapStateToProps,
)(Hero)

export default HeroContainer
