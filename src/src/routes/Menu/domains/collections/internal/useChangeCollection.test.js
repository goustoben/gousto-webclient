import Immutable from 'immutable'
import { push } from 'react-router-redux'
import { actionTypes } from 'actions/actionTypes'
import { useChangeCollection } from './useChangeCollection'

describe('useChangeCollection', () => {
  const defaultCollection = Immutable.Map({ id: '101', published: true, default: true, slug: 'foo' })
  const recommendationsCollection = Immutable.Map({ id: '102', published: true, default: false, slug: 'recommendations' })

  const collections = Immutable.List([defaultCollection, recommendationsCollection])
  const dispatch = jest.fn()
  let location

  beforeEach(() => {
    jest.clearAllMocks()

    location = {
      query: {
      }
    }
  })

  describe('when no collection found for id', () => {
    const collectionId = '999'

    test('should not dispatch', () => {
      useChangeCollection(dispatch, location, collections)(collectionId)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when collection found for id', () => {
    const collectionId = '101'

    test('should dispatch push for new location', () => {
      useChangeCollection(dispatch, location, collections)(collectionId)

      expect(dispatch).toHaveBeenCalledWith(expect.objectContaining(
        push({
          query: { collection: defaultCollection.get('slug') }
        })
      ))
    })

    test('should dispatch FILTERS_COLLECTION_CHANGE with correct id', () => {
      useChangeCollection(dispatch, location, collections)(collectionId)

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
        useChangeCollection(dispatch, location, collections)(collectionId)

        expect(dispatch).not.toHaveBeenCalledWith(expect.objectContaining(
          push({
            query: { collection: defaultCollection.get('slug') }
          })
        ))
      })
    })
  })
})
