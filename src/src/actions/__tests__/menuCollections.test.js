import Immutable from 'immutable'

import { fetchCollections } from 'apis/collections'
import { featureSet } from 'actions/features'

import { menuLoadCollections } from 'actions/menuCollections'

jest.mock('apis/collections', () => ({
  fetchCollections: jest.fn(),
}))
jest.mock('actions/features', () => ({
  featureSet: jest.fn(),
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
      describe('when recommendation collection props include shortlist true', () => {
        test('should dispatch a featureSet containing shortlist value true', async () => {
          fetchCollections.mockReturnValueOnce(Promise.resolve({
            data: [{
              id: 'recommended collection',
              slug: 'recommendations',
              properties: {
                enabled: true,
                limit: 25,
                name: "Just For You",
                tutorial: "jfy",
                shortlist: true
              }
            }],
          }))
          await menuLoadCollections()(dispatch, getState)

          expect(featureSet).toHaveBeenCalledWith(
            'shortlist',
            true,
          )
        })
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
  })
})
