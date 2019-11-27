import Immutable from 'immutable'

import { fetchCollections } from 'apis/collections'
import { featureSet } from 'actions/features'
import { limitReached } from 'utils/basket'
import { getCollectionIdWithName, getDefaultCollectionId, isAllRecipes } from 'utils/collections'
import { menuLoadCollections, menuLoadCollectionsRecipes } from 'actions/menuCollections'
import { menuLoadCollectionRecipes } from 'actions/menuLoadCollectionRecipes'
import { collectionFilterChange } from 'actions/filters'

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
jest.mock('actions/features', () => ({
  featureSet: jest.fn(),
}))
jest.mock('actions/menuLoadCollectionRecipes', () => ({
  menuLoadCollectionRecipes: jest.fn().mockImplementation(() => {
    return () => {
      return Promise.resolve()
    }
  })
}))
jest.mock('utils/basket', () => ({
  limitReached: jest.fn(),
}))

describe('menu actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

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

      test('should dispatch a fetchCollections request containing jfy experiment', () => {
        fetchCollections.mockResolvedValue(Promise.resolve({
          data: [{
            id: 'all recipes collection',
            slug: 'all-recipes',
            properties: {
              enabled: true,
              limit: 25,
              name: "All Recipes",
            }
          }],
        }))
        menuLoadCollections()(dispatch, getState)

        expect(fetchCollections).toHaveBeenCalledWith(
          'an-access-token',
          '',
          expect.objectContaining({
            experiments: {
              'justforyou_v2': true,
            },
          })
        )
      })

      test('should dispatch a featureSet containing jfy tutorial value true if tutorial jfy', async () => {
        fetchCollections.mockReturnValueOnce(Promise.resolve({
          data: [{
            id: 'recommended collection',
            slug: 'recommendations',
            properties: {
              enabled: true,
              limit: 25,
              name: "Just For You",
              tutorial: "jfy"
            }
          }],
        }))
        await menuLoadCollections()(dispatch, getState)

        expect(featureSet).toHaveBeenCalledWith(
          'jfyTutorial',
          true,
        )
      })

      test('should dispatch a featureSet containing jfy tutorial value false if tutorial null', async () => {
        fetchCollections.mockReturnValueOnce(Promise.resolve({
          data: [{
            id: 'recommended collection',
            slug: 'recommendations',
            properties: {
              enabled: true,
              limit: 25,
              name: "Just For You",
              tutorial: null
            }
          }],
        }))
        await menuLoadCollections()(dispatch, getState)

        expect(featureSet).toHaveBeenCalledWith(
          'jfyTutorial',
          false,
        )
      })

      test('should dispatch a featureSet containing jfy tutorial value false if not recommendations', async () => {
        fetchCollections.mockReturnValueOnce(Promise.resolve({
          data: [{
            id: 'all recipes collection',
            slug: 'all-recipes',
            properties: {
              enabled: true,
              limit: 25,
              name: "All Recipes",
            }
          }],
        }))
        await menuLoadCollections()(dispatch, getState)

        expect(featureSet).toHaveBeenCalledWith(
          'jfyTutorial',
          false,
        )
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
              name: "All Recipes",
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
                collection: "everyday-favourites"
              }
            }
          },
          menuCollections: Immutable.fromJS({
            'key1': {
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
              name: "All Recipes",
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
            'key1': {
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
              name: "All Recipes",
            }
          }],
        }))

        await menuLoadCollections('a-date')(dispatch, getState2)
        expect(getDefaultCollectionId).toHaveBeenCalled()
        expect(collectionFilterChange).toHaveBeenCalledWith('defaultCollectionId')

      })
    })
  })

  describe('menuLoadCollectionsRecipes', () => {
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

    test('calls menuLoadCollectionRecipes for each menuCollection in state', async () => {
      await menuLoadCollectionsRecipes('a-date')(dispatch, getStateWithBasketItems)

      expect(isAllRecipes).toHaveBeenCalled()
      expect(menuLoadCollectionRecipes).toHaveBeenCalled()
      expect(limitReached).toHaveBeenCalled()
    })
  })
})
