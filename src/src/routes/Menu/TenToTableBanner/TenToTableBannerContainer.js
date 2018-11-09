import { connect } from 'react-redux'
import actions from 'actions'
import TenToTableBanner from './TenToTableBanner'

const mapStateToProps = () => ({})

const TenToTableBannerContainer = connect(mapStateToProps, {
  collectionFilterChange: actions.collectionFilterChange,
})(TenToTableBanner)

export default TenToTableBannerContainer
