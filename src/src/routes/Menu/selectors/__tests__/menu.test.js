import Immutable from 'immutable'

import { getIsMenuRecommended, getCurrentCollectionSlug } from 'routes/Menu/selectors/menu'

describe('menu memoized selectors', () => {
  let state

  describe('getCurrentCollectionSlug', () => {
    test('should return the slug for current collection', () => {
      state = {
        filters: Immutable.fromJS({
          currentCollectionId: '1235v3v3',
        }),
        menuCollections: Immutable.fromJS({
          '1235v3v3': {
            id: '1235v3v3',
            slug: 'test',
          }
        })
      }
      expect(getCurrentCollectionSlug(state)).toBe('test')
    })
  })
})
