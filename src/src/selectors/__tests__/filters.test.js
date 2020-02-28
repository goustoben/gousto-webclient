import Immutable from 'immutable'
import { getShortTitle } from '../filters'

describe('getShortTitle', () => {
  describe('When filters has a currentCollectionId', () => {
    let state
    beforeEach(() => {
      state = {
        menuCollections: Immutable.fromJS({
          234: {
            published: true,
            shortTitle: 'All Recipes',
            slug: 'all-recipes',
            id: '234',
            default: true,
          },
          123: {
            published: true,
            shortTitle: 'Fish',
            slug: 'fish',
            id: '123',
          },
        }),
        filters: Immutable.fromJS({
          currentCollectionId: '123'
        })
      }
    })
    test('Then it should return the collection short title', () => {
      const result = getShortTitle(state)
      expect(result).toEqual('Fish')
    })
  })
})
