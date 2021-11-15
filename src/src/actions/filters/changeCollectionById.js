import { ALL_RECIPES_COLLECTION_ID } from "config/collections"
import { collectionFilterChange } from "actions/filters/collectionFilterChange"

export const changeCollectionById = (id = ALL_RECIPES_COLLECTION_ID) => (
  (dispatch) => {
    dispatch(collectionFilterChange(id))
  }
)
