import Immutable from 'immutable'

import { fetchCollections } from 'apis/collections'

import {
  collectionsLoadCollections,
  collectionsLoadCollectionBySlug,
  collectionsLoadCollectionRecipes,
} from 'actions/collections'

jest.mock('apis/collections', () => ({
  fetchCollections: jest.fn(),
  fetchCollectionBySlug: jest.fn().mockReturnValue(
    new Promise((resolve) => resolve({
      data: {
        id: '123',
        slug: 'slug'
      }
    }))
  ),
  fetchCollectionRecipes: jest.fn().mockReturnValue(
    new Promise((resolve) => resolve({
      data: {
        recipes: {}
      }
    }))
  ),
}))

const createCollectionState = ({ isAuthenticated }) => ({
  auth: Immutable.Map({
    accessToken: 'an-access-token',
    isAuthenticated,
  }),
})

describe('collection actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('collectionsLoadCollections', () => {
    describe('when authenticated', () => {
      beforeEach(() => {
        getState.mockReturnValue(createCollectionState({
          isAuthenticated: true,
        }))
      })
    })

    describe('when not authenticated', () => {
      beforeEach(() => {
        getState.mockReturnValue(createCollectionState({
          isAuthenticated: false,
        }))
      })

      test('should dispatch a fetchCollections request without experiments preset', () => {
        collectionsLoadCollections()(dispatch, getState)

        expect(fetchCollections).toHaveBeenCalledWith(
          'an-access-token',
          '',
          {}
        )
      })
    })

    describe('collections receive collection recipes slug action', () => {
      const collectionSlug = 'slug'
      test('should dispatch COLLECTIONS_RECEIVE_COLLECTIONS', async () => {
        const thunk = collectionsLoadCollectionBySlug(collectionSlug)

        await thunk(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith({
          type: 'COLLECTIONS_RECEIVE_COLLECTIONS',
          collections: [{
            id: '123',
            slug: 'slug'
          }]
        })
      })
    })

    describe('collections receive collection recipes action', () => {
      const collectionId = '1234'
      test('should dispatch COLLECTIONS_RECEIVE_COLLECTIONS', async () => {
        const thunk = collectionsLoadCollectionRecipes(collectionId)

        await thunk(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith({
          type: 'COLLECTIONS_RECEIVE_COLLECTION_RECIPES',
          collectionId: '1234',
          recipes: {}
        })
      })
    })
  })
})
