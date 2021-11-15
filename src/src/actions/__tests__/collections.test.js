import GoustoException from 'utils/GoustoException'
import status from 'actions/status/status'
import { collectionsLoadCollectionBySlug } from "actions/collections/collectionsLoadCollectionBySlug"
import { fetchCollectionBySlug } from "apis/collections/fetchCollectionBySlug"

jest.mock('actions/status', () => ({
  errorLoad: jest.fn(),
  error: jest.fn(),
  pending: jest.fn()
}))

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

describe('collection actions', () => {
  const dispatch = jest.fn()
  const getState = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('collectionsLoadCollections', () => {
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

      test('should mark COLLECTIONS_RECEIVE_COLLECTIONS as errored if it errors', async () => {
        const err = new GoustoException(`Failed to load collection by slug: ${collectionSlug}`, {
          error: 'fetch-collection-fail',
          level: 'notice',
        })
        fetchCollectionBySlug.mockReturnValueOnce(
          new Promise((resolve, reject) => { reject(err) })
        )
        const thunk = collectionsLoadCollectionBySlug(collectionSlug)

        await thunk(dispatch, getState)
        expect(status.errorLoad).toHaveBeenCalledTimes(1)
        expect(status.errorLoad).toHaveBeenNthCalledWith(1, 'COLLECTIONS_RECEIVE_COLLECTIONS', err)
      })
    })
  })
})
