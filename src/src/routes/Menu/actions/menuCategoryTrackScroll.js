import { actionTypes } from '../../../actions/actionTypes'

export const trackCategoryScroll = ({
  actionType,
  scrollDepth,
  categoryId,
  categorySlug,
}) => ({
  type: actionTypes.MENU_TRACK_CATEGORY_SCROLL,
  trackingData: {
    actionType,
    scroll_depth: scrollDepth,
    collection_id: categoryId,
    collection_slug: categorySlug,
  }
})
