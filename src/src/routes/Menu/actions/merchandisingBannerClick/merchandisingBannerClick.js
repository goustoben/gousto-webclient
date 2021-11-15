import { getCurrentCollectionId } from '../../selectors/collections'
import { changeCollectionById } from "actions/filters/changeCollectionById"
import { mechandisingBannerClickTracking } from "routes/Menu/actions/merchandisingBannerClick/mechandisingBannerClickTracking"

export const merchandisingBannerClick = (targetCollectionId) => (
  (dispatch, getState) => {
    const currentCollectionId = getCurrentCollectionId(getState())

    dispatch(changeCollectionById(targetCollectionId))

    dispatch(mechandisingBannerClickTracking(currentCollectionId, targetCollectionId))
  }
)
