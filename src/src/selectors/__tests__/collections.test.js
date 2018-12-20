import Immutable from 'immutable'

import {
  hasJustForYouCollection,
} from 'selectors/collections'

describe('collection selectors', () => {
  let state

  describe('hasJustForYouCollection', () => {
    describe('when recommendations collection exists', () => {
      beforeEach(() => {
        state = {
          menuCollections: Immutable.fromJS({
            'all-recipes': { slug: 'all-recipes' },
            recommendations: { slug: 'recommendations' },
          }),
        }
      })

      test('should return true', () => {
        expect(hasJustForYouCollection(state)).toBe(true)
      })
    })

    describe('when recommendations collection does not exist', () => {
      beforeEach(() => {
        state = {
          menuCollections: Immutable.fromJS({
            'all-recipes': { slug: 'all-recipes' },
          }),
        }
      })

      test('should return false', () => {
        expect(hasJustForYouCollection(state)).toBe(false)
      })
    })
  })
})
