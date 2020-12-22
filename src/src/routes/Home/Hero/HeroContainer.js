import { connect } from 'react-redux'
import { getIsBrandDesignEnabled } from 'selectors/features'
import { Hero } from './Hero'

const mapStateToProps = (state) => ({
  isBrandDesignEnabled: getIsBrandDesignEnabled(state),
})

export const HeroContainer = connect(
  mapStateToProps,
)(Hero)
