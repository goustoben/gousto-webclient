import { connect } from 'react-redux'
import { getIsHomepageFreeDeliveryEnabled } from 'selectors/features'
import { Hero } from './Hero'

const mapStateToProps = (state) => ({
  isHomepageFreeDeliveryEnabled: getIsHomepageFreeDeliveryEnabled(state),
})

export const HeroContainer = connect(mapStateToProps)(Hero)
