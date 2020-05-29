import { connect } from 'react-redux'
import { changeCollectionById } from 'actions/filters'
import { getCollectionsHeaders } from '../../selectors/collections'
import { CollectionHeaderWrapper } from './ CollectionHeaderWrapper'

const mapStateToProps = (state) => ({
  collectionsHeaders: getCollectionsHeaders(state)
})

const CollectionHeaderWrapperContainer = connect(mapStateToProps, {
  changeCollectionById
})(CollectionHeaderWrapper)

export { CollectionHeaderWrapperContainer }
