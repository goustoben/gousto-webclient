import { connect } from 'react-redux'
import CollectionList from 'Collection/List'
import * as storeUtils from 'utils/store'
import * as cookbookUtils from 'utils/cookbook'

function mapStateToProps({ cookbook, collections }) {
  const startSet = cookbook.get('collectionsStartSet')
  const endSet = cookbook.get('collectionsEndSet')
  const loadedCollectionIds = cookbookUtils.getItemIds(cookbook.get('collectionSets'), { endSet, startSet })

  return {
    collections: storeUtils.getItemsById(loadedCollectionIds, collections),
  }
}

export default connect(mapStateToProps)(CollectionList)
