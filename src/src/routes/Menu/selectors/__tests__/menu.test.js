import Immutable from 'immutable'

import { getCurrentCollectionSlug, getRecommendationShortName } from 'routes/Menu/selectors/menu'

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

describe('getRecommendationShortName', () => {
  let state
  test('should return the shortName for recommendations collection', () => {
    state = {
      menuCollections: Immutable.fromJS({
        '12dddv3v3': {
          id: '12dddv3v3',
          slug: 'recommendations',
          shortTitle: 'Choosen For You'
        }
      })
    }
    expect(getRecommendationShortName(state)).toBe('Choosen For You')
  })

  test('should return empty string if recommendations does not exist', () => {
    state = {
      menuCollections: Immutable.fromJS({
        '12bbbbbv3': {
          id: '12bbbbbv3',
          slug: 'test',
          shortTitle: 'Test Collection'
        }
      })
    }
    expect(getRecommendationShortName(state)).toBe('')
  })
})
