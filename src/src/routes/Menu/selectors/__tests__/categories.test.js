import Immutable from 'immutable'
import { getFeaturedCategories } from '../categories'

describe('categories', () => {
  const collection1 = Immutable.Map({ id: '123', slug: 'collection-1', isFeaturedCategory: false })
  const collection2 = Immutable.Map({ id: '456', slug: 'collection-2', isFeaturedCategory: true, featuredCategoryOrder: 0 })
  const collection3 = Immutable.Map({ id: '789', slug: 'collection-3', isFeaturedCategory: true, featuredCategoryOrder: 1 })
  const menuCollections1 = Immutable.OrderedMap({
    123: collection1,
  })
  const menuCollections2 = Immutable.OrderedMap({
    123: collection1,
    456: collection2,
  })
  const menuCollections3 = Immutable.OrderedMap({
    123: collection1,
    456: collection2,
    789: collection3,
  })

  describe('featured categories', () => {
    describe('when has no featured categories', () => {
      test('should return no categories', () => {
        const result = getFeaturedCategories.resultFunc(menuCollections1)
        const expected = Immutable.OrderedMap({})

        expect(result).toEqual(expected)
      })
    })

    describe('when has featured category', () => {
      test('should return one category', () => {
        const result = getFeaturedCategories.resultFunc(menuCollections2)
        const expected = Immutable.OrderedMap({
          456: collection2,
        })

        expect(result).toEqual(expected)
      })
    })

    describe('when has 2 featured category', () => {
      test('should return 2 categories', () => {
        const result = getFeaturedCategories.resultFunc(menuCollections3)
        const expected = Immutable.OrderedMap({
          456: collection2,
          789: collection3,
        })

        expect(result).toEqual(expected)
      })
    })
  })
})
