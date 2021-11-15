import { collectionFilterChange } from "actions/filters/collectionFilterChange"
import { ALL_RECIPES_COLLECTION_ID } from "config/collections"
import { trackCTAToAllRecipesClicked } from "actions/tracking/trackCTAToAllRecipesClicked"

export const changeCollectionToAllRecipesViaCTA = () => (
  (dispatch) => {
    dispatch(collectionFilterChange(ALL_RECIPES_COLLECTION_ID))
    dispatch(trackCTAToAllRecipesClicked())
  }
)
