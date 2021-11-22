import Immutable from 'immutable'
import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'
import { actionTypes } from 'actions/actionTypes'
import { useChangeCollectionById } from './useChangeCollectionById'
import { CollectionSlug } from '../constants'
import { useDisplayedCollections } from './useDisplayedCollections'
import { useLocation } from './useLocation'
import { mocked } from 'ts-jest/utils'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('./useDisplayedCollections')
jest.mock('./useLocation')

const mockedUseDispatch = mocked(useDispatch, true)
const mockedUseDisplayedCollections = mocked(useDisplayedCollections, true)
const mockedUseLocation = mocked(useLocation, true)

describe('useChangeCollectionById', () => {
  const defaultCollection = Immutable.Map({
    id: '101',
    published: true,
    default: true,
    slug: 'foo',
    shortTitle: 'short title',
    description: 'description',
    recipesInCollection: [],
    order: 1,
    colour: 'blue',
    featuredCategoryOrder: 0,
    isFeaturedCategory: false,
  })
  const recommendationsCollection = Immutable.Map({
    id: '102',
    published: true,
    default: false,
    slug: CollectionSlug.Recommendations,
    shortTitle: 'short title',
    description: 'description',
    recipesInCollection: [],
    order: 1,
    colour: 'blue',
    featuredCategoryOrder: 0,
    isFeaturedCategory: false,
  })

  const collections = Immutable.List([defaultCollection, recommendationsCollection])
  const dispatch = jest.fn()
  let location = undefined

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
        })
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
              })
            )
          )
        )
      })
    })
  })
})
