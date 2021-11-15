import { connect } from 'react-redux'
import { merchandisingBannerClick } from '../../actions/merchandisingBannerClick/merchandisingBannerClick'
import { WaveLinkHeader } from './WaveLinkHeader'
import { SimpleLinkHeader } from './SimpleLinkHeader'

const mapDispatchToProps = (dispatch, ownProps) => ({
  onClick: () => {
    if (!ownProps.headerAttributes) {
      return
    }

    const {
      link: {
        collectionId
      }
    } = ownProps.headerAttributes

    dispatch(merchandisingBannerClick(collectionId))
  }
})

const WaveLinkHeaderContainer = connect(null, mapDispatchToProps)(WaveLinkHeader)
const SimpleLinkHeaderContainer = connect(null, mapDispatchToProps)(SimpleLinkHeader)

export { WaveLinkHeaderContainer, SimpleLinkHeaderContainer }
