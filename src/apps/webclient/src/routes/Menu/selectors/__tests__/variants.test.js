import Immutable from 'immutable'
import { getVariantsForRecipe, getCurrentCollectionDietaryClaims } from '../variants'

describe('getVariantsForRecipe', () => {
  describe('when no variants', () => {
    const variants = null
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when no recipeVariants', () => {
    const variants = Immutable.Map({
      143: {},
    })
    const coreRecipeId = '123'

    test('should return null', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toBe(null)
    })
  })

  describe('when variants exists for recipe id', () => {
    const variants = Immutable.fromJS({
      123: {
        displayName: 'recipe',
        alternatives: [
          {
            id: 'abd123',
            coreRecipeId: '132',
            displayName: 'recipeVariant',
          },
        ],
      },
    })
    const coreRecipeId = '123'

    test('should return variant', () => {
      const result = getVariantsForRecipe.resultFunc(variants, coreRecipeId)
      expect(result).toEqual({
        type: 'alternatives',
        alternatives: Immutable.fromJS([
          {
            id: 'abd123',
            coreRecipeId: '132',
            displayName: 'recipeVariant',
          },
        ]),
        variantsList: Immutable.fromJS([
          {
            id: 'abd123',
            coreRecipeId: '132',
            displayName: 'recipeVariant',
          },
        ]),
      })
    })
  })
})

describe('getCurrentCollectionDietaryClaims', () => {
  let state = null
  describe('when send prop category id', () => {
    beforeEach(() => {
      state = {
        menuCollections: Immutable.fromJS({
          'collection-id': {
            published: true,
            shortTitle: 'something',
            slug: 'diary-free',
            id: 'collection-id',
            default: true,
            recipesInCollection: ['123', '321', '4578'],
            requirements: {
              dietary_claims: ['diary-free'],
            },
          },
        }),
      }
    })
    test('should return the diatery claims for category id from props', () => {
      const result = getCurrentCollectionDietaryClaims(state, { categoryId: 'collection-id' })
      expect(result).toEqual(Immutable.List(['diary-free']))
    })
  })

  describe('when has slug in query', () => {
    beforeEach(() => {
      state = {
        menuCollections: Immutable.fromJS({
          'collection-id-with-slug': {
            published: true,
            shortTitle: 'something',
            slug: 'gluten-free',
            id: 'collection-id-with-slug',
            default: true,
            recipesInCollection: ['123', '321', '4578'],
            requirements: {
              dietary_claims: ['gluten-free'],
            },
          },
        }),
        basket: Immutable.fromJS({
          numPortions: 2,
        }),
        routing: {
          locationBeforeTransitions: {
            query: {
              collection: 'gluten-free',
            },
          },
        },
      }
    })
    test('should return the diatery claims for collection with slug', () => {
      const result = getCurrentCollectionDietaryClaims(state)
      expect(result).toEqual(Immutable.List(['gluten-free']))
    })
  })
})
