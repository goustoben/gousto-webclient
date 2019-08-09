import Immutable from 'immutable'

import {
  hasJustForYouCollection,
  getMenuCollectionIdBySlug,
  getMenuCollectionRecipeIds
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

  describe('getMenuCollectionId', () => {
    describe('when menu collections and slug exist', () => {
      beforeEach(() => {
        state = {
          menuCollections: Immutable.fromJS({
            ca8f71be: {
              slug: 'chicken',
              id: 'a123'
            },
            bc5fc11o: {
              slug: 'taste-of-japan',
              id: 'b456'
            },
          }),
        }
      })

      test('should return id b456 of collection with slug taste-of-japan', () => {
        expect(getMenuCollectionIdBySlug(state.menuCollections, 'taste-of-japan')).toBe('b456')
      })
    })
  })

  describe('getMenuCollectionRecipeIds', () => {
    describe('when menuCollections, allMenuCollectionsRecipes and slug exist', () => {
      beforeEach(() => {
        state = {
          menuCollections: Immutable.fromJS({
            ca8f71be: {
              slug: 'chicken',
              id: 'a123'
            },
            bc5fc11o: {
              slug: 'taste-of-japan',
              id: 'b456'
            },
          }),
          menuCollectionsRecipes : Immutable.fromJS({
            a123: ["22", "33", "44"],
            b456: ["55", "66", "77"],
          }),
        }
      })

      test('should return id 456 of collection with slug taste-of-japan', () => {
        expect(getMenuCollectionRecipeIds(state.menuCollections, state.menuCollectionsRecipes,'taste-of-japan').toArray()).toEqual(["55", "66", "77"])
      })
    })
  })
})
