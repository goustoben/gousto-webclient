import Immutable from 'immutable'
import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { actionTypes } from 'actions/actionTypes'
import { useChangeCollectionById } from './useChangeCollectionById'
import { CollectionSlug } from '../constants'
import { useDisplayedCollections } from './useDisplayedCollections'
import { useLocation } from './useLocation'
import { createCollectionFromDefaultValues } from './utils'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('./useDisplayedCollections')
jest.mock('./useLocation')

const mockedUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>
const mockedUseDisplayedCollections = useDisplayedCollections as jest.MockedFunction<
  typeof useDisplayedCollections
>
const mockedUseLocation = useLocation as jest.MockedFunction<typeof useLocation>

describe('useChangeCollectionById', () => {
  const defaultCollection = createCollectionFromDefaultValues({
    id: '101',
    published: true,
    default: true,
    slug: 'foo',
  })
  const recommendationsCollection = createCollectionFromDefaultValues({
    id: '102',
    published: true,
    default: false,
    slug: CollectionSlug.Recommendations,
  })

  const collections = Immutable.OrderedMap({ a: defaultCollection, b: recommendationsCollection })

  const dispatch = jest.fn()
  let location

  beforeEach(() => {
    jest.clearAllMocks()

    mockedUseDispatch.mockReturnValue(dispatch)
    mockedUseDisplayedCollections.mockReturnValue(collections)

    location = {
      query: {},
    }

    mockedUseLocation.mockReturnValue(location)
  })

  describe('when no collection found for id', () => {
    const collectionId = '999'

    test('should not dispatch', () => {
      useChangeCollectionById()(collectionId)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when collection found for id', () => {
    const collectionId = '101'

    test('should dispatch push for new location', () => {
      useChangeCollectionById()(collectionId)

      const options = Object.create({})
      options.query = {
        collection: defaultCollection.get('slug'),
      }
      expect(dispatch).toHaveBeenLastCalledWith(expect.objectContaining(push(options)))
    })

    test('should dispatch FILTERS_COLLECTION_CHANGE with correct id', () => {
      useChangeCollectionById()(collectionId)

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: actionTypes.FILTERS_COLLECTION_CHANGE,
          trackingData: {
            actionType: actionTypes.RECIPE_COLLECTION_SELECTED,
            collectionId,
          },
        }),
      )
    })

    describe('when collection in query already matches slug', () => {
      beforeEach(() => {
        location = {
          query: {
            collection: defaultCollection.get('slug'),
          },
        }
      })

      test('should not dispatch push', () => {
        useChangeCollectionById()(collectionId)
        expect(dispatch).not.toHaveBeenCalledWith(
          expect.objectContaining(
            push(
              Object.create({
                query: {
                  collection: defaultCollection.get('slug'),
                },
              }),
            ),
          ),
        )
      })
    })
  })
})
