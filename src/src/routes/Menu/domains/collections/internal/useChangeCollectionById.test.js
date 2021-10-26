import Immutable from 'immutable'
import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { actionTypes } from 'actions/actionTypes'
import { useChangeCollectionById } from './useChangeCollectionById'
import { CollectionSlug } from '../constants'
import { useDisplayedCollections } from './useDisplayedCollections'
import { useLocation } from './useLocation'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn()
}))

jest.mock('./useDisplayedCollections')
jest.mock('./useLocation')

describe('useChangeCollectionById', () => {
  const defaultCollection = Immutable.Map({ id: '101', published: true, default: true, slug: 'foo' })
  const recommendationsCollection = Immutable.Map({ id: '102', published: true, default: false, slug: CollectionSlug.Recommendations })

  const collections = Immutable.List([defaultCollection, recommendationsCollection])
  const dispatch = jest.fn()
  let location

  beforeEach(() => {
    jest.clearAllMocks()

    useDispatch.mockReturnValue(dispatch)
    useDisplayedCollections.mockReturnValue(collections)

    location = {
      query: {
      }
    }

    useLocation.mockImplementation(() => location)
  })

  describe('when no collection found for id', () => {
    const collectionId = '999'

    test('should not dispatch', () => {
      useChangeCollectionById(location)(collectionId)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when collection found for id', () => {
    const collectionId = '101'

    test('should dispatch push for new location', () => {
      useChangeCollectionById(location)(collectionId)

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining(
        push({
          query: { collection: defaultCollection.get('slug') }
        })
      ))
    })

    test('should dispatch FILTERS_COLLECTION_CHANGE with correct id', () => {
      useChangeCollectionById(location)(collectionId)

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining({
        type: actionTypes.FILTERS_COLLECTION_CHANGE,
        trackingData: {
          actionType: actionTypes.RECIPE_COLLECTION_SELECTED,
          collectionId,
        }
      }))
    })

    describe('when collection in query already matches slug', () => {
      beforeEach(() => {
        location = {
          query: {
            collection: defaultCollection.get('slug')
          }
        }
      })

      test('should not dispatch push', () => {
        useChangeCollectionById(location)(collectionId)

        expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining(
          push({
            query: { collection: defaultCollection.get('slug') }
          })
        ))
      })
    })
  })
})
