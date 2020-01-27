import Immutable from 'immutable'
import { ALL_RECIPES_COLLECTION_ID } from 'config/collections'
import { actionTypes } from '../actionTypes'

import {
  collectionFilterChange,
  changeCollectionById,
  changeCollectionToAllRecipesViaCTA,
  filterProductCategory
} from '../filters'

jest.mock('react-router-redux', () => ({
  push: jest.fn(),
}))

jest.mock('config/recipes', () => ({
  thematicBorderColor: 'red'
}))

describe('filters actions', () => {
  const dispatchSpy = jest.fn()
  const getStateSpy = jest.fn()

  afterEach(() => {
    dispatchSpy.mockClear()
    getStateSpy.mockClear()
  })

  describe('collectionFilterChange', () => {
    describe('when new collection id exists as a menu collections key', () => {
      beforeEach(() => {
        getStateSpy.mockReturnValue({
          routing: {
            locationBeforeTransitions: { query: { collection: 'gluten-free' } },
          },
          menuCollections: Immutable.fromJS({
            newCollectionId: { slug: 'dairy-free' },
          }),
        })
      })

      test('should add the new collection name to the querystring', () => {
        collectionFilterChange('newCollectionId')(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          collectionName: 'dairy-free',
        }))
      })

      test('should dispatch a FILTERS_COLLECTION_CHANGE action', () => {
        const collectionId = 'newCollectionId'

        collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: actionTypes.FILTERS_COLLECTION_CHANGE,
          collectionId,
        }))
      })
    })

    describe('when new collection id does not exist as a menu collections key', () => {
      beforeEach(() => {
        getStateSpy.mockReturnValue({
          routing: {
            locationBeforeTransitions: { query: { collection: 'gluten-free' } },
          },
          menuCollections: Immutable.fromJS({
            notNewCollectionId: { slug: 'dairy-free' },
          }),
        })
      })

      test('should change the new collection name from the querystring if different', () => {
        collectionFilterChange('notNewCollectionId')(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledTimes(2)
      })

      test('should dispatch a FILTERS_COLLECTION_CHANGE action', () => {
        const collectionId = 'notNewCollectionId'

        collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

        expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
          type: actionTypes.FILTERS_COLLECTION_CHANGE,
          collectionId,
        }))
      })
    })
  })

  describe('changeCollectionById', () => {
    test('should dispatch one action', () => {
      changeCollectionById()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.mock.calls.length).toBe(1)
    })

    test('should be called with ALL_RECIPES_COLLECTION_ID if no params passed in', () => {
      changeCollectionById()(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ collectionId: ALL_RECIPES_COLLECTION_ID }))
    })

    test('should be called with collectonId if passed in as params', () => {
      changeCollectionById('1234')(dispatchSpy, getStateSpy)
      expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({ collectionId: '1234' }))
    })
  })

  describe('changeCollectionToAllRecipesViaCTA', () => {
    test('should dispatch two actions', () => {
      changeCollectionToAllRecipesViaCTA()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.mock.calls.length).toBe(2)
    })
  })

  describe('filterProductCategory', () => {
    let dispatchSpyCalls

    beforeEach(() => {
      filterProductCategory('all-products')(dispatchSpy)
      dispatchSpyCalls = dispatchSpy.mock.calls
    })

    test('should dispatch a FILTERS_PRODUCT_CATEGORY action', () => {
      expect(dispatchSpyCalls[0][0]).toEqual({
        type: actionTypes.FILTERS_PRODUCT_CATEGORY,
        value: 'all-products',
      })
    })

    test('should dispatch a product filtering tracking action', () => {
      expect(dispatchSpyCalls[1][0]).toEqual({
        type: actionTypes.PRODUCTS_FILTER_TRACKING,
        trackingData: {
          actionType: 'Products filtered',
          categoryId: 'all-products',
        },
      })
    })
  })
})
