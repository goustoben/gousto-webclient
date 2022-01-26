import { connect } from 'react-redux'
import { CategoriesThumbnail } from './CategoriesThumbnail'
import { getCurrentCollectionThumbnail } from '../../selectors/collections'

function mapStateToProps(state, ownProps) {
  return {
    thumbnail: getCurrentCollectionThumbnail(state, {categoryId: ownProps.collectionId})
  }
}

const CategoriesThumbnailContainer = connect(mapStateToProps)(CategoriesThumbnail)

export { CategoriesThumbnailContainer }
