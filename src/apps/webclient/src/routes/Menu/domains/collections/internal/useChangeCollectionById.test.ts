import Immutable from 'immutable'
import { useDispatch } from 'react-redux'
import { push } from 'react-router-redux'

import { actionTypes } from 'actions/actionTypes'
import { recipeCollectionSelected } from 'actions/trackingKeys'

import { CollectionSlug } from '../constants'
import { useChangeCollectionById } from './useChangeCollectionById'
import { useCollectionQuerySlug } from './useCollectionQuerySlug'
import { useDisplayedCollections } from './useDisplayedCollections'
import { useLocation } from './useLocation'
import { createCollectionFromDefaultValues } from './utils'

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}))

jest.mock('./useCollectionQuerySlug')
jest.mock('./useDisplayedCollections')
jest.mock('./useLocation')

const mockedUseDispatch = useDispatch as jest.MockedFunction<typeof useDispatch>
const mockedUseDisplayedCollections = useDisplayedCollections as jest.MockedFunction<
  typeof useDisplayedCollections
>
const mockedUseLocation = useLocation as jest.MockedFunction<typeof useLocation>
const mockedUseCollectionQuerySlug = useCollectionQuerySlug as jest.MockedFunction<
  typeof useCollectionQuerySlug
>

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
  const anotherCollection = createCollectionFromDefaultValues({
    id: '103',
    published: true,
    default: false,
    slug: 'bar',
  })

  const collections = Immutable.OrderedMap({
    a: defaultCollection,
    b: recommendationsCollection,
    c: anotherCollection,
  })

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
    mockedUseCollectionQuerySlug.mockReturnValue(null)
  })

  describe('when no collection found for id', () => {
    const collectionId = '999'

    test('should not dispatch', () => {
      useChangeCollectionById()(collectionId)

      expect(dispatch).not.toHaveBeenCalled()
    })
  })

  describe('when collection found for id', () => {
    const collectionId = anotherCollection.get('id')

    test('should dispatch push for new location', () => {
      useChangeCollectionById()(collectionId)

      const options = Object.create({})
      options.query = {
        collection: anotherCollection.get('slug'),
      }
      expect(dispatch).toHaveBeenLastCalledWith(expect.objectContaining(push(options)))
    })

    test('should dispatch tracking event with correct ids', () => {
      useChangeCollectionById()(collectionId)

      expect(dispatch).toHaveBeenCalledWith(
        expect.objectContaining({
          type: actionTypes.TRACKING,
          trackingData: {
            actionType: recipeCollectionSelected,
            collectionId,
            fromCollectionId: defaultCollection.get('id'),
          },
        }),
      )
    })

    describe('when query already contains a collection explicitly', () => {
      beforeEach(() => {
        const slug = recommendationsCollection.get('slug')

        location = {
          query: {
            collection: slug,
          },
        }

        mockedUseLocation.mockReturnValue(location)
        mockedUseCollectionQuerySlug.mockReturnValue(slug)
      })

      test('should dispatch tracking event with correct ids', () => {
        useChangeCollectionById()(collectionId)

        expect(dispatch).toHaveBeenCalledWith(
          expect.objectContaining({
            type: actionTypes.TRACKING,
            trackingData: {
              actionType: recipeCollectionSelected,
              collectionId,
              fromCollectionId: recommendationsCollection.get('id'),
            },
          }),
        )
      })
    })

    describe('when collection in query already matches slug', () => {
      beforeEach(() => {
        const slug = defaultCollection.get('slug')

        location = {
          query: {
            collection: slug,
          },
        }

        mockedUseLocation.mockReturnValue(location)
        mockedUseCollectionQuerySlug.mockReturnValue(slug)
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
