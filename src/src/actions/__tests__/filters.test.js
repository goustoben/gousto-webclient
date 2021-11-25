import Immutable from 'immutable'
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

describe('filters actions', () => {
  let state

  const dispatchSpy = jest.fn()
  const getStateSpy = jest.fn()

  beforeEach(() => {
    state = {
      routing: {
        locationBeforeTransitions: { query: { collection: 'gluten-free' } },
      },
      basket: Immutable.fromJS({
        numPortions: 2
      })
    }

    getStateSpy.mockReturnValue(state)
  })

  afterEach(() => {
    dispatchSpy.mockClear()
    getStateSpy.mockClear()
  })

  describe('collectionFilterChange', () => {
    describe('when new collection id exists as a menu collections key', () => {
      beforeEach(() => {
        state = {
          ...state,
          menuCollections: Immutable.fromJS({
            newCollectionId: { id: 'newCollectionId', slug: 'dairy-free', published: true, recipesInCollection: ['111'] },
          }),
        }

        getStateSpy.mockReturnValue(state)
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

      describe('when collectionId is recommendations collection', () => {
        const collectionId = '12345'

        beforeEach(() => {
          state = {
            ...state,
            menuCollections: Immutable.fromJS({
              [collectionId]: { id: collectionId, slug: 'recommendations', published: true },
            }),
          }

          getStateSpy.mockReturnValue(state)
        })

        describe('when recommendations collection has 4 recipes', () => {
          const recipeIds = [ '111', '222', '333', '444' ]

          beforeEach(() => {
            state = {
              ...state,
              menuCollections: Immutable.fromJS({
                [collectionId]: {
                  id: collectionId,
                  slug: 'recommendations',
                  published: true,
                  recipesInCollection: recipeIds
                },
              })
            }

            getStateSpy.mockReturnValue(state)
          })

          describe('when 4 recommendation recipes are in stock', () => {
            beforeEach(() => {
              state = {
                ...state,
                menuRecipeStock: Immutable.fromJS({
                  [recipeIds[0]]: { 2: 1000, 4: 1000 },
                  [recipeIds[1]]: { 2: 1000, 4: 1000 },
                  [recipeIds[2]]: { 2: 1000, 4: 1000 },
                  [recipeIds[3]]: { 2: 1000, 4: 1000 },
                })
              }

              getStateSpy.mockReturnValue(state)
            })

            test('should dispatch a FILTERS_COLLECTION_CHANGE action', () => {
              collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

              expect(dispatchSpy).toHaveBeenCalledWith(expect.objectContaining({
                type: actionTypes.FILTERS_COLLECTION_CHANGE,
                collectionId,
              }))
            })
          })

          describe('when 3 recommendation recipes are in stock', () => {
            beforeEach(() => {
              state = {
                ...state,
                menuRecipeStock: Immutable.fromJS({
                  [recipeIds[0]]: { 2: 1000, 4: 1000 },
                  [recipeIds[1]]: { 2: 1000, 4: 1000 },
                  [recipeIds[2]]: { 2: 1000, 4: 1000 },
                  [recipeIds[3]]: { 2: 0, 4: 0 },
                })
              }

              getStateSpy.mockReturnValue(state)
            })

            test('should not dispatch a FILTERS_COLLECTION_CHANGE action', () => {
              collectionFilterChange(collectionId)(dispatchSpy, getStateSpy)

              expect(dispatchSpy).not.toHaveBeenCalledWith(expect.objectContaining({
                type: actionTypes.FILTERS_COLLECTION_CHANGE,
                collectionId,
              }))
            })
          })
        })
      })
    })
  })

  describe('changeCollectionById', () => {
    test('should dispatch one action', () => {
      changeCollectionById()(dispatchSpy, getStateSpy)
      expect(dispatchSpy.mock.calls.length).toBe(1)
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
