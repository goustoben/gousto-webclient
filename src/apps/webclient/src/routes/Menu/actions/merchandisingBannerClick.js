import { actionTypes } from 'actions/actionTypes'
import { clickMerchandisingBanner } from 'actions/trackingKeys'
import { changeCollectionById } from 'actions/filters'
import { getCurrentCollectionId } from '../selectors/collections'

const mechandisingBannerClickTracking = (sourceCollectionId, targetCollectionId) => ({
  type: actionTypes.TRACKING,
  trackingData: {
    actionType: clickMerchandisingBanner,
    collection_id: targetCollectionId,
    click_collection_id: sourceCollectionId,
  },
})

export const merchandisingBannerClick = (targetCollectionId) => (dispatch, getState) => {
  const currentCollectionId = getCurrentCollectionId(getState())

  dispatch(changeCollectionById(targetCollectionId))

  dispatch(mechandisingBannerClickTracking(currentCollectionId, targetCollectionId))
}
