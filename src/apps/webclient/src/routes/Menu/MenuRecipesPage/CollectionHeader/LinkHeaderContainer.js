import { connect } from 'react-redux'
import { merchandisingBannerClick } from '../../actions/merchandisingBannerClick'
import { WaveLinkHeader } from './WaveLinkHeader'

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

export { WaveLinkHeaderContainer }
