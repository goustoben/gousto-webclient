import { connect } from 'react-redux'
import { activeMenuForDate } from '../../selectors/menu'
import { CategoriesThumbnail } from './CategoriesThumbnail'

function mapStateToProps(state, ownProps) {
  const date = new Date()
  const menuData = activeMenuForDate(state.menuService, date)
  const collection = menuData && menuData.relationships && menuData.relationships.collections.data.find((col) => col.id === ownProps.collectionId)
  const thumbnail = collection && collection.meta && collection.meta.thumbnail

  return {
    thumbnail
  }
}

const CategoriesThumbnailContainer = connect(mapStateToProps)(CategoriesThumbnail)

export { CategoriesThumbnailContainer }
