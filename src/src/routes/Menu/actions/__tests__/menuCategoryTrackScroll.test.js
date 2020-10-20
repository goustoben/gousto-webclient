import { actionTypes } from '../../../../actions/actionTypes'
import { trackCategoryScroll } from '../menuCategoryTrackScroll'

describe('menuPrefetch', () => {
  test('should return menuPrefetched action with payload', () => {
    const result = trackCategoryScroll({
      actionType: 'test',
      scrollDepth: 20,
      categoryId: '123',
      categorySlug: 'category',
    })

    expect(result).toEqual({
      type: actionTypes.MENU_TRACK_CATEGORY_SCROLL,
      trackingData: {
        actionType: 'test',
        collection_id: '123',
        collection_slug: 'category',
        scroll_depth: 20
      },
    })
  })
})
