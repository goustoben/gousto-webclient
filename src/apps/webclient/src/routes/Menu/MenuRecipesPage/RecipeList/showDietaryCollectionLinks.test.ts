import { CollectionId } from 'routes/Menu/domains/collections'
import { showDietaryCollectionLinks } from './showDietaryCollectionLinks'

describe('showDietaryCollectionLinks', () => {
  describe('when atIndex is not DIETARY_COLLECTION_LINKS_POSITION', () => {
    it('should return false', () => {
      expect(
        showDietaryCollectionLinks({ collectionId: CollectionId.AllRecipes, atIndex: 1 })
      ).toBe(false)
    })
  })

  describe('when atIndex is DIETARY_COLLECTION_LINKS_POSITION', () => {
    describe('when collectionId is All Recipes', () => {
      it('should return true', () => {
        expect(
          showDietaryCollectionLinks({ collectionId: CollectionId.AllRecipes, atIndex: 3 })
        ).toBe(true)
      })
    })
    describe('when collectionId is Recommendation', () => {
      it('should return true', () => {
        expect(
          showDietaryCollectionLinks({ collectionId: CollectionId.Recommendations, atIndex: 3 })
        ).toBe(true)
      })
    })
    describe('when collectionId is other', () => {
      it('should return false', () => {
        expect(
          showDietaryCollectionLinks({ collectionId: 'some other collection id', atIndex: 3 })
        ).toBe(false)
      })
    })
  })
})
