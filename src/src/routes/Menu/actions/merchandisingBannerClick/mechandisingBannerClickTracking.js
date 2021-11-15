import { actionTypes } from "actions/actionTypes"
import { clickMerchandisingBanner } from "actions/trackingKeys"

export const mechandisingBannerClickTracking = (sourceCollectionId, targetCollectionId) => ({
    type: actionTypes.TRACKING,
    trackingData: {
        actionType: clickMerchandisingBanner,
        collection_id: targetCollectionId,
        click_collection_id: sourceCollectionId
    }
})
