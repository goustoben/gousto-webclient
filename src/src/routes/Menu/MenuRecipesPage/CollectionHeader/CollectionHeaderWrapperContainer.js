import { connect } from 'react-redux'
import { getCollectionsHeaders } from '../../selectors/collections'
import { CollectionHeaderWrapper } from './CollectionHeaderWrapper'

const mapStateToProps = (state) => ({
  collectionsHeaders: getCollectionsHeaders(state)
})

const CollectionHeaderWrapperContainer = connect(mapStateToProps)(CollectionHeaderWrapper)

export { CollectionHeaderWrapperContainer }
