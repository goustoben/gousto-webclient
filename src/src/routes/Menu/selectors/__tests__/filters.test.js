import Immutable from 'immutable'
import { getMenuCollectionsWithRecipes } from '../filters'

describe('getMenuCollectionsWithRecipes', () => {
  let state
  const collection234 = Immutable.Map({
    published: true,
    shortTitle: 'All Recipes',
    slug: 'all-recipes',
    id: '234',
    default: true,
  })
  const collection123 = Immutable.Map({
    published: true,
    shortTitle: 'Fish',
    slug: 'fish',
    id: '123',
  })
  describe('when all collections have recipes', () => {
    beforeEach(() => {
      state = {
        menuCollections: Immutable.OrderedMap({
          234: collection234,
          123: collection123,
        }),
        menuCollectionRecipes: Immutable.fromJS({
          234: ['234', '345'],
          123: ['123', '456']
        })
      }
    })
    test('should return collections with recipes', () => {
      const result = getMenuCollectionsWithRecipes(state)
      const expectedResult = Immutable.OrderedMap({
        234: collection234,
        123: collection123,
      })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('when one of the collections doesn\'t have recipes', () => {
    beforeEach(() => {
      state = {
        menuCollections: Immutable.OrderedMap({
          234: collection234,
          123: collection123,
        }),
        menuCollectionRecipes: Immutable.fromJS({
          234: ['234', '345'],
          123: []
        })
      }
    })
    test('should return only collections with recipes', () => {
      const result = getMenuCollectionsWithRecipes(state)
      const expectedResult = Immutable.OrderedMap({
        234: collection234,
      })
      expect(result).toEqual(expectedResult)
    })
  })

  describe('when one of the collections isn\'t published', () => {
    beforeEach(() => {
      state = {
        menuCollections: Immutable.OrderedMap({
          234: collection234,
          123: Immutable.Map({
            published: false,
            shortTitle: 'Fish',
            slug: 'fish',
            id: '123',
          }),
        }),
        menuCollectionRecipes: Immutable.fromJS({
          234: ['234', '345'],
          123: ['234', '345', '456']
        })
      }
    })
    test('should return only published collections', () => {
      const result = getMenuCollectionsWithRecipes(state)
      const expectedResult = Immutable.OrderedMap({
        234: collection234,
      })
      expect(result).toEqual(expectedResult)
    })
  })
})
