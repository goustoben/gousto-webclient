import Immutable from 'immutable'

import { fetchCollections } from 'apis/collections'
import { limitReached } from 'utils/basket'
import { getCollectionIdWithName, getDefaultCollectionId, isAllRecipes } from 'utils/collections'
import { menuLoadCollections, loadRecipesForAllCollections } from 'actions/menuCollections'
import { loadRecipesForSingleCollection } from 'actions/loadRecipesForSingleCollection'
import { collectionFilterChange } from 'actions/filters'
import logger from 'utils/logger'

jest.mock('utils/collections', () => ({
  getCollectionIdWithName: jest.fn(),
  getDefaultCollectionId: jest.fn().mockReturnValue('defaultCollectionId'),
  isAllRecipes: jest.fn().mockReturnValue(true)
}))

jest.mock('actions/filters', () => ({
  collectionFilterChange: jest.fn().mockReturnValue(() => { }),
}))
jest.mock('apis/collections', () => ({
  fetchCollections: jest.fn(),
}))
jest.mock('actions/loadRecipesForSingleCollection', () => ({
  loadRecipesForSingleCollection: jest.fn()
}))
jest.mock('utils/basket', () => ({
  limitReached: jest.fn(),
}))

jest.mock('utils/logger', () => ({
  error: jest.fn()
}))

describe('menu actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()
  beforeEach(() => {
    loadRecipesForSingleCollection.mockImplementation(() => () => Promise.resolve())
  })

  afterEach(() => {
    dispatch.mockClear()
    getState.mockClear()
  })

  describe('menuLoadCollections', () => {
    describe('when authenticated', () => {
      // TODO: use only a single state setup script
      // and update per test
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'an-access-token',
            isAuthenticated: true
          }),
          features: Immutable.fromJS({}),
          routing: {},
          menuCollections: Immutable.fromJS({})
        })
      })
      afterEach(() => {
        fetchCollections.mockReset()
      })
    })

    describe('when not authenticated', () => {
      beforeEach(() => {
        getState.mockReturnValue({
          auth: Immutable.Map({
            accessToken: 'an-access-token',
            isAuthenticated: false
          }),
          features: Immutable.fromJS({}),
          routing: {},
          menuCollections: Immutable.fromJS({})
        })
      })

      test('should dispatch a fetchCollections request without experiments preset', () => {
        fetchCollections.mockReturnValueOnce(Promise.resolve({
          data: [{
            id: 'all recipes collection',
            slug: 'all-recipes',
            properties: {
              enabled: true,
              limit: 25,
              name: 'All Recipes',
            }
          }],
        }))
        menuLoadCollections('a-date')(dispatch, getState)

        expect(fetchCollections).toHaveBeenCalledWith(
          'an-access-token',
          '',
          {
            filters: {
              available_on: 'a-date',
            },
          }
        )
      })
    })

    describe('when previous location is set', () => {
      let state
      let getState2

      beforeEach(() => {
        state = {
          auth: Immutable.Map({
            accessToken: 'an-access-token',
            isAuthenticated: true
          }),
          features: Immutable.fromJS({}),
          routing: {
            locationBeforeTransitions: {
              query: {
                collection: 'everyday-favourites'
              }
            }
          },
          menuCollections: Immutable.fromJS({
            key1: {
              slug: 'recommendations',
              id: 'fakeRecommendationsId',
            }
          })
        }

        getState2 = () => state
      })

      afterEach(() => {
        fetchCollections.mockReset()
      })

      test('should get collection using previous location', async () => {
        fetchCollections.mockReturnValueOnce(Promise.resolve({
          data: [{
            id: 'all recipes collection',
            slug: 'all-recipes',
            properties: {
              enabled: true,
              limit: 25,
              name: 'All Recipes',
            }
          }],
        }))

        await menuLoadCollections('a-date')(dispatch, getState2)
        expect(getCollectionIdWithName).toHaveBeenCalled()
        expect(getDefaultCollectionId).toHaveBeenCalled()
        expect(collectionFilterChange).toHaveBeenCalledWith('fakeRecommendationsId')
      })

      test('should use the default collection id if no preferredCollectionId is provided', async () => {
        state = {
          ...state,
          menuCollections: Immutable.fromJS({
            key1: {
              slug: 'fakeslug',
              id: 'fakeId',
            }
          })
        }

        fetchCollections.mockReturnValueOnce(Promise.resolve({
          data: [{
            id: 'all recipes collection',
            slug: 'all-recipes',
            properties: {
              enabled: true,
              limit: 25,
              name: 'All Recipes',
            }
          }],
        }))

        await menuLoadCollections('a-date')(dispatch, getState2)
        expect(getDefaultCollectionId).toHaveBeenCalled()
        expect(collectionFilterChange).toHaveBeenCalledWith('defaultCollectionId')
      })

      describe('when the collection slug in url is a valid collection in store', () => {
        beforeEach(() => {
          state = {
            auth: Immutable.Map({
              accessToken: 'an-access-token',
              isAuthenticated: true
            }),
            features: Immutable.fromJS({}),
            routing: {
              locationBeforeTransitions: {
                query: {
                  collection: 'everyday-favourites'
                }
              }
            },
            menuCollections: Immutable.fromJS({
              key1: {
                slug: 'everyday-favourites',
                id: 'fakeId',
              }
            }),
          }

          getState2 = () => state
          collectionFilterChange.mockReset()
        })
        test('should not call collectionFilterChange', async () => {
          fetchCollections.mockReturnValueOnce(Promise.resolve({
            data: [{
              id: 'collectionId',
              slug: 'all-recipes',
            }],
          }))
          getCollectionIdWithName.mockReturnValueOnce('collectionId')
          await menuLoadCollections('a-date')(dispatch, getState2)
          expect(collectionFilterChange).not.toHaveBeenCalled()
        })
      })
    })
  })

  describe('loadRecipesForAllCollections', () => {
    let getStateWithBasketItems

    beforeEach(() => {
      getStateWithBasketItems = () => ({
        auth: Immutable.Map({
          accessToken: 'an-access-token',
          isAuthenticated: true
        }),
        features: Immutable.fromJS({}),
        routing: {},
        menuCollections: Immutable.OrderedMap({
          123: Immutable.Map({ id: '123', shortTitle: 'allrecipes' })
        }),
        basket: Immutable.fromJS({
          date: '2016-06-23',
          slotId: '123-123-uuid',
        }),
        recipes: Immutable.fromJS({}),
      })
    })

    test('calls loadRecipesForSingleCollection for each menuCollection in state', async () => {
      const transformedRecipes = {}
      const transformedCollectionRecipes = {}
      await loadRecipesForAllCollections(transformedRecipes, transformedCollectionRecipes)(dispatch, getStateWithBasketItems)

      expect(isAllRecipes).toHaveBeenCalled()
      expect(loadRecipesForSingleCollection).toHaveBeenCalled()
      expect(limitReached).toHaveBeenCalled()
    })

    describe('when promise all rejects', () => {
      test('should call logger with error', async () => {
        const transformedRecipes = {}
        const transformedCollectionRecipes = {}
        loadRecipesForSingleCollection.mockImplementation(() => () => Promise.reject())
        await loadRecipesForAllCollections(transformedRecipes, transformedCollectionRecipes)(dispatch, getStateWithBasketItems)

        expect(logger.error).toHaveBeenCalled()
      })
    })
  })
})
